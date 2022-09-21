import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ card, isOpen, onClose, onCardDelete }) {
  function handleSubmit(event) {
    event.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="image-delete"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Да"
    ></PopupWithForm>
  );
}
export default ConfirmationPopup;
