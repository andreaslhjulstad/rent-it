import { useEffect, useState } from "react";
import { LoanAgreementData } from "../../../Data/LoanAgreements/LoanAgreementData";
import { Link } from "react-router-dom";
import styles from "./LoanAgreementHistory.module.css";
import { AdData } from "../../../Data/Ads/AdData";
import { UserData } from "../../../Data/Users/UserData";
import { DateUtilities } from "../../../Utilities/DateUtilities/DateUtilities";

interface LoanAgreementHistoryProps {
  agreement: LoanAgreementData;
}

const LoanAgreementHistory = (props: LoanAgreementHistoryProps) => {
  const [ad, setAd] = useState<AdData | undefined>(props.agreement.ad);
  const [user, setUser] = useState<UserData | undefined>(props.agreement.user);

  useEffect(() => {
    if (!props.agreement.ad?.loaded) {
      props.agreement.ad?.load().then((ad) => setAd(ad));
    }
    if (!props.agreement.user?.loaded) {
      props.agreement.user?.load().then((renter) => setUser(renter));
    }
  }, [props.agreement]);
  return (
    <div className={styles.loanAgreement}>
      <Link to={ad ? "/ad/" + ad.id : "/AdsPage"}>
        <h3>{ad?.title ?? ""}</h3>
      </Link>
      <p>{"Du leide fra: " + (user?.name ?? "uvisst")}</p>
      <p>{"Periode: " + DateUtilities.formatDate(props.agreement.dateFrom) + " - " + DateUtilities.formatDate(props.agreement.dateTo) + " (" + (DateUtilities.daysBetween(props.agreement.dateFrom, props.agreement.dateTo) + 1) + (((DateUtilities.daysBetween(props.agreement.dateFrom, props.agreement.dateTo) + 1) > 1) ? " dager)" : " dag)")}</p>
      <p>{"Pris per dag: " + (ad?.price !== undefined ? ad.price + ",-" : "uvisst")}</p>
      <p className={styles.totalSum}>{"Totalsum: " + (ad?.price !== undefined ? ad.price * (DateUtilities.daysBetween(props.agreement.dateFrom, props.agreement.dateTo) + 1) + ",-" : "uvisst")}</p>
    </div>
  );
};

export default LoanAgreementHistory;
