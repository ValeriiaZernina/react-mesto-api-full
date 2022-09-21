import logo from "../images/logo/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        alt="Логотип проекта - Mesto Russia."
        className="header__logo"
        src={logo}
      />
    </header>
  );
}

export default Header;
