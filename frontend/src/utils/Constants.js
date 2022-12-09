export const initialCards = [];

export const buttonOpenProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonOpenNewCardForm = document.querySelector(
  ".profile__add-button"
);
export const buttonOpenAvatarEditForm = document.querySelector(
  ".profile__avatar-edit"
);

export const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const formValidators = {};

export const apiURL = "https://api.memesto.nomoredomains.club";

export const baseAuthURL = "https://api.memesto.nomoredomains.club";

export const headers = {
  "Content-Type": "application/json",
};

export const authHeaders = {
  "Content-Type": "application/json",
};
