import { UsersCollection } from "./Users/UsersCollection";
import { AdsCollection } from "./Ads/AdsCollection";
import { LoanAgrCollection } from "./LoanAgreements/LoanAgrCollection";

export class LocalData {
  static users = new UsersCollection();
  static ads = new AdsCollection();
  static loanAgreements = new LoanAgrCollection();

}
