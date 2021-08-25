import { Cell } from './sudoku.cell.js';
import { sudoku } from './sudoku.core.js';
import { EventSource } from './eventSource.js';

export class Board extends EventSource {
    constructor(props) {
        super();

        this.props = props;

        this.state = {
            activeCell: null,
        };

        this.createElements();
    }

    get value() {
        return this.cells.map(cell => {
            if (cell.props.error) {
                return '.';
            }

            return cell.props.value ? cell.props.value : '.';
        }).join('');
    }

    isFull() {
        const currentBoard = this.value;

        return !currentBoard.includes('.');
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

            cellItem.addEventListener('activate', this.onCellClick.bind(this));

            return cellItem;
        });

        this.cells = cells;

        this.rootEl.append(
            ...this.cells.map(cell => cell.render())
        );
    }

    setState( changeState = {} ) {
        this.state = {
            ...this.state,
            ...changeState,
        };

        this.render();
    }

    onCellClick(e) {
        this.setState({
            activeCell: e.target
        });

        this.trigger('activate', this.getActiveCandidates());
    }

    setStartBoard( startBoard ) {
        this.props.startBoard = startBoard;

        this.clear();
        this.fill();
    }

    getActiveCandidates() {
        const { activeCell } = this.state;

        if (!activeCell || !activeCell.isEditable()) {
            return [];
        }

        const currentBoard = this.value;
        const candidates = sudoku.get_candidates(currentBoard);

        if (!candidates) {
            return [];
        }

        return candidates[activeCell.row][activeCell.column]
            .split('').map(v => parseInt(v, 10));

    }

    write(value) {
        const { activeCell } = this.state;

        if (!activeCell || !activeCell.isEditable()) {
            return ;
        }

        const activeCandidate = this.getActiveCandidates();

        activeCell.changeProps({
            value: value.toString(),
            error: !activeCandidate.includes(value)
        });

        this.render();
        this.trigger('write');
    }

    render() {
        const { activeCell } = this.state;

        this.cells.forEach(cell => {
            cell.changeProps({
                activeCell: cell === activeCell,
                activeRange: !!activeCell
                    && (cell.column === activeCell.column
                    || cell.row === activeCell.row
                    || cell.square === activeCell.square),
                activeValue: !!activeCell
                    && !!activeCell.props.value
                    && cell.props.value === activeCell.props.value,
            });
        });

        return this.rootEl;
    }
}
