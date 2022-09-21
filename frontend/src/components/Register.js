import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(registerData);
  }

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Регистрация</h2>
        <input
          className="register__input register__input_email"
          type="email"
          id="email"
          required
          placeholder="Email"
          onChange={handleChange}
          value={registerData.email}
          name="email"
        ></input>
        <input
          className="register__input register__input_password"
          type="password"
          id="password"
          placeholder="Пароль"
          required
          onChange={handleChange}
          value={registerData.password}
          name="password"
        ></input>
        <button type="submit" className="register__btn-save">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin-box">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__signin">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
