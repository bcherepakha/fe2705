import { EventSource } from './eventSource.js';

const defaultComplexity = [
    ['easy', 62],
    ['medium', 53],
    ['hard', 44],
    ['very-hard', 35],
    ['insane', 26],
    ['inhuman', 17]
];

export class Settings extends EventSource {
    constructor(props = {}) {
        super();

        this.props = props;

        if (!this.props.complexity) {
            this.props.complexity = defaultComplexity;
        }

        this.createElements();
    }

    get complexity() {
        return this.complexityControlItem.value;
    }

    createElements() {
        const rootEl = document.createElement('form');
        const complexityControlContainer = document.createElement('label');
        const complexityControlItem = document.createElement('select');
        const complexityControlLabel = document.createElement('strong');
        const startBtn = document.createElement('button');

        rootEl.className = 'game__settings';
        complexityControlContainer.append(complexityControlLabel, complexityControlItem);
        complexityControlLabel.innerText = 'Level:';
        complexityControlItem.append(
            ...this.props.complexity.map(
                ([text, value]) => {
                    const optionElement = document.createElement('option');

                    optionElement.value = value;
                    optionElement.innerText = text;

                    return optionElement;
                }
            )
        );

        rootEl.append(complexityControlContainer, startBtn);

        startBtn.innerText = 'Start new game';
        startBtn.type = 'submit';

        rootEl.addEventListener('submit', this.onSubmit.bind(this));

        this.complexityControlItem = complexityControlItem;
        this.rootEl = rootEl;
    }

    onSubmit(e) {
        e.preventDefault();

        this.trigger('start');
    }

    render() {
        return this.rootEl;
    }
}
