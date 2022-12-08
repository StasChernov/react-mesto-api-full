import { apiURL } from "./Constants";

class Api {
  constructor({headers, apiURL}) {
    this._apiUserURL = `${apiURL}/users/me`;
    this._apiCardsURL = `${apiURL}/cards`;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._apiUserURL, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  getInitialCards() {
    return fetch(this._apiCardsURL, {
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  setUserInfo(name, about) {
    return fetch(this._apiUserURL, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._handleResponse(res));
  }

  addNewCard(name, link) {
    return fetch(this._apiCardsURL, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._apiCardsURL}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._apiCardsURL}/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._handleResponse(res));
  }

  updateAvatar(avatarURL) {
    return fetch(`${this._apiUserURL}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarURL }),
    }).then((res) => this._handleResponse(res));
  }

  updateToken() {
    this._headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  }
}

export default new Api({headers: {
  authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
}, apiURL});
