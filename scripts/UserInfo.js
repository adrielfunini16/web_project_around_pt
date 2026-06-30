export default class UserInfo {
  #name;
  #about;
  constructor({ name, description }) {
    this.#name = document.querySelector(name);
    this.#about = document.querySelector(description);
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
  }
}
