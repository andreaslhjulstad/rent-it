import { UsersCollection } from "./Users/UsersCollection";
import { AdsCollection } from "./Ads/AdsCollection";
import { UserData } from "./Users/UserData";

export class LocalData {
  static users = new UsersCollection();
  static ads = new AdsCollection();

  static currentUser: UserData;
}
