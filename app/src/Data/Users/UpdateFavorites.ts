import { FirebaseData } from "../FirebaseData";
import * as firebase from "firebase/app"; 
import { db } from "../../App";
import { getDoc, getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import 'firebase/firestore';
import { LocalData } from "../LocalData";
import CollectionLoader from "../CollectionLoader";

export class UpdateFavorites extends FirebaseData {
    static async addFavoriteToList(newFavorite: any, userId: string) {
        LocalData.users.addNewFavorite(newFavorite, userId);
    }
    static async removeFavoriteFromList(newFavorite: any, userId: string) {
        LocalData.users.removeFavorite(newFavorite, userId);
    }
}
