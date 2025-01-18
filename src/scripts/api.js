import {apiConfig} from "./constants.js";

function processingServerResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getInitialCards() {
    return fetch(`${apiConfig.link}cards`, {
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

function addNewCard({name, link}) {
    return fetch(`${apiConfig.link}cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({name, link})
    })
        .then(processingServerResponse);
}

function deleteCard(cardId) {
    return fetch(`${apiConfig.link}cards/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

function getUserData() {
    return fetch(`${apiConfig.link}users/me`, {
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

function sendUserData({username, description}) {
    return fetch(`${apiConfig.link}users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({name: username, about: description})
    })
        .then(processingServerResponse);
}

function sendAvatarData({avatar}) {
    return fetch(`${apiConfig.link}users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({avatar})
    })
        .then(processingServerResponse);
}

function putCardLike(cardId) {
    return fetch(`${apiConfig.link}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

function deleteCardLike(cardId) {
    return fetch(`${apiConfig.link}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
        .then(processingServerResponse);
}

export {
    getInitialCards,
    addNewCard,
    deleteCard,
    getUserData,
    sendUserData,
    sendAvatarData,
    putCardLike,
    deleteCardLike
};