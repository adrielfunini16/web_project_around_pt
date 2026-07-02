export function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

export function setCloseByOverlay(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
}

export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
