import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputURL = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputURL.current.value);
  }

  useEffect(() => {
    if (!isOpen) {
      inputURL.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      type="avatar-edit"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar-edit"
          id="input-avatar-edit"
          ref={inputURL}
          type="URL"
          placeholder="Ссылка на картинку"
          name="avatar_edit"
          required
        />
        <span className="popup__error input-avatar-edit-error"></span>
      </label>
    </PopupWithForm>
  );
}
