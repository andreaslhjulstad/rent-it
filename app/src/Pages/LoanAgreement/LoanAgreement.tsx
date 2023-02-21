import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./LoanAgreement.module.css";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { LocalData } from "../../Data/LocalData";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import DatePicker from "react-datepicker";
import { addDays, subDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../App";

export const LoanAgreementPage = () => {
    const [params] = useSearchParams(useLocation().search);
    const [userId, setUserId] = useState("");
    const adId = params.get("id") || "";
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [name, setName] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [dateArray, setDateArray] = useState<any[]>([]);

    useEffect(() => {
        //hent data fra annonser
        getDoc(doc(db, "ads", adId)).then(async (adDoc) => {
            if (adDoc.exists()) {
                const adData = adDoc.data();
                setUserId(adData.userId);
                setTitle(adData.title);
                setPrice(adData.price);
                console.log("");

                // hent data fra bruker
                getDoc(doc(db, "users", adData.userId)).then((userDoc) => {
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setName(userData.name);
                    }
                });

                // hent bilde fra storage
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

                // hent data fra låneavtaler
                const loanAgreementsRef = collection(db, "loanAgreements");
                const q = query(loanAgreementsRef, where("adId", "==", adId));
                const querySnapshot = await getDocs(q);
                let dateArray: any[] = [];
                querySnapshot.forEach(element => {
                    const loanAgreementData = element.data();
                    const startDate = new Date(loanAgreementData.dateFrom.seconds * 1000);
                    const endDate = new Date(loanAgreementData.dateTo.seconds * 1000);

                    const diffStart = startDate.getTime() - new Date().getTime();
                    const diffEnd = endDate.getTime() - new Date().getTime();
    
                    const diffDaysStart = Math.ceil(diffStart / (1000 * 3600 * 24));
                    const diffDaysEnd = Math.ceil(diffEnd / (1000 * 3600 * 24));
                    
                    if (diffDaysStart >= 0){
                        setDateArray((prev) => [...prev, { start: addDays(new Date(), diffDaysStart - 1), end: addDays(new Date(), diffDaysEnd) }]);
                    } else if (diffDaysEnd >= 0 && diffDaysStart <= 0){
                        setDateArray((prev) => [...prev, { start: addDays(new Date(), diffDaysStart - 1), end: addDays(new Date(), diffDaysEnd) }]);
                    }
                });
            }
        });

    }, []);

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());


    const loanAgreement = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const renterId = getAuth().currentUser?.uid;
        //Validering
        /* if (userId === renterId) {
            alert("Du kan ikke låne fra deg selv!");
            return;
        } */

        //Opprett låneavtale-objekt
        const loanAgreement = {
            dateFrom: startDate,
            dateTo: endDate,
            adId: adId,
            renterId: getAuth().currentUser?.uid,
            userId: userId,
        };


        //Opprett låneavtale dokument i firebase med automatisk generert id
        LocalData.loanAgreements.createNewDocumentWithoutId(loanAgreement);
    };

    return (
        <div>
            <div className={styles.loanAgreementContent}>
                <h1>Inngå en Låneavtale</h1>

                <form className={styles.loanAgreementForm} onSubmit={loanAgreement}>
                    <div id={styles.adInfo}>
                        <div className={styles.bilde}>
                            <img src={imageURL} />
                        </div>
                        <div className={styles.info}>
                            <h2>{title}</h2>
                            <p>Pris: {price} kr</p>
                            <br></br> <br></br>
                            <p>Lån av: {name}</p>
                        </div>
                    </div>
                    <br></br><br></br>

                    <div id={styles.labels}>
                        <label className={styles.label} htmlFor="startDate">Dato fra: <span className={styles.required}>&nbsp;*</span></label><br></br><br></br>
                        <label className={styles.label} htmlFor="endDate">Dato til: <span className={styles.required}>&nbsp;*</span></label><br></br>
                    </div>

                    <div id={styles.dates}>
                        <DatePicker 
                            id={styles.startDate} 
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)} 
                            selectsStart startDate={startDate} 
                            endDate={endDate} 
                            minDate={new Date()} 
                            excludeDateIntervals={dateArray}
                        />
                        <br></br>
                        <DatePicker 
                            id={styles.endDate} 
                            selected={endDate} 
                            onChange={(date) => setEndDate(date)} 
                            selectsEnd startDate={startDate} 
                            endDate={endDate} 
                            minDate={startDate} 
                            excludeDateIntervals={dateArray}
                        />
                        <br></br>
                    </div>
                    <br></br><br></br><br></br><br></br><br></br>
                    <button className={styles.mainButton} type="submit">Bekreft</button>
                </form>
            </div>
        </div>
    );
};

export default LoanAgreementPage;
