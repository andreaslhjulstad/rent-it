import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import CollectionLoader from "../CollectionLoader";
import { FirebaseData } from "../FirebaseData";
import { RatingData } from "../Rating/RatingData";
import { UserData } from "../Users/UserData";

export class AdData extends FirebaseData {
  title: string = "";
  description: string = "";
  price: number = 0;
  area: string = "";
  user: UserData | undefined;
  images: string[] = [];
  loadedImages: string[] = [];
  ratings = new CollectionLoader("ratings", this, RatingData);

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
    }
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
