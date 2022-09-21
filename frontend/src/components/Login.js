import React, { useState } from "react";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }
    onLogin(loginData);
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input
          className="login__input login__input_email"
          type="email"
          id="email"
          required
          placeholder="Email"
          onChange={handleChange}
          value={loginData.email}
          name="email"
        ></input>
        <input
          className="login__input login__input_password"
          type="password"
          id="password"
          placeholder="Пароль"
          required
          onChange={handleChange}
          value={loginData.password}
          name="password"
        ></input>
        <button type="submit" className="login__btn-save">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
