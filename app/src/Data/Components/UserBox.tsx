import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./UserBox.module.css";
import { UserData } from "../Users/UserData";
import { useEffect, useState } from "react";
import { LocalData } from "../LocalData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../App";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { AdData } from "../Ads/AdData";

interface UserBoxProps {
    user: UserData;
 
}


export const UserBox = (props: UserBoxProps) => {
    const userLink = "/user/" + props.user.id;
    const [ads, setAds] = useState<AdData[]>([]);
    const navigate = useNavigate();

    //henter ads
    useEffect(() => {
        LocalData.ads.loadDocuments().then((adsCollection) => {
          setAds(adsCollection.documents);
        });
      }, []);

    //sletter først alle ads tilhørende bruker, deretter slettes bruker
    const deleteUser = async () => {
        const name: string = props.user.name;
        const userAds = ads.filter(ad => ad.user?.id === props.user.id);

        const deletePromises = userAds.map(ad => {
            return deleteDoc(doc(db, "ads", ad.id))
        });

        await Promise.all(deletePromises)
        .then(() => {
            return deleteDoc(doc(db, "users", props.user.id))
        })
        .then(() => {
            alert(name + " er slettet");
            window.location.reload();
            navigate("/UsersPage");
        })
        .catch((error) => {
            alert(error.message);
        })
    }
    

    return (
        <div id={props.user.id}>
            <div id={styles.userBox}>
                <div id={styles.userInfo}>
                    <Link id={styles.link} style={{ textDecoration: "none" }} to={userLink}>
                        <h2 id={styles.name}>{props.user.name}</h2>
                        <p id={styles.mail}>{props.user.email}</p>
                        <p id={styles.tlf}>{props.user.phoneNumber}</p>
                        <p id={styles.userID}>{props.user.id}</p>
                    </Link> 
                    <button id={styles.deleteButton} onClick={deleteUser}>Slett bruker</button>
                </div>
            </div>
        </div>
    );
};

export default UserBox;