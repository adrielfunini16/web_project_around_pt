import { openModal } from "./utils.js";

export class Card {
  #name;
  #link;
  #selector;

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
    this._cardElement = this.#getTemplate();
    const cardName = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button",
    );

    cardName.textContent = this.#name;
    this._cardImage.src = this.#link;
    this._cardImage.alt = this.#name;

    this.#setEventListeners();

    return this._cardElement;
  }

  #handleLikeClick() {
    this._cardLikeButton.classList.toggle("card__like-button_is-active");
  }

  #handleCardDelete() {
    this._cardElement.remove();
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
    this._cardLikeButton.addEventListener("click", () => {
      this.#handleLikeClick();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this.#handleCardDelete();
    });
    this._cardImage.addEventListener("click", () => {
      this.#handlePopupImage();
    });
  }
}
