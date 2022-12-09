import { baseAuthURL, authHeaders } from "./Constants";

class Auth {
  constructor(authURL, headers) {
    this._authURL = authURL;
    this._headers = headers;
  }

  _handleResponse(res, type) {
    if (res.ok) {
      return res.json();
    } else {
      let message = "";

      switch (res.status) {
        case 400:
          if (type === "signIn") message = "Не передано одно из полей.";
          else if (type === "signUp")
            message = "Некорректно заполнено одно из полей.";
          break;
        case 401:
          if (type === "signIn") message = "Пользователь с email не найден.";
          break;
        default:
          message = "Повторите попытку позже.";
      }

      return Promise.reject(`Ошибка: ${res.status}. ${message}`);
    }
  }

  signIn({ email, password }) {
    return fetch(`${this._authURL}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        password,
        email,
      }),
    }).then((res) => this._handleResponse(res, "signIn"));
  }

  checkToken(token) {
    if (!token) return Promise.reject(`Ошибка: Отсутствует токен`);
    return fetch(`${this._authURL}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }).then((res) => {
      console.log(res);
      return res.json()});
  }

  signUp({ email, password }) {
    return fetch(`${this._authURL}/signup`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this._handleResponse(res, "signUp"));
  }
}

export default new Auth(baseAuthURL, authHeaders);
