// @todo: Функция создания карточки
export function createCard(card, deleteButton, likeActive, openImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = card.link;
    cardImage.alt = 'фотография ' + card.name;
    cardTitle.textContent = card.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
      deleteButton(cardElement)});
    cardElement.querySelector('.card__like-button').addEventListener('click', likeActive);
        cardImage.addEventListener('click', function () {
      openImage(cardImage.src, cardTitle.textContent)});

    return cardElement;
};

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  evt.remove();
};

//Лайк карточки
export function likeActive(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};



