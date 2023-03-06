import { useEffect, useState } from "react";
import { AdData } from "../../../Data/Ads/AdData";
import { LocalData } from "../../../Data/LocalData";
import { RatingData } from "../../../Data/Rating/RatingData";
import { UserData } from "../../../Data/Users/UserData";
import RatingFeed from "../RatingFeed/RatingFeed";
import RatingForm from "../RatingForm/RatingForm";
import styles from "./RatingSection.module.css";

interface RatingSectionProps {
  user?: UserData;
  ad?: AdData;
}
export const RatingSection = (props: RatingSectionProps) => {
  const [loadedRatings, setLoadedRatings] = useState<RatingData[]>([]);
  useEffect(() => {
    const ratingCollection = props.user ? props.user.ratings : props.ad?.ratings;
    if (ratingCollection) {
      ratingCollection.loadDocuments().then((ratings) => {
        setLoadedRatings(ratings.documents);
      });
    }
  });

  const averageRating = loadedRatings.reduce((a, b) => a + b.ratingNumber, 0) / loadedRatings.length;

  let canRate = (props.user?.id ?? props.ad?.user?.id) !== LocalData.currentUser?.id && loadedRatings.filter((rating) => rating.raterUser?.id === LocalData.currentUser?.id).length === 0;

  return (
    <div className={styles.ratingSection}>
      {canRate && <RatingForm sentRating={(ratings: RatingData[]) => setLoadedRatings([...ratings])} user={props.user} ad={props.ad} />}
      <h2>{"Vurderinger av " + (props.user?.name ?? props.ad?.title ?? "")}</h2>
      <p>{loadedRatings.length + (loadedRatings.length > 0 ? " anmeldelser: " + averageRating + "/5" : " anmeldelser")}</p>
      <RatingFeed ratings={loadedRatings} />
    </div>
  );
};

export default RatingSection;
