import CollectionLoader from "../CollectionLoader";
import { FirebaseData } from "../FirebaseData";

export class UsersCollection extends CollectionLoader<FirebaseData> {
  constructor() {
    super("users", undefined);
  }
}
