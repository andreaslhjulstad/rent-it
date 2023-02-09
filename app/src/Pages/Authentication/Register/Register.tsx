export const RegisterPage = () => {
  return (
    <div>
      <h1>Opprett ny bruker</h1>
      <form>
        <label htmlFor="name">Ditt navn</label>
        <input type="name" id="name" placeholder="Fyll inn e-postadressen din" />
        <label htmlFor="email">Din e-postadresse</label>
        <input type="email" id="email" placeholder="Fyll inn e-postadressen din" />
        <label htmlFor="password">Ditt passord</label>
        <input type="password" id="password" placeholder="Fyll inn passordet ditt" />
        <button type="submit">Opprett bruker</button>
      </form>
    </div>
  );
};

export default RegisterPage;
