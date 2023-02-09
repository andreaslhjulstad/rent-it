import { Link } from "react-router-dom";

export const SignInPage = () => {
  return (
    <div>
      <h1>Logg inn</h1>
      <form>
        <label htmlFor="email">E-post</label>
        <input type="email" id="email" placeholder="Fyll inn e-postadressen din" />
        <label htmlFor="password">Passord</label>
        <input type="password" id="password" placeholder="Fyll inn passordet ditt" />
        <button type="submit">Logg inn</button>
        <Link to="/register">
          <p>Har du ingen bruker? Klikk her for å opprette en ny en.</p>
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
