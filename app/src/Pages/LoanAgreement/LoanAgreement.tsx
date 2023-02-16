import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoanAgreement.module.css";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { LocalData } from "../../Data/LocalData";
import { updateDoc } from "firebase/firestore";

export const LoanAgreementPage = () => {
    const navigate = useNavigate();

    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    
    const loanAgreement = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Validering 
        if (dateFrom === "" || dateTo === "") {
            alert("Alle de obligatoriske feltene må fylles ut");
            return;
        }

        //Opprett låneavtale-objekt
        const loanAgreement = {
            dateFrom: dateFrom,
            dateTo: dateTo,
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
                        <label className={styles.label} htmlFor="dateFrom">Dato fra: <span className={styles.required}>&nbsp;*</span></label><br></br><br></br>
                        <label className={styles.label} htmlFor="dateTo">Dato til: <span className={styles.required}>&nbsp;*</span></label><br></br>
                    </div>
                    
                    <div id={styles.dates}>
                        <input type="date" id={styles.dateFrom} onChange={(e) => setDateFrom(e.target.value)}/>
                        <br></br>
                        <input type="date" id={styles.dateTo} onChange={(e) => setDateTo(e.target.value)}/>
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
