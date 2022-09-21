import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";

function App() {
  const [isEditAvatarOpenPopup, setIsEditAvatarOpenPopup] = useState(false);
  const [isEditProfileOpenPopup, setIsEditProfileOpenPopup] = useState(false);
  const [isAddPlaceOpenPopup, setIsAddPlaceOpenPopup] = useState(false);
  const [isDeleteOpenPopup, setIsDeleteOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});

  useEffect(() => {
    api
      .getInitialUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => alert(err));

    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => alert(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarOpenPopup(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpenPopup(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpenPopup(true);
  }

  function closeAllPopups() {
    setIsEditAvatarOpenPopup(false);
    setIsEditProfileOpenPopup(false);
    setIsAddPlaceOpenPopup(false);
    setSelectedCard({});
    setIsDeleteOpenPopup(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => alert(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .patchUser(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .patchAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  }

  function handleDeleteCardPopup(deletedCard) {
    setDeletedCard(deletedCard);
    setIsDeleteOpenPopup(true);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardPopup}
        />
        <Footer />

        {/* всплывающее окно редактирования данных профиля */}
        <EditProfilePopup
          isOpen={isEditProfileOpenPopup}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        ></EditProfilePopup>

        {/* всплывающее окно добавления картинки */}
        <AddPlacePopup
          isOpen={isAddPlaceOpenPopup}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        ></AddPlacePopup>

        {/* всплывающее окно обновления аватара пользователя  */}
        <EditAvatarPopup
          isOpen={isEditAvatarOpenPopup}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        ></EditAvatarPopup>

        {/* всплывающее окно удаления картинки */}
        <ConfirmationPopup
          isOpen={isDeleteOpenPopup}
          onCardDelete={handleCardDelete}
          onClose={closeAllPopups}
          card={deletedCard}
        ></ConfirmationPopup>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
