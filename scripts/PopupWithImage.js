import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  #imagePopup;
  #namePopup;

  constructor(popupSelector) {
    super(popupSelector);

    this.popup = document.querySelector(popupSelector);
    this.#imagePopup = this.popup.querySelector(".popup__image");
    this.#namePopup = this.popup.querySelector(".popup__caption");
  }

  open(data) {
    this.#imagePopup.src = data.link;
    this.#imagePopup.alt = data.name;
    this.#namePopup.textContent = data.name;
    super.open();
  }
}
