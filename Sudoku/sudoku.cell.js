export class Cell {
    constructor(props) {
        this.props = props;

        this.createElements();
    }

    setKey(key) {
        const row = key % 9;
        const column = Math.floor( key / 9);
        const square = Math.floor(column / 3) + Math.floor(row / 3);

        this.key = key;
        this.row = row;
        this.column = column;
        this.square = square;
    }

    createElements() {
        const rootEl = document.createElement('div');

        rootEl.className = 'game__board-cell';

        this.rootEl = rootEl;
    }

    render() {
        this.rootEl.innerText = this.props.value;
        this.rootEl.dataset.editable = this.props.editable;
        this.rootEl.dataset.error = this.props.error;
        this.rootEl.dataset.activeCell = this.props.activeCell;
        this.rootEl.dataset.activeRange = this.props.activeRange;

        return this.rootEl;
    }
}
