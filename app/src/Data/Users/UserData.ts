import CollectionLoader from "../CollectionLoader";
import { FirebaseData } from "../FirebaseData";
import { RatingData } from "../Rating/RatingData";

export class UserData extends FirebaseData {
  email: string = "";
  phoneNumber: string = "";
  name: string = "";
  ratings = new CollectionLoader("ratings", this, RatingData);

  constructor(id: string) {
    super(id, "users", undefined);
  }

  setup(data: any) {
    super.setup(data);

    if (data) {
      if (typeof data.email === "string") {
        this.email = data.email;
      }
      if (typeof data.phoneNumber === "string") {
        this.phoneNumber = data.phoneNumber;
      }
      if (typeof data.name === "string") {
        this.name = data.name;
      }
    }
  }
}
