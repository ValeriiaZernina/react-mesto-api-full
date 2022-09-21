import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="profile-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
    >
      <input
        onChange={handleChangeName}
        value={name}
        className="popup__input popup__input_enter_place"
        type="text"
        name="InputPlace"
        id="inputPlace"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="inputPlace-error" className="popup__input-error"></span>
      <input
        onChange={handleChangeLink}
        value={link}
        className="popup__input popup__input_enter_link"
        type="url"
        name="InputLink"
        id="inputLink"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="inputLink-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
