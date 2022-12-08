export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card.link && "popup_opened"}`}>
      <div className="popup__content popup__content_type_image">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </div>
  );
}
