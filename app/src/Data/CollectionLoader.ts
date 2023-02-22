import { addDoc, collection, doc, DocumentReference, getDocs, setDoc } from "firebase/firestore";
import { db } from "../App";
import { FirebaseData } from "./FirebaseData";

interface NoParamConstructor<T extends FirebaseData> {
  new (id: string, collection: string, parent: FirebaseData | undefined): T;
}

export default class CollectionLoader<T extends FirebaseData> {
  collection: string = "";
  parent?: FirebaseData;
  loaded = false;
  loading = false;
  documents: T[] = [];
  private docType: NoParamConstructor<T>;

  constructor(collection: string, parent: FirebaseData | undefined, docType: NoParamConstructor<T>) {
    this.collection = collection;
    this.parent = parent;
    this.docType = docType;
  }

  loadDocuments(): Promise<this> {
    return new Promise<this>(async (resolve, reject) => {
      getDocs(collection(db, this.collection))
        .then((docSnap) => {
          docSnap.forEach(async (doc) => {
            let dataDoc = this.addData(doc.id);
            dataDoc.setup(doc.data());
          });
          resolve(this);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Returns a document with the given id. If the document does not exist, it will be created.
  addData(id: string): T {
    const existing = this.documents.find((doc) => doc.id === id);
    if (existing) {
      return existing;
    }

    const document = new this.docType(id, this.collection, this.parent);
    document.parent = this.parent;
    this.documents.push(document);
    return document;
  }

  /**
   * Creates a new document.
   *
   * @param value: the object to be stored in the document
   * @param id: the id of the document
   * @returns undefined
   */
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

  /**
   * Creates a new document without an id. The id will be generated by firestore.
   *
   * @param value: the object to be stored in the document
   * @returns A reference to the newly created document
   */
  createNewDocumentWithoutId(value: object) {
    return new Promise<DocumentReference>((resolve, reject) => {
      addDoc(collection(db, this.collection), value)
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
