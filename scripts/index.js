import { Card } from "./Card.js";
import {
  openModal,
  closeModal,
  setCloseByOverlay,
  handleEscClose,
} from "./utils.js";

import { FormValidator } from "./formValidator.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const formPopEditProfile = editPopup.querySelector("#edit-profile-form");
const popupCloseButton = editPopup.querySelector(".popup__close");
const popupInputName = editPopup.querySelector(".popup__input_type_name");
const popupInputDescription = editPopup.querySelector(
  ".popup__input_type_description",
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardsList = document.querySelector(".cards__list");
const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const popupClose = newCardPopup.querySelector(".popup__close");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const inputNameCard = newCardForm.querySelector(".popup__input_type_card-name");
const inputUrlCard = newCardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup");
const imagePopupModal = document.querySelector("#image-popup");
const popupCloseImage = imagePopupModal.querySelector(".popup__close");

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
};

const editFormValidator = new FormValidator(
  validationConfig,
  formPopEditProfile,
);
editFormValidator.setEventListeners();

const cardFormValidator = new FormValidator(validationConfig, newCardForm);
cardFormValidator.setEventListeners();

popupCloseImage.addEventListener("click", function () {
  closeModal(imagePopupModal);
});

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closeModal(editPopup);
}

function fillProfileForm() {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
}

popups.forEach((popup) => {
  setCloseByOverlay(popup);
});

document.addEventListener("keydown", handleEscClose);

profileEditButton.addEventListener("click", function () {
  handleOpenEditModal();
});

popupCloseButton.addEventListener("click", function () {
  closeModal(editPopup);
});

formPopEditProfile.addEventListener("submit", handleProfileFormSubmit);

function renderCard(data, container) {
  const card = new Card(data, "#card__template");
  const cardElement = card.getCardElement();
  container.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsList);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = inputNameCard.value;
  const link = inputUrlCard.value;

  const cardData = {
    name,
    link,
  };
  renderCard(cardData, cardsList);
  closeModal(newCardPopup);
  newCardForm.reset();
  cardFormValidator.resetValidation();
}

profileAddButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

popupClose.addEventListener("click", function () {
  closeModal(newCardPopup);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);
