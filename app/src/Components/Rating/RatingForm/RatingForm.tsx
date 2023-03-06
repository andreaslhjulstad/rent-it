import { useState } from "react";
import { AdData } from "../../../Data/Ads/AdData";
import { LocalData } from "../../../Data/LocalData";
import { RatingData } from "../../../Data/Rating/RatingData";
import { UserData } from "../../../Data/Users/UserData";
import buttonStyles from "../../../GlobalStyling/Buttons.module.css";
import styles from "./RatingForm.module.css";

interface RatingFormProps {
  sentRating: (newRatings: RatingData[]) => void;
  user?: UserData;
  ad?: AdData;
}
export const RatingForm = (props: RatingFormProps) => {
  const [ratingNumber, setRatingNumber] = useState<number | null>(null);
  const [ratingComment, setRatingComment] = useState("");

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setRatingNumber(Number(e?.target.value) ?? null);
  };

  const sendRating = () => {
    const ratingCollection = props.user ? props.user.ratings : props.ad?.ratings;
    if (ratingCollection) {
      ratingCollection
        .createNewDocumentWithoutId({
          ratingNumber: ratingNumber,
          comment: ratingComment,
          raterUserId: LocalData.currentUser?.id,
          date: new Date(),
        })
        .then((rating) => {
          props.sentRating(ratingCollection.documents);
        });
    }
  };

  return (
    <form id={styles.ratingForm}>
      <h2>Skriv en vurdering</h2>
      <div className={styles.radio}>
        <p>Gi en rating</p>
        <input type="radio" name="rating" value="1" onChange={onValueChange} />
        <label>1</label>
        <input type="radio" name="rating" value="2" onChange={onValueChange} />
        <label>2</label>
        <input type="radio" name="rating" value="3" onChange={onValueChange} />
        <label>3</label>
        <input type="radio" name="rating" value="4" onChange={onValueChange} />
        <label>4</label>
        <input type="radio" name="rating" value="5" onChange={onValueChange} />
        <label>5</label>
      </div>
      <textarea placeholder="Skriv en kommentar" onChange={(e) => setRatingComment(e.target.value)}></textarea>
      <button className={buttonStyles.mainButton} type="button" onClick={sendRating}>
        Send inn vurdering
      </button>
    </form>
  );
};

export default RatingForm;
