import CollectionLoader from "../CollectionLoader";
import { FirebaseData } from "../FirebaseData";

export class AdsCollection extends CollectionLoader<FirebaseData> {
  constructor() {
    super("ads", undefined);
  }
}