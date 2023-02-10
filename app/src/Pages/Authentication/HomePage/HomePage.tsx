import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <p>Du er logget inn:)</p>
      <Link to="/createAd">Opprett annonse</Link>
    </div>
  )
};

export default HomePage;
