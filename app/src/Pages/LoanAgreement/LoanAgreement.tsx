import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import styles from "./LoanAgreement.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { LocalData } from "../../Data/LocalData";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../App";

export const LoanAgreementPage = () => {
  const [params] = useSearchParams(useLocation().search);

  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [occupiedIntervals, setOccupiedIntervals] = useState<any[]>([]);

  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const renterId = getAuth().currentUser ? getAuth().currentUser!.uid : "";
  const adId = params.get("id") || "";
  const adLink = `/ad/${adId}`;

  useEffect(() => {
    // Hent data fra annonse
    getDoc(doc(db, "ads", adId)).then(async (adDoc) => {
      if (adDoc.exists()) {
        const adData = adDoc.data();
        setUserId(adData.userId);
        setTitle(adData.title);
        setPrice(adData.price);

        // Hent data fra bruker
        getDoc(doc(db, "users", adData.userId)).then((userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name);
          }
        });

        // Hent bilde fra storage
        const storage = getStorage();
        let storageRef;
        if (adData.images === undefined) {
          storageRef = ref(storage, "images/ads/placeholder-image (1).png");
        } else {
          storageRef = ref(storage, adData.images[0]);
        }
        getDownloadURL(storageRef).then((url) => {
          setImageURL(url);
        });

        // Hent data fra låneavtaler for å finne datoer som er opptatt
        const loanAgreementsRef = collection(db, "loanAgreements");
        const q = query(loanAgreementsRef, where("adId", "==", adId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((element) => {
          const loanAgreementData = element.data();

          const startDate = new Date(loanAgreementData.dateFrom.seconds * 1000);
          const endDate = new Date(loanAgreementData.dateTo.seconds * 1000);

          const diffDaysStart = Math.ceil(
            (startDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
          );
          const diffDaysEnd = Math.ceil(
            (endDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
          );

          if (diffDaysStart >= 0 || (diffDaysStart <= 0 && diffDaysEnd >= 0)) {
            const intervalStart = addDays(new Date(), diffDaysStart);
            const intervalEnd = addDays(new Date(), diffDaysEnd);
            intervalStart.setHours(0, 0, 0, 0);
            intervalEnd.setHours(0, 0, 0, 0);

            setOccupiedIntervals((prev) => [
              ...prev,
              { start: intervalStart, end: intervalEnd },
            ]);
          }
        });
      }
    });
  }, [adId]);

  useEffect(() => {
    if (userId === renterId) {
      setErrorMessage("Du kan ikke låne fra deg selv!");
      setDisabled(true);
    } else {
      setErrorMessage("");
      setDisabled(false);
    }

    if (startDate === null || endDate === null) {
      return;
    }

    // Setter tidspunkt til 00:00:00:00
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    occupiedIntervals.every((dateInterval) => {
      if (
        (startDate <= dateInterval.start && endDate >= dateInterval.end) || // Låneperioden inneholder en opptatt periode
        (startDate >= dateInterval.start && endDate <= dateInterval.end) || // Låneperioden er innenfor en opptatt periode
        (startDate <= dateInterval.start && endDate >= dateInterval.start) || // Låneperioden starter før en opptatt periode og slutter i løpet av en opptatt periode
        (startDate <= dateInterval.end && endDate >= dateInterval.end) // Låneperioden starter i løpet av en opptatt periode og slutter etter
      ) {
        setErrorMessage("Hele eller deler av låneperioden er opptatt!");
        setDisabled(true);
        return false;
      }
      return true;
    });
  }, [startDate, endDate, occupiedIntervals]);

  const loanAgreement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validering

    //Opprett låneavtale-objekt
    const loanAgreement = {
      dateFrom: startDate,
      dateTo: endDate,
      adId: adId,
      renterId: renterId,
      userId: userId,
    };

    //Opprett låneavtale dokument i firebase med automatisk generert id
    LocalData.loanAgreements
      .createNewDocumentWithoutId(loanAgreement)
      .then(() => {
        alert("Låneavtale inngått!");
      });
  };

  return (
    <div>
      <div className={styles.loanAgreementContent}>
        <h1>Inngå en Låneavtale</h1>
        <form className={styles.loanAgreementForm} onSubmit={loanAgreement}>
          <a href={adLink} style={{ textDecoration: "none" }}> {/* Link til annonsen */}
            <div id={styles.adInfo}>
              <div className={styles.bilde}>
                <img src={imageURL} alt="Bilde av annonsen" />
              </div>
              <div className={styles.info}>
                <h2>{title}</h2>
                <p>Pris: {price} kr</p>
                <br></br> <br></br>
                <p>Lån av: {name}</p>
              </div>
            </div>
          </a>
          <br></br>
          <br></br>
          <div id={styles.labels}>
            <label className={styles.label} htmlFor="startDate">
              Dato fra: <span className={styles.required}>&nbsp;*</span>
            </label>
            <br></br>
            <br></br>
            <label className={styles.label} htmlFor="endDate">
              Dato til: <span className={styles.required}>&nbsp;*</span>
            </label>
            <br></br>
          </div>
          <div id={styles.dates}>
            <DatePicker
              className={errorMessage ? styles.dateError : styles.date}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDateIntervals={occupiedIntervals}
              dateFormat="dd/MM/yyyy"
            />
            <br></br>
            <DatePicker
              className={errorMessage ? styles.dateError : styles.date}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              excludeDateIntervals={occupiedIntervals}
              dateFormat="dd/MM/yyyy"
            />
            <br></br>
            <br></br>
            <div className={styles.errorSection}>
              <p className={styles.error}>{errorMessage}</p>
            </div>
          </div>
          <div></div>
          <button
            className={buttonStyles.mainButton}
            type="submit"
            disabled={disabled}
          >
            Bekreft
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanAgreementPage;
