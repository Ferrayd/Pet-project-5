export class Card {
    constructor(name, url) {

        this.name = name;
        this.url = url;
        this.element = null;
        this.cardDel = null
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
    }
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        this.element.remove();
        this.removeListeners();
    }
    create() {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');
        const cardImg = document.createElement('div');
        cardImg.classList.add('place-card__image');

        const cardDel = document.createElement('button');
        cardDel.classList.add('place-card__delete-icon');
        this.cardDel = cardDel

        const cardDescription = document.createElement('div');
        cardDescription.classList.add('place-card__description');
        const cardName = document.createElement('h3');
        cardName.classList.add('place-card__name');
        const cardLike = document.createElement('button');
        cardLike.classList.add('place-card__like-icon');

        cardImg.appendChild(cardDel);
        cardDescription.appendChild(cardName);
        cardDescription.appendChild(cardLike);
        placeCard.appendChild(cardImg);
        placeCard.appendChild(cardDescription);

        cardImg.style.backgroundImage = `url(${this.url})`;
        cardName.textContent = this.name;

        this.element = placeCard;
        this.setListeners()

        return placeCard;

    }
    setListeners() {
        this.cardDel.addEventListener('click', this.remove);
        // this.element.addEventListener('click', this.openPopup);
        this.element.querySelector('.place-card__like-icon')
            .addEventListener('click', this.like);
    }
    removeListeners() {
        this.element.querySelector('.place-card__like-icon')
            .removeEventListener('click', this.like);
        this.cardDel.removeEventListener('click', this.remove)
    }
}
