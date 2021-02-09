export class CardList {

    constructor(container, cards) {
        this.container = container;
        this.cards = cards;

    }
    addCard(card) {
        this.container.appendChild(card);
    }
    render(cards) {
        const container = this.container;

        cards.forEach(function (item) {
            container.appendChild(item);
        });
    }
}
