import CollectionLoader from "../CollectionLoader";
import { FirebaseData } from "../FirebaseData";
import { UserData } from "../Users/UserData";

export class AdData extends FirebaseData {
  title: string = "";
  description: string = "";
  price: number = 0;
  area: string = "";
  user: UserData | undefined;
  images: string[] = [];

  constructor(id: string) {
    super(id, "ads", undefined);
  }

  setup(data: any) {
    super.setup(data);
    // Check if data.title is string
    if (data) {
      if (typeof data.title === "string") {
        this.title = data.title;
      }
      if (typeof data.description === "string") {
        this.description = data.description;
      }
      if (typeof data.price === "number") {
        this.price = data.price;
      }
      if (typeof data.area === "string") {
        this.area = data.area;
      }
      if (typeof data.userId === "string") {
        this.user = new UserData(data.userId);
      }
      if (Array.isArray(data.images)) {
        this.images = [];
        data.images.forEach((image: any) => {
          if (typeof image === "string") {
            this.images.push(image);
          }
        });
      }
    }
  }
}
