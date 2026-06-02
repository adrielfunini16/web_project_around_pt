export default class Popup {
  popup;

  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }

  open() {
    this.popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", (evt) => {
      this.#handleEscClose(evt);
    });
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", (evt) => {
      this.#handleEscClose(evt);
    });
  }

  setEventListeners() {
    const closeButton = this.popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    this.popup.addEventListener("click", (evt) => {
      if (evt.target === this.popup) {
        this.close();
      }
    });
  }

  #handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
