import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import styles from "./LoanAgreement.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { LocalData } from "../../Data/LocalData";
import {
  addDoc,
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
import Navbar from "../../Data/Components/navbar/Navbar";

export const LoanAgreementPage = () => {
  const params = useParams();

  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [occupiedIntervals, setOccupiedIntervals] = useState<any[]>([]);

  const [disabled, setDisabled] = useState(false);
  const [validDate, setValidDate] = useState(false);
  const [validIDs, setValidIds] = useState(false);
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [userErrorMessage, setUserErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const renterId = getAuth().currentUser ? getAuth().currentUser!.uid : "";

  const adLink = `/ad/${params.adID}`;

  useEffect(() => {
    if (params.adID) {
      // Hent data fra annonse
      getDoc(doc(db, "ads", params.adID)).then(async (adDoc) => {
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
          const q = query(loanAgreementsRef, where("adId", "==", params.adID));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((element) => {
            const loanAgreementData = element.data();

            const startDate = new Date(
              loanAgreementData.dateFrom.seconds * 1000
            );
            const endDate = new Date(loanAgreementData.dateTo.seconds * 1000);

            const diffDaysStart = Math.ceil(
              (startDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
            );
            const diffDaysEnd = Math.ceil(
              (endDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
            );

            if (
              diffDaysStart >= 0 ||
              (diffDaysStart <= 0 && diffDaysEnd >= 0)
            ) {
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
    }
  }, [params.adID]);

  useEffect(() => {
    if (startDate === null || endDate === null) {
      return;
    } 
    if (userId && renterId) {
      if (userId === renterId) {
        setUserErrorMessage("Du kan ikke låne fra deg selv!");
        setValidIds(false);
      } else {
        setUserErrorMessage("");
        setValidIds(true);
      }
    } else {
      setUserErrorMessage("");
      setValidIds(false);
    }

    // Setter tidspunkt til 00:00:00:00
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    let occupied: boolean = false;
    occupiedIntervals.every((dateInterval) => {
      if (
        (startDate <= dateInterval.start && endDate >= dateInterval.end) || // Låneperioden inneholder en opptatt periode
        (startDate >= dateInterval.start && endDate <= dateInterval.end) || // Låneperioden er innenfor en opptatt periode
        (startDate <= dateInterval.start && endDate >= dateInterval.start) || // Låneperioden starter før en opptatt periode og slutter i løpet av en opptatt periode
        (startDate <= dateInterval.end && endDate >= dateInterval.end) // Låneperioden starter i løpet av en opptatt periode og slutter etter
      ) {
        setDateErrorMessage("Hele eller deler av låneperioden er opptatt!");
        setValidDate(false);
        occupied = true;
        return false;
      }
      return true;
    });
    if (!occupied) {
      setDateErrorMessage("");
      setValidDate(true);
    }
    if (startDate > endDate) {
      setDateErrorMessage("Startdato kan ikke være etter sluttdato!");
      setValidDate(false);
    }
  }, [startDate, endDate, occupiedIntervals, renterId, userId]);

  useEffect(() => {
    if (validDate && validIDs) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [validDate, validIDs]);

  useEffect(() => {
    if (userErrorMessage) {
      setErrorMessage(userErrorMessage);
    } else {
      setErrorMessage(dateErrorMessage);
    }
  }, [dateErrorMessage, userErrorMessage]);

  const loanAgreement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validering

    // Opprett låneavtale-objekt
    const loanAgreement = {
      dateFrom: startDate,
      dateTo: endDate,
      adId: params.adID,
      renterId: renterId,
      userId: userId,
    };

    // Opprett låneavtale dokument i firebase med automatisk generert id  
    // Bør endres til ny implementasjon av innlasting senere  
    addDoc(collection(db, "loanAgreements"), loanAgreement)
      .then(() => {
        alert("Låneavtale inngått!");
        window.location.href = "/";
    });
  };

  return (
    <div>
      <Navbar />
      <div className={styles.loanAgreementContent}>
        <h1>Inngå en Låneavtale</h1>
        <form className={styles.loanAgreementForm} onSubmit={loanAgreement}>
          <a className={styles.link} href={adLink} style={{ textDecoration: "none" }}>
            {" "}
            {/* Link til annonsen */}
            <div id={styles.adInfo}>
              <div className={styles.bilde}>
                <img src={imageURL} alt="Bilde av annonsen" />
              </div>
              <div className={styles.info}>
                <h2>{title}</h2>
                <p>Pris: {price} kr</p>
                <p>Lån av: {name}</p>
              </div>
            </div>
          </a>
          <br></br>
          <br></br>
          <div id={styles.labels}>
            <label htmlFor="startDate">Dato fra:</label>
            <br></br>
            <br></br>
            <label htmlFor="endDate">Dato til:</label>
            <br></br>
          </div>
          <div id={styles.dates}>
            <DatePicker
              id="startDate"
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
              id="endDate"
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
          </div>
          <div className={styles.errorSection}>
              <p className={styles.error}>{errorMessage}</p>
          </div>
          <div></div>
          <br></br>
          <button
            className={buttonStyles.mainButton}
            type="submit"
            disabled={disabled}>
            Bekreft
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanAgreementPage;
