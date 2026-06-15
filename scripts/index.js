import Card from "./Card.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

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

const popNewCard = new PopupWithForm(handleCardFormSubmit, "#new-card-popup");
popNewCard.setEventListeners();

const popupEditProfile = new PopupWithForm(
  handleProfileFormSubmit,
  "#edit-popup",
);
popupEditProfile.setEventListeners();

const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

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

function handleOpenEditModal() {
  const currentUserInfo = userInfo.getUserInfo();

  popupInputName.value = currentUserInfo.name;
  popupInputDescription.value = currentUserInfo.description;
  popupEditProfile.open();
}

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupEditProfile.close();
}

profileEditButton.addEventListener("click", function () {
  editFormValidator.resetValidation();
  handleOpenEditModal();
});

function handleCardClick(data) {
  popupImage.open(data);
}

function renderCard(data, container) {
  const card = new Card(data, "#card__template", handleCardClick);
  const cardElement = card.getCardElement();
  container.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsList);
});

function handleCardFormSubmit(data) {
  const cardData = {
    name: data["place-name"],
    link: data.link,
  };
  renderCard(cardData, cardsList);
  popNewCard.close();
  cardFormValidator.resetValidation();
}

profileAddButton.addEventListener("click", function () {
  cardFormValidator.resetValidation();
  popNewCard.open();
});
