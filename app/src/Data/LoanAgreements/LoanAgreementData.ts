import { FirebaseData } from "../FirebaseData";
import { UserData } from "../Users/UserData";
import { AdData } from "../Ads/AdData";

export class LoanAgreementData extends FirebaseData {
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  ad: AdData | undefined;
  user: UserData | undefined;
  renter: UserData | undefined;
  price: number | undefined; // TODO Each loan agreement must save the price pr. day at the time of loan.

  constructor(id: string) {
    super(id, "loanAgreements", undefined);
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
      if (typeof data.price === "number") {
        this.price = data.price;
      }
    }
  }
}
