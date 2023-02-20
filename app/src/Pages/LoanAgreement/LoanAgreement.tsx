import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoanAgreement.module.css";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { LocalData } from "../../Data/LocalData";
import { updateDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const LoanAgreementPage = () => {
    const navigate = useNavigate();
    
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

   
    
    const loanAgreement = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Validering 
       /*  if (Date.parse(dateFrom) > new Date().getTime()  || Date.parse(dateTo) > new Date().getTime()) {
            alert("Du kan ikke velge en dato som allerede har vært.");
            console.log("Du kan ikke velge en dato som allerede har vært.");
            return;
            
        }
        else if(Date.parse(dateFrom) > Date.parse(dateTo)){
            alert("Dato fra kan ikke være etter dato til");
            console.log("Dato fra kan ikke være etter dato til");
            return;
            
        } */

        //Opprett låneavtale-objekt
        const loanAgreement = {
            dateFrom: startDate,
            dateTo: endDate,
            userId: getAuth().currentUser?.uid,
        };
        //Opprett låneavtale dokument i firebase med automatisk generert id

    };

    return(
        <body>
            <div className={styles.loanAgreementContent}>
                <h1>Inngå en Låneavtale</h1>

                <form className={styles.loanAgreementForm} onSubmit={loanAgreement}>
                    <div id={styles.adInfo}>
                        <div className={styles.bilde}></div>
                        <div className={styles.info}>
                            <h2>Verktøy</h2>
                            <p>Pris: 400 kr</p>
                            <br></br> <br></br>
                            <p>Lån av: Ola Nordmann</p>
                        </div>
                    </div>
                    <br></br><br></br>

                    <div id={styles.labels}>
                        <label className={styles.label} htmlFor="startDate">Dato fra: <span className={styles.required}>&nbsp;*</span></label><br></br><br></br>
                        <label className={styles.label} htmlFor="endDate">Dato til: <span className={styles.required}>&nbsp;*</span></label><br></br>
                    </div>
                    
                    <div id={styles.dates}>   
                        <DatePicker id={styles.startDate} selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} minDate={new Date()}/>
                        <br></br>
                        <DatePicker id={styles.endDate} selected={endDate} onChange={(date) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate}/>
                        <br></br>
                    </div>
                    <br></br><br></br><br></br><br></br><br></br>
                    <button className={styles.mainButton} type="submit">Bekreft</button>
                </form>
            </div>
        </body>
    );
};

export default LoanAgreementPage;
