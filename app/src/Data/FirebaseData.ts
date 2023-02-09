import firebase from "firebase/compat/app";

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

  load(): Promise<this> {
    return new Promise<this>((resolve, reject) => {});
  }
}
