import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #handleFormSubmit;
  #inputList;
  #popupForm;
  #popupSubmitButton;
  #SubmitButtonText;

  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);

    this.#handleFormSubmit = handleFormSubmit;
    this.#popupForm = this.popup.querySelector(".popup__form");
    this.#inputList = Array.from(
      this.#popupForm.querySelectorAll(".popup__input"),
    );

    this.#popupSubmitButton = this.popup.querySelector(".popup__button");
    this.#SubmitButtonText = this.#popupSubmitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.#handleFormSubmit(this.#getInputValues());
    });
  }

  close() {
    super.close();
    this.#popupForm.reset();
  }

  #getInputValues() {
    const inputData = {};
    this.#inputList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.#popupSubmitButton.textContent = "Salvando...";
    } else {
      this.#popupSubmitButton.textContent = this.#SubmitButtonText;
    }
  }
}
