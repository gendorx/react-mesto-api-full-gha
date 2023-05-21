export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return this.sendRequest("/cards");
  }

  getProfileInfo() {
    return this.sendRequest("/users/me");
  }

  setProfilePhoto(avatar) {
    return this.sendRequest("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  addCard(item) {
    return this.sendRequest("/cards", {
      method: "POST",
      body: JSON.stringify(item),
    });
  }

  addLikeCard(cardId) {
    return this.sendRequest(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  removeLikeCard(cardId) {
    return this.sendRequest(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  removeCard(id) {
    return this.sendRequest(`/cards/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  }

  setUserInfo(ctx) {
    return this.sendRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify(ctx),
    });
  }

  async sendRequest(path, opts = {}) {
    const response = await fetch(`${this._baseUrl}${path}`, {
      headers: {
        authorization: `Bearer ${this._getToken()}`,
        ...this._headers,
      },
      ...opts,
    });

    if (!response.ok) throw response.status;

    return response.json();
  }

  _getToken() {
    return localStorage.getItem("jwt");
  }
}
