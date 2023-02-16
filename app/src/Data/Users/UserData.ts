import { FirebaseData } from "../FirebaseData";

export class UserData extends FirebaseData {
  constructor(id: string) {
    super(id, "users", undefined);
  }

  setup(data: any) {
    this.loaded = true;
  }
}
