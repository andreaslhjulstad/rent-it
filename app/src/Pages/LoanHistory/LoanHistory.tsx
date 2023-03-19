import { getAuth } from "firebase/auth";
import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import LoanAgreementHistory from "../../Components/LoanAgreements/LoanAgreementHistory/LoanAgreementHistory";
import Navbar from "../../Data/Components/navbar/Navbar";
import { LoanAgreementData } from "../../Data/LoanAgreements/LoanAgreementData";
import { LocalData } from "../../Data/LocalData";
import { UserData } from "../../Data/Users/UserData";
import styles from "./LoanHistory.module.css";

const LoanHistory = () => {
  const [loanAgreements, setLoanAgreements] = useState<LoanAgreementData[]>([]);
  getAuth().onAuthStateChanged((user) => {
    if (user) {
      LocalData.currentUser = new UserData(user.uid);
      loadAgreements();
    }
  });
  const loadAgreements = () => {
    LocalData.loanAgreements.loadDocumentsWithFilter([where("renterId", "==", LocalData.currentUser?.id)]).then((loanAgreements) => {
      setLoanAgreements(loanAgreements);
    });
  };
  useEffect(() => {
    if (LocalData.currentUser) loadAgreements();
  }, []);
  return (
    <div>
      <Navbar />
      <div id={styles.mainContainer}>
        <h1>Din lånehistorikk</h1>
        {loanAgreements.map((agreement) => {
          return <LoanAgreementHistory key={agreement.id} agreement={agreement} />;
        })}
      </div>
    </div>
  );
};

export default LoanHistory;
