import { initialCards } from './cards.js';

// Получаем элементы попапов
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Найти форму в DOM
const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
// Найти поля формы в DOM
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const cardFormElement = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const linkInput = cardFormElement.querySelector('.popup__input_type_url');

// Найти элементы профиля в DOM
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
  });

// Создание карточки
initialCards.forEach(function(cardData) {
    const card = createCard(cardData.link, cardData.name);
    placesList.append(card);
  });

// Функция создания карточки
function createCard(imageSrc, title) {
    const cardItem = cardTemplate.cloneNode(true);

    const cardImage = cardItem.querySelector('.card__image');
    const likeButton = cardItem.querySelector('.card__like-button');
    const deleteButton = cardItem.querySelector('.card__delete-button');

    cardItem.querySelector('.card__image').src = imageSrc;
    cardItem.querySelector('.card__image').alt = title;
    cardItem.querySelector('.card__title').textContent = title;

    // Обработчик клика по сердечку (лайк)
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Обработчик клика по корзине (удаление)
    deleteButton.addEventListener('click', (event) => {
        const cardToDelete = event.target.closest('.card');
        cardToDelete.remove();
    });

    // Обработчик клика по фото (открытие изображения)
    cardImage.addEventListener('click', () => {
        popupImage.src = imageSrc;
        popupImage.alt = title;
        popupCaption.textContent = title;
        openModal(imagePopup);
    });

    return cardItem;
}

// Функции открытия и закрытия попапов
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

profileEditButton.addEventListener('click', () => {
    // Установить значения полей формы текущими значениями профиля
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    
    // Открыть попап
    openModal(profilePopup);
});

profileAddButton.addEventListener('click', () => {
    openModal(cardPopup);
});

document.querySelectorAll('.popup__close').forEach(button => {
    button.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        closeModal(popup);
    });
});

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Отменяет стандартную отправку формы

    // Получить значение полей
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Вставить новые значения в профиль
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    // Закрыть попап после сохранения
    closeModal(profilePopup);
}

// Прикрепить обработчик к форме
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Добавление карточки на страницу
function handleCardFromSubmit(evt){
    evt.preventDefault();

    const placeNameValue = placeNameInput.value;
    const linkValue = linkInput.value;

    const newCard = createCard(linkValue, placeNameValue);
    placesList.prepend(newCard);

    closeModal(cardPopup);

    cardFormElement.reset();
}

cardFormElement.addEventListener('submit', handleCardFromSubmit);