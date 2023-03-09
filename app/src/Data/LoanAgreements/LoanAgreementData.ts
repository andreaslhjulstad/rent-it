import { FirebaseData } from "../FirebaseData";
import { UserData } from "../Users/UserData";
import { AdData } from "../Ads/AdData";

export class LoanAgreementData extends FirebaseData {
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  ad: AdData | undefined;
  user: UserData | undefined;
  renter: UserData | undefined;

  constructor(id: string) {
    super(id, "ads", undefined);
  }

  setup(data: any) {
    super.setup(data);
    // Check if data.title is string
    if (data) {
      if (typeof data.dateFrom === "object") {
        this.dateFrom = new Date(data.dateFrom.seconds * 1000);
      }
      if (typeof data.dateTo === "object") {
        this.dateTo = new Date(data.dateTo.seconds * 1000);
      }
      if (typeof data.adId === "string") {
        this.ad = new AdData(data.adId);
      }
      if (typeof data.userId === "string") {
        this.user = new UserData(data.userId);
      }
      if (typeof data.renterId === "string") {
        this.renter = new UserData(data.renterId);
      }
    }
  }
}
