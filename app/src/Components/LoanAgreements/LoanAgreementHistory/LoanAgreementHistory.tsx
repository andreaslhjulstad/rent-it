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
  const [renter, setRenter] = useState<UserData | undefined>(props.agreement.renter);

  useEffect(() => {
    if (!props.agreement.ad?.loaded) {
      props.agreement.ad?.load().then((ad) => setAd(ad));
    }
    if (!props.agreement.renter?.loaded) {
      props.agreement.renter?.load().then((renter) => setRenter(renter));
    }
  }, [props.agreement]);

  return (
    <div className={styles.loanAgreement}>
      <Link to={ad ? "/ad/" + ad.id : "/AdsPage"}>
        <h3>{ad?.title ?? ""}</h3>
      </Link>
      <p>{"Du leide fra: " + (renter?.name ?? "uvisst")}</p>
      <p>{"Periode: " + DateUtilities.formatDate(props.agreement.dateFrom) + " - " + DateUtilities.formatDate(props.agreement.dateTo) + " (" + DateUtilities.daysBetween(props.agreement.dateFrom, props.agreement.dateTo) + " dager)"}</p>
      <p>{"Pris per dag: " + (props.agreement.price ?? "uvisst")}</p>
      <p>{"Totalsum: " + (props.agreement.price ? props.agreement.price * DateUtilities.daysBetween(props.agreement.dateFrom, props.agreement.dateTo) : "uvisst")}</p>
    </div>
  );
};

export default LoanAgreementHistory;
