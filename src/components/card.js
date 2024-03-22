import { putLikeCard, deleteLikeCard, deleteCardId } from "../components/api";


//Функция создания карточки
export function createCard(userId, card, deleteCard, openImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = card.link;
  cardImage.alt = "фотография " + card.caption;
  cardTitle.textContent = card.caption;
  const cardId = card._id;

  cardImage.addEventListener("click", () => {
    openImage(card.link, card.caption);
  });

  if (userId !== card.owner._id) {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardId, cardElement);
    });
  } else {
    deleteButton.remove();
  }

  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = card.likes.length;

  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", (evt) => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      deleteLike(evt, cardId);
    } else {
      likeCard(evt, cardId);
    }
  });

  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  return cardElement;
};

//Удаление лайка
function deleteLike(evt, cardId) {
  deleteLikeCard(cardId)
    .then((card) => {
      evt.target
        .closest(".card__like")
        .querySelector(".card__like-counter").textContent = card.likes.length;
      evt.target.classList.remove("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}
//Лайк карточки
export function likeCard(evt, cardId) {
  putLikeCard(cardId)
    .then((card) => {
      evt.target
        .closest(".card__like")
        .querySelector(".card__like-counter").textContent = card.likes.length;
      evt.target.classList.add("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  deleteCardId(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}
