// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы, место вставки карточек

const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(card, deleteCard) {
    //содержимое шаблона нужно клонировать
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    //добавила название и картинку
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = 'фотография ' + card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
        deleteCard(cardElement);
    });

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(card => {
    const cardElement = addCard(card, deleteCard);
    cardContainer.append(cardElement);
});