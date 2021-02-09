export class FormValidator {
    constructor(form) {
        this.form = form
        this.button = form.querySelector('.popup__button');
        this.inputs = form.querySelectorAll('.popup__input');
        this.errorSpans = form.querySelectorAll('.popup__error')
    }

    checkInputValidity(input, event) {
        input.setCustomValidity('');
        this.setSpanMessage(input)
        const validity = input.validity;

        if (input.value.length === 0) {
            input.setCustomValidity('Поле обязательно для заполнения');
            if (input === event.target) {

                this.setSpanMessage(input)
            }
            return false
        }
        if (validity.typeMismatch) {
            input.setCustomValidity('Здесь должна быть ссылка');
            if (input === event.target) {
                this.setSpanMessage(input)
            }
            return false
        }
        if (validity.tooShort) {
            input.setCustomValidity(`Должно быть от 2 до 30 символов`);
            if (input === event.target) {
                this.setSpanMessage(input)
            }
            return false
        } else if (!validity.tooShort) {
            input.setCustomValidity(``);
            if (input === event.target) {
                this.setSpanMessage(input)
            }
            return true
        }
        return input.validity.valid;
    }

    setEventListeners() {
        const inputs = this.form.querySelectorAll('.popup__input');
        const button = this.form.querySelector('.popup__button');
        inputs.forEach(input => {
            console.log(input)
            input.addEventListener('keyup', (event) => {
                this.changeFormState(input, button, event)
            })
        })
    }

    setSpanMessage(input) {
        const span = input.nextElementSibling;
        span.innerText = input.validationMessage;
    }

    changeFormState(inputs, button, event) {

        const state = this.isValid(event);
        this.setSubmitButtonState(state, button);
    }

    setSubmitButtonState(state, button) {
        if (!state) {
            button.disabled = true;
            button.classList.add('popup__button_invalid');
        } else {
            button.disabled = false;
            button.classList.remove('popup__button_invalid');
        }
    }

    isValid(event) {
        let states = [];
        this.inputs.forEach(input => {
            states.push(this.checkInputValidity(input, event));
        });
        return !states.includes(false);
    };

    resetError() {
        this.errorSpans.forEach(span => {
            span.innerText = ''
        })
    }

}
