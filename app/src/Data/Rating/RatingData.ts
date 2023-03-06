import { Timestamp } from "firebase/firestore";
import { FirebaseData } from "../FirebaseData";
import { LocalData } from "../LocalData";
import { UserData } from "../Users/UserData";

export class RatingData extends FirebaseData {
  raterUser?: UserData;
  date: Date = new Date();
  ratingNumber: number = 0;
  comment: String = "";

  constructor(id: string) {
    super(id, "ratings", undefined);
  }

  setup(data: any) {
    super.setup(data);

    if (data) {
      if (typeof data.raterUserId === "string") {
        this.raterUser = LocalData.users.addData(data.raterUserId);
      }
      if (data.date instanceof Timestamp) {
        this.date = data.date.toDate();
      }
      if (typeof data.ratingNumber === "number") {
        this.ratingNumber = data.ratingNumber;
      }
      if (typeof data.comment === "string") {
        this.comment = data.comment;
      }
    }
  }
}
