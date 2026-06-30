export default class Card {
  #name;
  #link;
  #id;
  #owner;
  #isLiked;
  #selector;
  #cardElement;
  #cardName;
  #cardImage;
  #cardLikeButton;
  #cardDeleteButton;
  #handleCardClick;
  #handleDeleteClick;

  constructor(data, selector, handleCardClick, handleDeleteClick) {
    this.#name = data.name;
    this.#link = data.link;
    this.#id = data._id;
    this.#owner = data.owner;
    this.#isLiked = data.isLiked;
    this.#selector = selector;
    this.#handleCardClick = handleCardClick;
    this.#handleDeleteClick = handleDeleteClick;
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

    if (this.#isLiked) {
      this.#cardLikeButton.classList.add("card__like-button_is-active");
    }

    this.#setEventListeners();

    return this.#cardElement;
  }

  #handleLikeClick() {
    this.#cardLikeButton.classList.toggle("card__like-button_is-active");
  }

  deleteCard() {
    this.#cardElement.remove();
  }

  #setEventListeners() {
    this.#cardLikeButton.addEventListener("click", () => {
      this.#handleLikeClick();
    });
    this.#cardDeleteButton.addEventListener("click", () => {
      this.#handleDeleteClick(this);
    });
    this.#cardImage.addEventListener("click", () => {
      this.#handleCardClick({
        name: this.#name,
        link: this.#link,
      });
    });
  }

  getId() {
    return this.#id;
  }
}
