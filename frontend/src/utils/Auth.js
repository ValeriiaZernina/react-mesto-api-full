class Auth {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = {
      "Content-Type": "application/json",
    };
    // тело конструктора
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._baseURL}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this._checkResponseStatus(res));
  }

  authorize(email, password) {
    return fetch(`${this._baseURL}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this._checkResponseStatus(res));
  }

  getUserInfo(token) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...this._headers,
      },
    }).then((res) => this._checkResponseStatus(res));
  }
}

const auth = new Auth({
  baseURL: "https://api.zernina.students.nomoredomains.sbs",
});

export { auth };
