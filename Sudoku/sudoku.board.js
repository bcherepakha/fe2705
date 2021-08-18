import { Cell } from './sudoku.cell.js';

export class Board {
    constructor(props) {
        this.props = props;

        this.createElements();
    }

    createElements() {
        const rootEl = document.createElement('div');

        rootEl.className = 'game__board';

        this.rootEl = rootEl;

        this.clear();
        this.fill();
    }

    clear() {
        this.rootEl.innerText = '';
    }

    fill() {
        const { startBoard } = this.props;
        const startBoardArr = startBoard.split('');
        const cells = startBoardArr.map((value, index) => {
            const cellItem = new Cell({
                value: value === '.' ? '' : value,
                editable: value === '.',
                error: false,
                activeCell: false,
                activeRange: false
            });

            cellItem.setKey(index);

            return cellItem;
        });

        this.cells = cells;

        this.rootEl.append(
            ...this.cells.map(cell => cell.render())
        );
    }

    render() {
        return this.rootEl;
    }
}
