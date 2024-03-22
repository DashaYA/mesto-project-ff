import "./pages/index.css"; // добавьте импорт главного файла стилей
import { openModal, closeModal, handleOutside } from "./components/modal";
import { createCard, deleteCard, likeCard} from "./components/card";
import {
  getUserInfo,
  getUsersCards,
  updateUserProfile,
  postNewCard,
  updateUserAvatar,
} from "./components/api";

import {
  formConfig,
  enableValidation,
  clearValidation,
} from "./components/validation";

let userId = "";

// вывод карточек на страницу
Promise.all([getUserInfo(), getUsersCards()])
  .then(([user, cards]) => {
    const userId = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url('${user.avatar}')`;

    //обработка данных пользователя и карточек
    cards.forEach((card) => {
      cardContainer.append(
        createCard(userId, card, openImage, likeCard, deleteCard)
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });

//Открытие модального окна с картинкой

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImgage = popupTypeImage.querySelector(".popup__image");
const cardCaption = popupTypeImage.querySelector(".popup__caption");

const openImage = (imageSrc, caption) => {
  popupImgage.src = imageSrc;
  popupImgage.alt = caption;
  cardCaption.textContent = caption;
  openModal(popupTypeImage);
};

// @todo: DOM узлы, место вставки карточек, Список карточек
const cardContainer = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");

//закрытие модальных окон через крестик и оверлей
const buttonCloseList = document.querySelectorAll(".popup__close");
buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", handleOutside);
});

//Форма добавления карточки
const popupNewCard = document.querySelector(".popup_type_new-card");
const formElementCard = document.querySelector(
  '.popup__form[name="new-place"]'
);
const photoTitleInput = formElementCard.querySelector(
  ".popup__input_type_card-name"
);
const photoURLInput = formElementCard.querySelector(".popup__input_type_url");
const profileAddButton = document.querySelector(".profile__add-button");
const cardSaveButton = popupEdit.querySelector(".popup__button");

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  cardSaveButton.textContent = "Сохранение...";

  postNewCard(photoTitleInput.value, photoURLInput.value)
    .then((card) => {
      const add = createCard(userId, card, deleteCard, openImage, likeCard);
      cardContainer.prepend(add);
      closeModal(popupNewCard);
      clearValidation(formElementCard, formConfig);
      formElementCard.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardSaveButton.textContent = "Сохранить";
    });
}
//Отслеживание клика по добавлению карточки
profileAddButton.addEventListener("click", () => {
  openModal(popupNewCard);
});
//Отслеживание отправки формы на добавление карточки
popupNewCard.addEventListener("submit", handleFormAddSubmit);

//Редактирование имени и информации о себе
//const popupEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
// Находим форму в DOM
const formElementEdit = document.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const descriptionInput = formElementEdit.querySelector(
  ".popup__input_type_description"
);
// Профиль
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  cardSaveButton.textContent = "Сохранение...";
  const name = nameInput.value;
  const description = descriptionInput.value;

  updateUserProfile(profileTitle, profileDescription)
    .then(() => {
      profileTitle.textContent = name;
      profileDescription.textContent = description;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardSaveButton.textContent = "Сохранить";
    });
  closeModal(popupEdit);
}

// обработка открытия модальных окон/отслеживание клика по редактированию профиля
profileEditButton.addEventListener("click", () => {
  clearValidation(popupEdit, formConfig);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(popupEdit);
});
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка», Отслеживание отправки формы редактирования профиля
formElementEdit.addEventListener("submit", handleFormEditSubmit);


//попап редактирования аватара
export const popupEditAvatar = document.querySelector(".popup__edit_avatar");
export const avatarForm = document.forms["edit-avatar"];
export const avatarUrlInput = popupEditAvatar.querySelector(
  ".popup__input_type_avatar"
);

// функция редактирования аватарки
function handleAvatar(evt) {
  evt.preventDefault();
  cardSaveButton.textContent = "Сохранение...";

  updateUserAvatar(avatarUrlInput.value)
    .then(() => {
      profileImage.style.backgroundImage = `url('${avatarUrlInput.value}')`;
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardSaveButton.textContent = "Сохранить";
      avatarForm.reset();
      clearValidation(avatarForm, formConfig);
    });
}

// открытие попапа редактирования аватарки
profileImage.addEventListener("click", () => {
  openModal(popupEditAvatar);
});

// Слушатель клика по кнопке сохранения формы добавления аватара
popupEditAvatar.addEventListener("submit", handleAvatar);

// включение валидации
enableValidation(formConfig);