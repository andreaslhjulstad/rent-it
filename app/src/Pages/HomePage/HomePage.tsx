import { Link } from "react-router-dom";
import { LocalData } from "../../Data/LocalData";

export const HomePage = () => {
  return (
    <div>
      <p>Du er logget inn:)</p>
      <Link to="/createAd">Opprett annonse</Link>
      <button onClick={() => LocalData.signOutFirebaseUser()}>Logg ut</button>
    </div>
  );
};

export default HomePage;
