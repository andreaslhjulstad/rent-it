import CollectionLoader from "../CollectionLoader";
import { FirebaseData } from "../FirebaseData";

export class AllAdsData extends FirebaseData {
  constructor() {
   super("all", "ads", undefined); 
  }
}