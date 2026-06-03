export default class FormValidator {
  #config;
  #formElement;
  #inputList;
  #buttonElement;

  constructor(config, formElement) {
    this.#config = config;
    this.#formElement = formElement;

    this.#inputList = Array.from(
      this.#formElement.querySelectorAll(this.#config.inputSelector),
    );

    this.#buttonElement = this.#formElement.querySelector(
      this.#config.submitButtonSelector,
    );
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formElement.querySelector(
      `#${inputElement.id}-error`,
    );

    inputElement.classList.add(this.#config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#config.errorClass);
  }

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(
      `#${inputElement.id}-error`,
    );

    inputElement.classList.remove(this.#config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this.#config.errorClass);
  }

  #toggleButtonState() {
    const allValid = this.#inputList.every((input) => input.validity.valid);

    this.#buttonElement.disabled = !allValid;
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #addInputListeners() {
    this.#toggleButtonState();

    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
      });
    });

    this.#formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  setEventListeners() {
    this.#addInputListeners();
  }

  resetValidation() {
    this.#inputList.forEach((inputElement) => {
      this.#hideInputError(inputElement);
    });

    this.#toggleButtonState();
  }
}
