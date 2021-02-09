export class Popup {
    constructor(popup) {
        this.popup = popup;
        this.inputs = this.popup.querySelectorAll('input')
        this.closeBtn = this.popup.querySelector('.popup__close-button');
        this.closeBtn.addEventListener('click', this.close.bind(this));
    }

    open() {
        this.popup.classList.add('popup_is-opened');
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
        this.inputs.forEach(input => input.value = '')
    }

}
