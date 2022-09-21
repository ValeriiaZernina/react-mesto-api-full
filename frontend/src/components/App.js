import React from "react";
import { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { auth } from "../utils/Auth";

function App() {
  const [isEditAvatarOpenPopup, setIsEditAvatarOpenPopup] = useState(false);
  const [isEditProfileOpenPopup, setIsEditProfileOpenPopup] = useState(false);
  const [isAddPlaceOpenPopup, setIsAddPlaceOpenPopup] = useState(false);
  const [isDeleteOpenPopup, setIsDeleteOpenPopup] = useState(false);
  const [isInfoTooltipOpenPopup, setIsInfoTooltipOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({ loggedIn: false });
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});
  const [authMessage, setIsAuthMessage] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // Проверим токен
  useEffect(() => {
    checkToken();
  }, []);

  // Если зареган то направим на главную
  useEffect(() => {
    if (currentUser.loggedIn) {
      history.push("/");
    }
  }, [currentUser.loggedIn, history]);

  // проверим токен
  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then((res) => {
        setCurrentUser((curr) => {
          return { ...curr, loggedIn: true, email: res.data.email };
        });
      })
      .catch((err) => {
        console.log(`токен не подходит: ${err} `);
      });
  }

  useEffect(() => {
    if (currentUser.loggedIn) {
      api
        .getInitialUser()
        .then((data) => {
          setCurrentUser((curr) => {
            return { ...curr, ...data };
          });
        })
        .catch((err) => alert(err));
    }
  }, [currentUser.loggedIn]);

  useEffect(() => {
    if (currentUser.loggedIn) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => alert(err));
    }
  }, [currentUser.loggedIn]);

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
    setIsInfoTooltipOpenPopup(false);
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
  // Вход пользователя и сохранение токена
  function onLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        const { token } = res;
        if (token) {
          localStorage.setItem("jwt", token);
          setCurrentUser((curr) => {
            return { ...curr, loggedIn: true, email };
          });
        }
      })
      .catch((err) => alert(err));
  }
  // Регистрация пользователя и отк попап с результатом рег-ции
  function onRegister(data) {
    auth
      .register(data.email, data.password)
      .then(() => {
        setIsInfoTooltipOpenPopup(true);
        setIsAuthMessage(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsAuthMessage(false);
        setIsInfoTooltipOpenPopup(true);
        console.log(err);
      });
  }
  // Выход из системы пользователя, на страницу входа
  function onSignOut() {
    if (location.pathname === "/") {
      localStorage.removeItem("jwt");
      setCurrentUser(
        (curr) => {
          return { ...curr, loggedIn: false, email: "" };
        },
        [location]
      );
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onSignOut={onSignOut} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardPopup}
          ></ProtectedRoute>
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route>
            {currentUser.loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
        </Switch>
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

        {/* всплывающее окно результата регистрации*/}
        <InfoTooltip
          isOpen={isInfoTooltipOpenPopup}
          onClose={closeAllPopups}
          status={authMessage}
        ></InfoTooltip>
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
