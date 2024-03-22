// валидация
export const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//Показывет текст ошибки и подчеркивание поля, если ошибка
function showInputError(formElement, inputElement, errorMessage, formConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formConfig.inputErrorClass);
  errorElement.classList.add(formConfig.errorClass);
  errorElement.textContent = errorMessage;
}

// Удаление текст ошибки и подчеркивание поля, если нет ошибок
function hideInputError(formElement, inputElement, formConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.classList.remove(formConfig.inputErrorClass);
  errorElement.textContent = "";
}

// Проверка на валидность отдельного input, показ/скрытие ошибки
export function isValid(formElement, inputElement, formConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formConfig
    );
  } else {
    hideInputError(formElement, inputElement, formConfig);
  }
}

//Функция проверки корректности данных в полях ввода/валидация всех полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Функция изменения состояния кнопки сохранения при проверке валидации всех полей формы
function toggleButtonState(inputList, buttonElement, formConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(formConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
  }
}

///Функция установки валидации для всех форм документа/Добавление setEventListeners на каждую форму
export function enableValidation(formConfig) {
  const formList = Array.from(
    document.querySelectorAll(formConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, formConfig);
  });
}

//Устанавливаем обработчики валидации для полей ввода активной формы/Добавление слушателя ввода на каждый input формы
function setEventListeners(formElement, formConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(formConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, formConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, formConfig);
      toggleButtonState(inputList, buttonElement, formConfig);
    });
  });
}



//Функция очистки сообщений об ошибках валидации/Удаляем классы ошибок валидации при повторном открытии попапа с формой
export function clearValidation(profileForm, formConfig) {
  const inputList = Array.from(
    profileForm.querySelectorAll(formConfig.inputSelector) 
  );
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity("");
    hideInputError(profileForm, inputElement, formConfig);
  });
  const buttonElement = profileForm.querySelector(
    formConfig.submitButtonSelector
  );
  buttonElement.disabled = true;
  buttonElement.classList.add(formConfig.inactiveButtonClass);
}
