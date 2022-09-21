import React from "react";
import successReg from "../images/successful_login.svg";
import failReg from "../images/fail_login.svg";

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__window">
        <button
          type="button"
          className="popup__btn-close"
          aria-label="Закрыть форму"
          onClick={onClose}
        ></button>
        <div className="popup__container-result">
          <img
            alt="Статус регистрации"
            className="popup__tooltip-img"
            src={status ? successReg : failReg}
          />
          <p className="popup__tooltip-title">
            {status
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
