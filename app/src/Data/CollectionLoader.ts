import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../App";
import { FirebaseData } from "./FirebaseData";

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

  createNewDocument(id: string, value: object) {
    return new Promise<undefined>((resolve, reject) => {
      console.log(this.collection);
      console.log(id);
      setDoc(doc(db, this.collection, id), value)
        .then(() => {
          resolve(undefined);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  createNewDocumentWithoutId(value: object) {
    return new Promise<undefined>((resolve, reject) => {
      console.log(this.collection);
      addDoc(collection(db, this.collection), value)
        .then(() => {
          resolve(undefined);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
