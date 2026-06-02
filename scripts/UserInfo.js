export default class UserInfo {
  #name;
  #description;
  constructor({ name, description }) {
    this.#name = document.querySelector(name);
    this.#description = document.querySelector(description);
  }

  getUserInfo() {
    return {
      name: this.#name.textContent,
      description: this.#description.textContent,
    };
  }

  setUserInfo(data) {
    this.#name.textContent = data.name;
    this.#description.textContent = data.description;
  }
}
