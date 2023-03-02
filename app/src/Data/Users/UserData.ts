import { profile } from "console";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { FirebaseData } from "../FirebaseData";

export class UserData extends FirebaseData {
  email: string = "";
  phoneNumber: string = "";
  name: string = "";
  image: string = "";

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
    }
  }
}
