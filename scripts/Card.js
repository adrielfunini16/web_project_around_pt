import { openModal } from "./utils.js";

export class Card {
  #name;
  #link;
  #selector;
  #cardElement;
  #cardName;
  #cardImage;
  #cardLikeButton;
  #cardDeleteButton;

  constructor(data, selector) {
    this.#name = data.name;
    this.#link = data.link;
    this.#selector = selector;
  }

  #getTemplate() {
    return document
      .querySelector(this.#selector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getCardElement() {
    this.#cardElement = this.#getTemplate();
    this.#cardName = this.#cardElement.querySelector(".card__title");
    this.#cardImage = this.#cardElement.querySelector(".card__image");
    this.#cardLikeButton =
      this.#cardElement.querySelector(".card__like-button");
    this.#cardDeleteButton = this.#cardElement.querySelector(
      ".card__delete-button",
    );

    this.#cardName.textContent = this.#name;
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;

    this.#setEventListeners();

    return this.#cardElement;
  }

  #handleLikeClick() {
    this.#cardLikeButton.classList.toggle("card__like-button_is-active");
  }

  #handleCardDelete() {
    this.#cardElement.remove();
  }

  #handlePopupImage() {
    const imagePopupModal = document.querySelector("#image-popup");
    const popupImage = imagePopupModal.querySelector(".popup__image");
    const popupCaption = imagePopupModal.querySelector(".popup__caption");

    popupImage.src = this.#link;
    popupImage.alt = this.#name;
    popupCaption.textContent = this.#name;

    openModal(imagePopupModal);
  }

  #setEventListeners() {
    this.#cardLikeButton.addEventListener("click", () => {
      this.#handleLikeClick();
    });
    this.#cardDeleteButton.addEventListener("click", () => {
      this.#handleCardDelete();
    });
    this.#cardImage.addEventListener("click", () => {
      this.#handlePopupImage();
    });
  }
}
