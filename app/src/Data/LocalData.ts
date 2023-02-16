import { UsersCollection } from "./Users/UsersCollection";
import { AdsCollection } from "./Ads/AdsCollection";
import { UserData } from "./Users/UserData";
import { getAuth } from "firebase/auth";

export class LocalData {
  static users = new UsersCollection();
  static ads = new AdsCollection();

  static currentUser: UserData;

  static signOutFirebaseUser() {
    getAuth().signOut();
  }
}
