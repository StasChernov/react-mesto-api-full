import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element__trash_visible" : ""
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_liked" : ""
  }`;

  return (
    <li className="element">
      <div className="element__image-container">
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <button
          className={cardDeleteButtonClassName}
          type="button"
          onClick={handleCardDelete}
        ></button>
      </div>
      <div className="element__header">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="element__likes-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
