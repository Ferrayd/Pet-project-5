import './style.css';
import { Api } from './js/Api.js';
import { Card } from './js/Card.js';
import { CardList } from './js/CardList.js';
import { FormValidator } from './js/FormValidator.js';
import { Popup } from './js/Popup.js';
import { UserInfo } from './js/UserInfo.js';
(async function () {
    const placesList = document.querySelector('.places-list');
    //const closeForm = document.querySelector('.popup__close');
    const popupPlace = document.querySelector('.popup__add');
    const popupEdit = document.querySelector('.popup__edit');
    //const popup = document.querySelector('.popup');
    const formPlace = document.querySelector('.popup__form_add');
    const formAbout = document.querySelector('.popup__form_edit');
    const inputsFormAbout = formAbout.querySelectorAll('input');
    //const inputsFormPlace = formPlace.querySelectorAll('input');
    const openFormAdd = document.querySelector('.user-info__button_type_add-card');
    const openFormAbout = document.querySelector('.user-info__button_type_about');
    const userName = document.querySelector('.user-info__name');
    const userAbout = document.querySelector('.user-info__job');
    const userAvatar = document.querySelector('.user-info__photo');
    const popupImage = document.querySelector('.popup__image');
    const popupPhoto = document.querySelector('.popup__photo');
    //const cardNameInput = document.querySelector('.popup__input_type_name');
    //const closeButtons = document.querySelectorAll('.popup__close-button');
    //const forms = document.querySelectorAll('.popup__form');
    const placeButton = formPlace.querySelector('.popup__button');
    // ------------------------------------------------------------------------------
    /**
     * DOM
     * @param event
     */
    function openImage(event) {
        if (event.target.classList.contains('place-card__image')) {
            imagePopup.open();
            popupImage.src = event.target.style.backgroundImage.slice(5, -2);
        }
    };

    function getCard(name, link) {
        const card = new Card(name, link);
        const element = card.create();
        card.setListeners();
        element.addEventListener('click', openImage);
        return element;
    }

    const userEditPopup = new Popup(popupEdit)
    const imagePopup = new Popup(popupPhoto)
    const newPlacePopup = new Popup(popupPlace)

    const userInfoValidator = new FormValidator(formAbout)
    userInfoValidator.setEventListeners()
    const placeValidator = new FormValidator(formPlace)
    placeValidator.setEventListeners()

    const userInfo = new UserInfo(userName, userAbout, userAvatar)

    /**
     * API
     */
    const api = new Api();
    let user = {}
    try {
        await api.getUser()
            .then(res => {
                user = res
                userInfo.setUserInfo(user.name, user.about, user.avatar)
                userInfo.updateUserInfo()
            })
            .catch(err => {
                console.debug(err)
            });

    } catch (err) {

    }

    let initialCards = []
    try {
        await api.getPlaces()
            .then(res => {
                initialCards = res
            })
            .catch(err => {
                console.debug(err)
            });
    } catch (err) {
        console.warn(err)
    }

    const cardList = new CardList(placesList);
    const cards = initialCards.map(cardData => {
        const newCard = getCard(cardData.name, cardData.link)
        return newCard;
    })

    cardList.render(cards)

    // ------------------------------------------------------------------------------
    /**
     * Listeners
     */
    openFormAdd.addEventListener('click', () => {
        formPlace.reset();
        placeValidator.resetError()
        newPlacePopup.open();
    })

    formPlace.addEventListener('submit', (event) => {
        event.preventDefault()
        const cardName = formPlace.elements.name.value
        const cardLink = formPlace.elements.link.value
        const newCard = getCard(cardName, cardLink)
        cardList.addCard(newCard)

        newPlacePopup.close();
        formPlace.reset();
        userInfoValidator.setSubmitButtonState(false, placeButton);
    });

    openFormAbout.addEventListener('click', (event) => {
        formAbout.elements.user.value = userName.textContent;
        formAbout.elements.job.value = userAbout.textContent;
        userInfoValidator.changeFormState(inputsFormAbout, formAbout.elements.submit, event);
        userEditPopup.open();
    });

    formAbout.addEventListener('submit', async (event) => {
        event.preventDefault()
        const name = formAbout.elements.user.value
        const job = formAbout.elements.job.value

        try {
            await api.patchUser({
                name,
                about: job
            })
                .then(res => {
                    user = res
                    userInfo.setUserInfo(user.name, user.about, user.avatar)
                    userInfo.updateUserInfo()
                })
                .catch(err => {
                    console.debug(err)
                });


        } catch (err) {
            console.error(err)
        }
        if (userInfoValidator.isValid(event)) {
            userEditPopup.close()
        }
    });
})()