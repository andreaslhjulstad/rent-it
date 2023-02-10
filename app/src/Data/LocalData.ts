import { UsersCollection } from "./Users/UsersCollection";
import { AdsCollection } from "./Ads/AdsCollection";

export class LocalData {
  static users = new UsersCollection();
  static ads = new AdsCollection();
}
