import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <p>Du er logget inn:)</p>
      <Link to="/createAd">Opprett annonse</Link>
      <br></br>
      <Link to="/loanAgreement">Opprett en låneavtale</Link>

    </div>
  )
};

export default HomePage;
