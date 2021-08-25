import { EventSource } from './eventSource.js';

export class Keyboard extends EventSource {
    constructor() {
        super();

        this.createElements();
    }

    setActive( values ) {
        this.buttons.forEach(btn => {
            const active = values && values.includes(parseInt(btn.value, 10));

            btn.disabled = !active;
        });
    }

    createElements() {
        const rootEl = document.createElement('form');
        const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => {
            const btn = document.createElement('button');

            btn.value = value;
            btn.innerText = value;
            btn.className = 'game__keyboard-item';

            btn.addEventListener('click', this.onBtnClick.bind(this, value));

            return btn;
        });

        rootEl.className = 'game__keyboard';
        rootEl.append(
            ...buttons
        );

        rootEl.addEventListener('submit', this.onSubmit.bind(this));

        this.buttons = buttons;
        this.rootEl = rootEl;
    }

    onBtnClick( value ) {
        this.trigger('keypress', value);
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return this.rootEl;
    }
}
