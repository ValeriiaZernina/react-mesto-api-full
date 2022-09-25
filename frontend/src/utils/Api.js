class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._jwt = null;
    // тело конструктора
  }

  //установка нового значения токена
  setToken(jwt) {
    this._jwt = jwt;
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${this._token}`,
    };
  }

  _checkResStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResStatus(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResStatus(res));
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._checkResStatus(res));
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResStatus(res));
  }

  patchUser(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._checkResStatus(res));
  }

  patchAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this._checkResStatus(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResStatus(res));
  }
}

const api = new Api({
  url: "https://api.zernina.students.nomoredomains.sbs",
  headers: {
    // authorization: "4c628538-281e-4966-940f-27dfe004ed12",
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export { api };
