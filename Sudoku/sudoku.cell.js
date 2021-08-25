import { EventSource } from './eventSource.js';

export class Cell extends EventSource {
    constructor(props) {
        super(props);

        this.props = props;

        this.createElements();
    }

    isEditable() {
        return this.props.editable;
    }

    setKey(key) {
        const column = key % 9;
        const row = Math.floor( key / 9);
        const square = Math.floor(column / 3) + Math.floor(row / 3);

        this.key = key;
        this.row = row;
        this.column = column;
        this.square = square;
    }

    createElements() {
        const rootEl = document.createElement('div');

        rootEl.className = 'game__board-cell';
        rootEl.addEventListener('click', this.onClick.bind(this));

        this.rootEl = rootEl;
    }

    changeProps( newProps = {} ) {
        this.props = {
            ...this.props,
            ...newProps,
        };

        this.render();
    }

    onClick() {
        this.trigger('activate');
    }

    render() {
        this.rootEl.innerText = this.props.value;
        this.rootEl.dataset.editable = this.props.editable;
        this.rootEl.dataset.error = this.props.error;
        this.rootEl.dataset.activeCell = this.props.activeCell;
        this.rootEl.dataset.activeRange = this.props.activeRange;
        this.rootEl.dataset.activeValue = this.props.activeValue;

        return this.rootEl;
    }
}
