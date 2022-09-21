import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      aria-label="Попап с фотографией"
      className={`popup popup_type_image-view ${card.name && "popup_opened"}`}
    >
      <div className="popup__container popup__container_image">
        <button
          type="button"
          className="popup__btn-close"
          title="Закрыть картинку"
          onClick={onClose}
        ></button>
        <img className="popup__pic" src={card.link} alt={card.name} />
        <div className="popup__name-place">{card.name}</div>
      </div>
    </div>
  );
}

export default ImagePopup;
