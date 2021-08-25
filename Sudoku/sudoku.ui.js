import { Settings } from './sudoku.settings.js';
import { Board } from './sudoku.board.js';
import { Keyboard } from './sudoku.keyboard.js';
import { sudoku } from './sudoku.core.js';

export class Sudoku {
    constructor(props) {
        this.props = props;

        this.onActivate = this.onActivate.bind(this);

        this.clear();
        this.fill();

        window.addEventListener('keypress', this.keyPressed.bind(this));
    }

    clear() {
        this.props.rootEl.innerText = '';
    }

    fill() {
        const titleEl = document.createElement('h1');
        const settings = new Settings({
            showHint: true,
            defaultComplexity: 35
        });
        const { complexity } = settings;
        const board = new Board({
            startBoard: sudoku.generate(complexity)
        });
        const keyboard = new Keyboard();

        titleEl.className = 'game__title';
        titleEl.innerText = 'Sudoku';

        settings.addEventListener('start', this.onStartHandler.bind(this));
        keyboard.addEventListener('keypress', this.onKeyPress.bind(this));
        board.addEventListener('write', this.checkWin.bind(this));
        board.addEventListener('activate', this.onActivate);

        this.keyboard = keyboard;
        this.board = board;
        this.settings = settings;
        this.props.rootEl.append(
            titleEl,
            settings.render(),
            board.render(),
            keyboard.render()
        );
    }

    keyPressed(e) {
        const key = parseInt(e.key, 10);

        if (!isNaN(key)) {
            this.board.write( key );
        }
    }

    onKeyPress(e) {
        this.board.write( e.data );
    }

    checkWin() {
        if (this.board.isFull()) {
            alert('Вы победили');
        }
    }

    onStartHandler() {
        const { complexity, showHint } = this.settings;
        const startBoard = sudoku.generate(complexity);

        this.board.setStartBoard( startBoard );

        this.board.removeEventListener('activate', this.onActivate);

        if (showHint) {
            this.board.addEventListener('activate', this.onActivate);
        }
    }

    onActivate(e) {
        this.keyboard.setActive(e.data);
    }
}
