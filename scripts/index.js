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

initialCards.forEach(function (card) {
  console.log(card.name);
});

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
const popupSubmitButton = newCardForm.querySelector(".popup__button");

const imagePopupModal = document.querySelector("#image-popup");
const popupCloseImage = imagePopupModal.querySelector(".popup__close");
const popupImage = imagePopupModal.querySelector(".popup__image");
const popupCaption = imagePopupModal.querySelector(".popup__caption");

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

function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

profileEditButton.addEventListener("click", function () {
  handleOpenEditModal();
});

popupCloseButton.addEventListener("click", function () {
  closeModal(editPopup);
});

formPopEditProfile.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
  const cardTemplate = document
    .querySelector("#card__template")
    .content.querySelector(".card");

  const cardElement = cardTemplate.cloneNode(true);

  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  function handleCardLikeButton() {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  }
  cardLikeButton.addEventListener("click", handleCardLikeButton);

  function handleCardDeleteButton() {
    cardElement.remove();
  }
  cardDeleteButton.addEventListener("click", handleCardDeleteButton);

  function handlePopupImage() {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    openModal(imagePopupModal);
  }
  cardImage.addEventListener("click", handlePopupImage);

  return cardElement;
}

function renderCard(name, link, container) {
  const card = getCardElement(name, link);
  container.prepend(card);
}

initialCards.forEach(function (item) {
  renderCard(item.name, item.link, cardsList);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = inputNameCard.value;
  const link = inputUrlCard.value;
  renderCard(name, link, cardsList);
  closeModal(newCardPopup);
}

profileAddButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

popupClose.addEventListener("click", function () {
  closeModal(newCardPopup);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);
