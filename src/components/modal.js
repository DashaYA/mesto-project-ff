//Функция открытия модального окна
export function openModal(modal) {
    modal.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscape);
}

//Функция закрытия модального окна
export function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscape);
}

// при нажатии клавиши Escape
const handleEscape = (evt) => {
    if (evt.code === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
        closeModal(popupOpened);
    }
};

// при клике вне контента модального окна
export function handleOutside(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
};