import firebase from "firebase/compat/app";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";
import { collection, getDocs } from "firebase/firestore";

export class DocumentLoadedListener {
  id = "todo";
  data: FirebaseData;
  callback: (error?: firebase.firestore.FirestoreError) => void;
  constructor(callback: (error?: firebase.firestore.FirestoreError) => void, data: FirebaseData) {
    this.callback = callback;
    this.data = data;
  }
  removeListener() {
    //this.data.removeListener(this);
  }
}

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
  loadedListeners: DocumentLoadedListener[] = [];
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

  loadAll(): Promise<this> {
    return new Promise<this>(async (resolve, reject) => {

    const querySnapshot = await getDocs(collection(db, this.collectionName));

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data()); 
      
    });
  });
}

loadOne(): Promise<this> {
  return new Promise<this>(async (resolve, reject) => {
  const docRef = doc(db, this.collectionName, this.id);
  
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(docSnap.data().title)
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
});
}
}
