export default function PopupWithForm({
  title,
  type,
  textButton,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div className={`popup popup_type_${type} ${isOpen && "popup_opened"}`}>
      <div className="popup__content popup__content_type_edit-profile">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${type}`}
          name={type}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__save">
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}
