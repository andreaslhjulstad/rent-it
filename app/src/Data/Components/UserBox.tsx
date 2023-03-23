import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./UserBox.module.css";
import { UserData } from "../Users/UserData";
import { useEffect, useState } from "react";
import { LocalData } from "../LocalData";
import { deleteDoc, doc, where } from "firebase/firestore";
import { db } from "../../App";
import buttonStyles from "../../GlobalStyling/Buttons.module.css";
import { AdData } from "../Ads/AdData";

interface UserBoxProps {
    user: UserData;
 
}


export const UserBox = (props: UserBoxProps) => {
    const userLink = "/user/" + props.user.id;
    const [ads, setAds] = useState<AdData[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const navigate = useNavigate();

    //henter ads
    useEffect(() => {
        LocalData.ads.loadDocuments().then((adsCollection) => {
          setAds(adsCollection.documents);
        });
      }, []);


    //henter users
    useEffect(() => {
    LocalData.users.loadDocuments().then((usersCollection) => {
        setUsers(usersCollection.documents);
    });
    }, []);

    //sletter først alle ratings, deretter alle ads og til slutt slettes bruker
    const deleteUser = async () => {
        const name: string = props.user.name;
        const userAds = ads.filter(ad => ad.user?.id === props.user.id);
        //Lager liste med promis med ratingene som skal slettes
        const ratingPromises: Promise<void>[] = [];
        
        users.forEach(user => 
            user.ratings
            ?.loadDocumentsWithFilter([where("raterUserId", "==", props.user.id)]).then(ratings => {
        ratings.forEach(rating => {
            ratingPromises.push(deleteDoc(doc(db, "users", user.id, "ratings", rating.id)));
        })
        }))

        ads.forEach(ad => ad.ratings?.loadDocumentsWithFilter([where("raterUserId", "==", props.user.id)]).then(ratings => {
            ratings.forEach(rating => {
                ratingPromises.push(deleteDoc(doc(db, "ads", ad.id, "ratings", rating.id)));
            })
            }))

        const deleteAdPromises = userAds.map(ad => {
            return deleteDoc(doc(db, "ads", ad.id))
        });


        //Bruker promise all så man venter på at alle promisene skal kjøre
        //bruker concat for å slette alle annonser etter ratingsene er slettet
        await Promise.all(ratingPromises.concat(deleteAdPromises))
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