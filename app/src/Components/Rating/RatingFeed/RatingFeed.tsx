import { useEffect, useState } from "react";
import { RatingData } from "../../../Data/Rating/RatingData";
import { UserData } from "../../../Data/Users/UserData";
import styles from "./RatingFeed.module.css";

interface RatingFeedProps {
  ratings: RatingData[];
}
export const RatingFeed = (props: RatingFeedProps) => {
  props.ratings.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div>
      {props.ratings.sort().map((rating) => {
        return <RatingPost rating={rating} />;
      })}
    </div>
  );
};

export default RatingFeed;

interface RatingPostProps {
  rating: RatingData;
}
const RatingPost = (props: RatingPostProps) => {
  const [ratingUser, setRatingUser] = useState<UserData | undefined>(undefined);
  useEffect(() => {
    if (props.rating.raterUser?.loaded) {
      setRatingUser(props.rating.raterUser);
    } else {
      props.rating.raterUser?.load().then((user) => {
        setRatingUser(user);
      });
    }
  });
  return (
    <div className={styles.ratingPost}>
      <div className={styles.postTopContent}>
        <div className={styles.ratingNumber}>{props.rating.ratingNumber}</div>
        <h3>{"Vurdert av: " + ratingUser?.name ?? ""}</h3>
        <p>{props.rating.date?.toLocaleDateString("no-nb", { day: "2-digit", month: "2-digit", year: "2-digit" }) ?? ""}</p>
      </div>
      <p className={styles.comment}>{props.rating.comment}</p>
    </div>
  );
};
