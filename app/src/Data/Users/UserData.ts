import { FirebaseData } from "../FirebaseData";

export class UserData extends FirebaseData {
  email: string = "";
  phoneNumber: string = "";
  name: string = "";

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
