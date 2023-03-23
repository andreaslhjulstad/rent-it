import { AdData } from "../../Data/Ads/AdData";
import { useEffect, useState } from "react";
import { UserData } from "../../Data/Users/UserData";
import { LocalData } from "../../Data/LocalData";
import styles from "./UsersPage.module.css";
import UserBox from "../../Data/Components/UserBox";
import Navbar from "../../Data/Components/navbar/Navbar";
import { useParams } from "react-router-dom";

export const UsersPage = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    let adminID: string = "jh02wt57FvX8sbb6oxV0eK2Htbq1";

    useEffect(() => {
        LocalData.users.loadDocuments().then((usersCollection) => {
            setUsers(usersCollection.documents);
        });
        console.log(users)
    }, []);


    return (
        <div id={styles.usersPage}>
        <Navbar />
            <div data-testid="userBoxList" id={styles.usersInfoList}>
                {users.map((user) => {
                    if (user.id !== adminID) {
                        return <UserBox key={user.id} user={user} />;
                    }
                })}
            </div>
        </div>
    );
};

export default UsersPage;