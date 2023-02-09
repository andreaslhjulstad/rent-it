import firebase from "firebase/compat/app";
import { FirebaseData, FirebaseRealtimeLister } from "./FirebaseData";

interface NoParamConstructor<T extends FirebaseData> {
  new (id: string, collection: string, parent: FirebaseData | undefined): T;
}

export class CollectionLoadedListener<T extends FirebaseData> {
  id = "id"; // TODO
  loader: CollectionLoader<T>;
  callback: (docs: T[]) => void;
  constructor(callback: (docs: T[]) => void, loader: CollectionLoader<T>) {
    this.callback = callback;
    this.loader = loader;
  }
  removeListener() {
    //this.loader.removeListener(this);
  }
}

export default class CollectionLoader<T extends FirebaseData> {
  collection: string = "";
  parent?: FirebaseData;
  loaded = false;
  loading = false;
  loadedListeners: CollectionLoadedListener<T>[] = [];
  documents: T[] = [];

  constructor(collection: string, parent: FirebaseData | undefined) {
    this.collection = collection;
    this.parent = parent;
  }

  load(): Promise<T[]> {
    const path = "path"; // TODO

    this.loading = true;
    return firebase
      .firestore()
      .collection(path)
      .get()
      .then((snapshot) => {
        this.documents = [];
        return this.documents;
      })
      .catch((error) => {
        console.log("Error loading documents from " + path);
        console.log(error.message);
        throw error;
      })
      .finally(() => {
        this.loaded = true;
        this.loading = false;

        for (const listener of this.loadedListeners) {
          listener.callback(this.documents);
        }

        this.loadedListeners = [];
        return this.documents;
      });
  }
}
