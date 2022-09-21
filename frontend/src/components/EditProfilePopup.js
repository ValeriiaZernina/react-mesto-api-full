import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState("");
  const [description, setDesciption] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name || "");
    setDesciption(currentUser.about || "");
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDesciption(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        className="popup__input popup__input_enter_name"
        type="text"
        name="UserName"
        id="userName"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        pattern="[А-ЯЁа-яёA-Za-z -]{1,40}"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span id="userName-error" className="popup__input-error"></span>
      <input
        className="popup__input popup__input_enter_data"
        type="text"
        name="UserAbout"
        id="userAbout"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleChangeDescription}
      />
      <span id="userAbout-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
