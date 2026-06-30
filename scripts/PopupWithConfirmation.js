import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this.popup.querySelector(".popup__button");
  }

  setSubmitActon(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._handleSubmit();
    });
  }
}
