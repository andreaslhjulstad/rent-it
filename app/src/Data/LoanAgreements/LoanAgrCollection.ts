import CollectionLoader from "../CollectionLoader";
import { FirebaseData } from "../FirebaseData";

export class LoanAgrCollection extends CollectionLoader<FirebaseData> {
  constructor() {
    super("loanAgreements", undefined);
  }
}
