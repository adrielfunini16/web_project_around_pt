export default class UserInfo {
  #name;
  #about;
  #avatar;
  constructor({ name, description, avatar }) {
    this.#name = document.querySelector(name);
    this.#about = document.querySelector(description);
    this.#avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this.#name.textContent,
      about: this.#about.textContent,
    };
  }

  setUserInfo(data) {
    this.#name.textContent = data.name;
    this.#about.textContent = data.about;
    this.#avatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this.#avatar.src = data.avatar;
  }
}
