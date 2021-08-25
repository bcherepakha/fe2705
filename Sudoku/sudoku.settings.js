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
        return +this.complexityControlItem.value;
    }

    get showHint() {
        return this.hintControlItem.checked;
    }

    createElements() {
        const rootEl = document.createElement('form');
        const complexityControlContainer = document.createElement('label');
        const complexityControlItem = document.createElement('select');
        const complexityControlLabel = document.createElement('strong');
        const hintControlContainer = document.createElement('label');
        const hintControlItem = document.createElement('input');
        const hintControlLabel = document.createElement('span');
        const startBtn = document.createElement('button');
        const { defaultComplexity } = this.props;

        rootEl.className = 'game__settings';
        complexityControlContainer.append(complexityControlLabel, complexityControlItem, hintControlContainer);
        complexityControlLabel.innerText = 'Level:';
        complexityControlItem.append(
            ...this.props.complexity.map(
                ([text, value]) => {
                    const optionElement = document.createElement('option');

                    optionElement.value = value;
                    optionElement.innerText = text;
                    optionElement.selected = defaultComplexity === value;

                    return optionElement;
                }
            )
        );
        hintControlContainer.append(
            hintControlItem,
            hintControlLabel
        );

        hintControlItem.type = 'checkbox';
        hintControlItem.checked = this.props.showHint;
        hintControlLabel.innerText = 'Show hint';

        rootEl.append(complexityControlContainer, startBtn);

        startBtn.innerText = 'Start new game';
        startBtn.type = 'submit';

        rootEl.addEventListener('submit', this.onSubmit.bind(this));

        this.hintControlItem = hintControlItem;
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
