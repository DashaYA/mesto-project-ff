import './pages/index.css'; // добавьте импорт главного файла стилей 
import { initialCards } from "./scripts/cards";
import { openModal, closeModal, handleOutside } from './components/modal';
import { createCard, deleteCard, likeActive } from './components/card';


// @todo: DOM узлы, место вставки карточек, Список карточек
const cardContainer = document.querySelector('.places__list');
//закрытие модальных окон через крестик и оверлей
const buttonCloseList = document.querySelectorAll('.popup__close');
buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => closeModal(popup)); 
    popup.addEventListener('mousedown', handleOutside);
});

//Редактирование имени и информации о себе

const popupEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector('.profile__edit-button');
////////////////////////////const popupCloseEdit = popupEdit.querySelector(".popup__close");
// Находим форму в DOM
const formElementEdit = document.querySelector(".popup__form"); 
// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const descriptionInput = formElementEdit.querySelector(".popup__input_type_description");
// Профиль 
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleFormEditSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки.
// Получите значение полей jobInput и nameInput из свойства value
const name = nameInput.value;
const description = descriptionInput.value;
// Выберите элементы, куда должны быть вставлены значения полей
// Вставьте новые значения с помощью textContent
profileTitle.textContent = name;
profileDescription.textContent = description;
closeModal(popupEdit)
};
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка», Отслеживание отправки формы редактирования профиля
formElementEdit.addEventListener('submit', handleFormEditSubmit);
// обработка открытия модальных окон Отслеживание клика по редактированию профиля
profileEditButton.addEventListener('click',  () => {
	nameInput.value = profileTitle.textContent;
	descriptionInput.value = profileDescription.textContent;
	openModal(popupEdit);
});
// кнопки закрытия
////////////////////////////popupCloseEdit.addEventListener("click", () => closeModal(popupEdit));

//Форма добавления карточки

const popupNewCard = document.querySelector(".popup_type_new-card");
const formElementCard = document.querySelector('.popup__form[name="new-place"]');
const photoTitleInput = formElementCard.querySelector('.popup__input_type_card-name');
const photoURLInput = formElementCard.querySelector('.popup__input_type_url');
////////////////////////////const popupCloseCard = popupNewCard.querySelector(".popup__close");
const profileAddButton = document.querySelector('.profile__add-button');


function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const addCard = {
    name: photoTitleInput.value,
    link: photoURLInput.value,
};
    const add = createCard(addCard, deleteCard, likeActive, clikOpenImage);
     // Добавляем новую карточку в начало контейнера
    cardContainer.prepend(add);  
    closeModal(popupNewCard);
    formElementCard.reset()
};

//Отслеживание отправки формы на добавление карточки
formElementCard.addEventListener('submit', handleFormAddSubmit);
//Отслеживание клика по добавлению карточки
profileAddButton.addEventListener("click", () => openModal(popupNewCard));
// кнопки закрытия
////////////////////////////popupCloseCard.addEventListener("click", () => closeModal(popupNewCard))



//Открытие модального окна с картинкой

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImgage = popupTypeImage.querySelector(".popup__image");
const cardCaption = popupTypeImage.querySelector(".popup__caption");
////////////////////////////const popupCloseImage = popupTypeImage.querySelector(".popup__close");

function clikOpenImage(link, caption) {
    popupImgage.src = link;
    popupImgage.alt = caption;
    cardCaption.textContent = caption;
    openModal(popupTypeImage);
};
// кнопки закрытия
////////////////////////////popupCloseImage.addEventListener("click", () => closeModal(popupTypeImage));

// Вывести карточки на страницу

initialCards.forEach(item => { // перебираем массив
    cardContainer.append(createCard(item, deleteCard, likeActive, clikOpenImage)); // Выводим карточку. 
});