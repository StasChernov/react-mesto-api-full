import React, { useState } from "react";
import { withRouter } from "react-router-dom";

function Login({ onLogin }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(userData);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  return (
    <>
      <main className="content content_type_auth">
        <h2 className={"popup__title popup__title_type_auth"}>Вход</h2>
        <form className="popup_form" name="login" onSubmit={handleSubmit}>
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
              className="popup__input popup__input_type_auth"
            />
          </label>
          <button type="submit" className="popup__save popup__save_type_auth">
            Войти
          </button>
        </form>
      </main>
    </>
  );
}

export default withRouter(Login);
