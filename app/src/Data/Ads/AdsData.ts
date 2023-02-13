import CollectionLoader from "../CollectionLoader";
import { FirebaseData } from "../FirebaseData";

export class AdsData extends FirebaseData {
  constructor(id: string) {
   super(id, "ads", undefined); 
  }
}