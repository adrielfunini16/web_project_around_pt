export default class Card {
  #name;
  #link;
  #selector;
  #cardElement;
  #cardName;
  #cardImage;
  #cardLikeButton;
  #cardDeleteButton;
  #handleCardClick;

  constructor(data, selector, handleCardClick) {
    this.#name = data.name;
    this.#link = data.link;
    this.#selector = selector;
    this.#handleCardClick = handleCardClick;
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

  #setEventListeners() {
    this.#cardLikeButton.addEventListener("click", () => {
      this.#handleLikeClick();
    });
    this.#cardDeleteButton.addEventListener("click", () => {
      this.#handleCardDelete();
    });
    this.#cardImage.addEventListener("click", () => {
      this.#handleCardClick({
        name: this.#name,
        link: this.#link,
      });
    });
  }
}
