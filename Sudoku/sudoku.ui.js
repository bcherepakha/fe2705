import { Settings } from './sudoku.settings.js';
import { Board } from './sudoku.board.js';
import { Keyboard } from './sudoku.keyboard.js';

export class Sudoku {
    constructor(props) {
        this.props = props;

        this.clear();
        this.fill();
    }

    clear() {
        this.props.rootEl.innerText = '';
    }

    fill() {
        const titleEl = document.createElement('h1');
        const settings = new Settings();
        const board = new Board({
            startBoard: new Array(81).fill('.').join('')
        });
        const keyboard = new Keyboard();

        titleEl.className = 'game__title';
        titleEl.innerText = 'Sudoku';

        settings.addEventListener('start', this.onStartHandler.bind(this));

        this.settings = settings;
        this.props.rootEl.append(
            titleEl,
            settings.render(),
            board.render(),
            keyboard.render()
        );
    }

    onStartHandler(e) {
        console.log(e, this.settings.complexity);
    }
}
