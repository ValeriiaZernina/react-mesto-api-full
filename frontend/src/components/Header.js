import logo from "../images/logo/header-logo.svg";
import React, { useContext } from "react";
import { Route, Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <img
        alt="Логотип проекта - Mesto Russia."
        className="header__logo"
        src={logo}
      />
      <Route exact path="/">
        <div className="header__info_user">
          <p className="header__email">{currentUser.email}</p>
          <button className="header__btn" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      </Route>

      <Route path="/sign-in">
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Route>

      <Route path="/sign-up">
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Route>
    </header>
  );
}

export default Header;
