import React from "react";
import imageOk from "../images/ok.svg";
import imageError from "../images/error.svg";

function InfoTooltip({ onClose, isOpen, isOk, tooltipMessage }) {
  return (
    <div
      className={`popup popup_type_image ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div className="popup__content popup__content_type_tooltip">
        <img
          src={isOk ? imageOk : imageError}
          alt={isOk ? "Успешно" : "Ошибка"}
        />
        <p className="popup__image-title_type_tooltip">
          {tooltipMessage}
        </p>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
