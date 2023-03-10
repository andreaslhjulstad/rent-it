import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import CollectionLoader from "../CollectionLoader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App";
import LoanAgreement from "../../Pages/LoanAgreement/LoanAgreement";
import { FirebaseData } from "../FirebaseData";
import { RatingData } from "../Rating/RatingData";
import { UserData } from "../Users/UserData";

export class AdData extends FirebaseData {
  title: string = "";
  description: string = "";
  category: string[] = [];
  price: number = 0;
  area: string = "";
  user: UserData | undefined;
  images: string[] = [];
  loadedImages: string[] = [];
  ratings = new CollectionLoader("ratings", this, RatingData);
  isRented: boolean = false;

  constructor(id: string) {
    super(id, "ads", undefined);
  }

  setup(data: any) {
    super.setup(data);
    // Check if data.title is string
    if (data) {
      if (typeof data.title === "string") {
        this.title = data.title;
      }
      if (typeof data.description === "string") {
        this.description = data.description;
      }
      if (Array.isArray(data.category)) {
        this.category = [];
        data.category.forEach(async (aCategory: any) => {
          if (typeof aCategory === "string") {
            this.category.push(aCategory);
          }
        });
      }
      if (typeof data.price === "number") {
        this.price = data.price;
      }
      if (typeof data.area === "string") {
        this.area = data.area;
      }
      if (typeof data.userId === "string") {
        this.user = new UserData(data.userId);
      }
      if (Array.isArray(data.images)) {
        this.images = [];
        data.images.forEach(async (image: any) => {
          if (typeof image === "string") {
            this.images.push(image);
          }
        });
      }
      this.getRentedStatus().then(rented => this.isRented = rented); //setter utlån status
      
      
    }
  }

  async getRentedStatus() : Promise<boolean>{
    return new Promise<boolean>(async (resolve, reject) => {
      // Hent data fra låneavtaler for å sette utlån status
      const loanAgreementsRef = collection(db, "loanAgreements");
      const q = query(loanAgreementsRef, where("adId", "==", this.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((element) => {
        const loanAgreementData = element.data();

        const startDate = new Date(loanAgreementData.dateFrom.seconds * 1000);
        const endDate = new Date(loanAgreementData.dateTo.seconds * 1000);
        if (startDate <= new Date && endDate >= new Date) {
          resolve(true);
        }
    
      });
      resolve(false);

    });       
  }    

  loadImages(): Promise<this> {
    return new Promise<this>(async (resolve, reject) => {
      const storage = getStorage();
      this.loadedImages = [];
      if (this.images.length > 0) {
        let loadedImages = 0;
        this.images.forEach(async (image) => {
          await getDownloadURL(ref(storage, image))
            .then((url) => {
              loadedImages++;
              this.loadedImages.push(url);
              if (loadedImages >= this.images.length) {
                resolve(this);
              }
            })
            .catch((error) => {
              loadedImages++;
              console.log(error);
              if (loadedImages >= this.images.length) {
                resolve(this);
              }
            });
        });
      } else {
        await getDownloadURL(ref(storage, "images/ads/placeholder-image (1).png"))
          .then((url) => {
            this.loadedImages = [url];
            resolve(this);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }
}
