import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const isOwn = card.owner._id === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__card">
      {isOwn ? (
        <button
          type="button"
          className="elements__trash-icon"
          aria-label="Trash"
          title="Удалить"
          onClick={handleDeleteClick}
        ></button>
      ) : (
        ""
      )}
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="elements__description">
        <h2 className="elements__location">{card.name}</h2>
        <button
          type="button"
          className={`elements__btn ${isLiked && "elements__btn_active"}`}
          aria-label="Like"
          title="Нравится"
          onClick={handleLikeClick}
        ></button>
        <h2 className="elements__counter">{card.likes.length}</h2>
      </div>
    </li>
  );
}
export default Card;
