import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(userData);
  }

  return (
    <>
      <main className="content content_type_auth">
        <h2 className={`popup__title popup__title_type_auth`}>Регистрация</h2>
        <form className="form" name="register" onSubmit={handleSubmit}>
          <label className="popup__field">
            <input
              type="text"
              name="email"
              id="email-input"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              value={userData.email}
              className="popup__input  popup__input_type_auth"
            />
          </label>
          <label className="popup__field">
            <input
              type="password"
              name="password"
              id="password-input"
              placeholder="Пароль"
              required
              minLength="2"
              maxLength="200"
              onChange={handleChange}
              value={userData.password}
              className="popup__input  popup__input_type_auth"
            />
          </label>
          <button type="submit" className="popup__save popup__save_type_auth">
            Зарегистрироваться
          </button>
        </form>
        <div className="popup__text">
          Уже зарегистрированы?{" "}
          <NavLink to="/sign-in" className="popup__link">
            Войти
          </NavLink>
        </div>
      </main>
    </>
  );
}

export default withRouter(Register);
