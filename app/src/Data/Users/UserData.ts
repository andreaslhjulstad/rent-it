import CollectionLoader from "../CollectionLoader";
import { profile } from "console";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { FirebaseData } from "../FirebaseData";
import { RatingData } from "../Rating/RatingData";

export class UserData extends FirebaseData {
  email: string = "";
  phoneNumber: string = "";
  name: string = "";
  ratings = new CollectionLoader("ratings", this, RatingData);
  image: string = "";
  favorites: string[] = [];

  constructor(id: string) {
    super(id, "users", undefined);
  }

  async setup(data: any) {
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
      if (typeof data.imagePath === "string") {
        const storageRef = ref(getStorage(), data.imagePath);
        await getDownloadURL(storageRef).then((url) => {
          this.image = url;
        });
      }
      if (Array.isArray(data.favorites)) {
        this.favorites = [];
        data.favorites.forEach(async (favorite: any) => {
          if (typeof favorite === "string") {
            this.favorites.push(favorite);
          }
        });
      }
    }
  }
}
