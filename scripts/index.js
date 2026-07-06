import Card from "../src/components/Card.js";
import Section from "../src/components/Section.js";
import Popup from "../src/components/Popup.js";
import FormValidator from "../src/components/FormValidator.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import PopupWithConfirmation from "../src/components/PopupWithConfirmation.js";
import UserInfo from "../src/components/UserInfo.js";
import Api from "../src/components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "26aaa4dc-8dbe-4d3b-89de-45939130d263",
    "Content-Type": "application/json",
  },
});

api.getAppInfo().then(([userData, cards]) => {
  userInfo.setUserInfo(userData);
  cards.forEach((cardData) => {
    renderCard(cardData, cardsList);
  });
});

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
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");
const formEditAvatar = document.querySelector("#edit-avatar-form");

const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
  avatar: ".profile__image",
});

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
};

const avatarFormValidator = new FormValidator(validationConfig, formEditAvatar);
avatarFormValidator.setEventListeners();

avatarEditButton.addEventListener("click", function () {
  avatarFormValidator.resetValidation();
  popupEditAvatar.open();
});

function handleAvatarFormSubmit(data) {
  popupEditAvatar.renderLoading(true);
  api
    .updateAvatar(data)
    .then((userData) => {
      userInfo.setUserAvatar(userData);
      popupEditAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}

const popupEditAvatar = new PopupWithForm(
  handleAvatarFormSubmit,
  "#edit-profile-avatar",
);

popupEditAvatar.setEventListeners();

const popupNewCard = new PopupWithForm(handleCardFormSubmit, "#new-card-popup");
popupNewCard.setEventListeners();

const popupEditProfile = new PopupWithForm(
  handleProfileFormSubmit,
  "#edit-popup",
);
popupEditProfile.setEventListeners();

const popupImage = new PopupWithImage("#image-popup");
popupImage.setEventListeners();

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
  popupInputDescription.value = currentUserInfo.about;
  popupEditProfile.open();
}

function handleProfileFormSubmit(data) {
  popupEditProfile.renderLoading(true);
  api
    .editProfileData({
      name: data.name,
      about: data.description,
    })
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditProfile.renderLoading(false);
    });
}

profileEditButton.addEventListener("click", function () {
  editFormValidator.resetValidation();
  handleOpenEditModal();
});

function handleCardClick(data) {
  popupImage.open(data);
}

function handleLikeClick(card) {
  const likeMethod = card.getIsLiked()
    ? api.removeCardLike(card.getId())
    : api.cardLike(card.getId());

  likeMethod
    .then(() => {
      card.toggleCardLike();
    })
    .catch((err) => console.log(err));
}

function renderCard(data, container) {
  const card = new Card(
    data,
    "#card__template",
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
  );

  const cardElement = card.getCardElement();
  container.prepend(cardElement);
}

const popupDeleteCard = new PopupWithConfirmation("#delete-card-popup");
popupDeleteCard.setSubmitActon(() => {
  api

    .cardDelete(selectedCard.getId())
    .then(() => {
      selectedCard.deleteCard();
      popupDeleteCard.close();
    })
    .catch((err) => console.log(err));
});
popupDeleteCard.setEventListeners();

let selectedCard;

function handleDeleteClick(card) {
  selectedCard = card;
  popupDeleteCard.open();
}

function handleCardFormSubmit(data) {
  popupNewCard.renderLoading(true);
  api
    .addNewCard(data)
    .then((cardData) => {
      renderCard(cardData, cardsList);
      popupNewCard.close();
      cardFormValidator.resetValidation();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupNewCard.renderLoading(false);
    });
}

profileAddButton.addEventListener("click", function () {
  cardFormValidator.resetValidation();
  popupNewCard.open();
});
