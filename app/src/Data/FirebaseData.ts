import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";
export class FirebaseRealtimeLister {
  callback: () => void;
  constructor(callback: () => void) {
    this.callback = callback;
  }
  removeListener() {
    this.callback();
  }
}

export class FirebaseData {
  id: string = "";
  loaded: boolean = false;
  parent?: FirebaseData;
  collectionName: string;

  constructor(id: string, collectionName: string, parent: FirebaseData | undefined) {
    this.id = id;
    this.collectionName = collectionName;
    this.parent = parent;
  }

  setup(data: any) {
    this.loaded = true;
  }

  load(): Promise<this> {
    return new Promise<this>(async (resolve, reject) => {
      const docRef = doc(db, this.collectionName, this.id);
      getDoc(docRef)
        .then(async (doc) => {
          if (doc.data()) {
            await this.setup(doc.data());
            resolve(this);
          } else {
            reject(undefined);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
