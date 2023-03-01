import { UserData } from "./Users/UserData";
import { getAuth } from "firebase/auth";
import CollectionLoader from "./CollectionLoader";
import { AdData } from "./Ads/AdData";
import { LoanAgreementData } from "./LoanAgreements/LoanAgreementData";

export class LocalData {
  static users = new CollectionLoader("users", undefined, UserData);
  static ads = new CollectionLoader("ads", undefined, AdData);
  static loanAgreements = new CollectionLoader("loanAgreements", undefined, LoanAgreementData);

  static currentUser?: UserData;

  static signOutFirebaseUser() {
    getAuth().signOut();
  }
}
