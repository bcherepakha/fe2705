export class Keyboard {
    constructor() {
        this.createElements();
    }

    createElements() {
        const rootEl = document.createElement('form');

        rootEl.className = 'game__keyboard';
        rootEl.append(
            ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => {
                const btn = document.createElement('button');

                btn.value = value;
                btn.innerText = value;
                btn.className = 'game__keyboard-item';

                return btn;
            })
        );

        this.rootEl = rootEl;
    }

    render() {
        return this.rootEl;
    }
}
