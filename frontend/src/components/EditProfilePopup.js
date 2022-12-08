import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      type="edit-profile"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_full-name"
          id="input-name"
          type="text"
          placeholder="ФИО"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__error input-full-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_about"
          id="input-about"
          type="text"
          placeholder="О себе"
          name="about"
          required
          minLength="2"
          maxLength="200"
          value={about}
          onChange={handleChangeAbout}
        />
        <span className="popup__error input-about-error"></span>
      </label>
    </PopupWithForm>
  );
}
