import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      type="add-place"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          onChange={handleNameChange}
          className="popup__input popup__input_type_place-title"
          id="input-place-title"
          type="text"
          name="place_title"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          value={name}
        />
        <span className="popup__error input-place-title-error"></span>
      </label>
      <label className="popup__field">
        <input
          onChange={handleLinkChange}
          className="popup__input popup__input_type_place-link"
          id="input-place-link"
          type="URL"
          name="place_link"
          required
          placeholder="Ссылка на картинку"
          value={link}
        />
        <span className="popup__error input-place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}
