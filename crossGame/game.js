const X = 'x';
const O = 'o';
const EMPTY = '';

const gamePrototype = {
    start: function () {
        this.clearBoard();
        this.currentUser = X;
        this.status = 'STARTED';
        this.board =  new Array(9).fill(EMPTY);
    },
    pause(active) {
        if (!['PAUSED', 'STARTED'].includes(this.status)) {
            return ;
        }

        this.status = active ? 'PAUSED' : 'STARTED';
    },
    addEventListeners: function () {
        //* this = game
        const self = this; //* game

        this.cellsCol.forEach(function (cell, idx) {
            //* this = game.cellsCol
            cell.addEventListener('click', function () {
                self.step(idx); // ?
            }); //* LE = { this: cell }
        }); //* LE = { this: game.cellsCol }
    },
    clearBoard: function () {
        this.boardEl.dataset.win = 0;
        delete this.boardEl.dataset.winType;
        delete this.boardEl.dataset.winIdx;

        this.cellsCol.forEach(function (cell) {
            cell.innerText = '';
        });
    },
    getUserWinLine: function () {
        const lines = [];
        const { board } = this;

        for (let i=0; i < 3; i++) {
            const row = {
                type: 'row',
                index: i,
                data: [
                    board[i*3],
                    board[i*3 + 1],
                    board[i*3 + 2]
                ]
            };
            const column = {
                type: 'column',
                index: i,
                data: [
                    board[i],
                    board[i+3],
                    board[i+6]
                ]
            };

            lines.push( row, column );
        }

        lines.push({
            type: 'diagonal',
            index: 0,
            data: [
                board[0],
                board[4],
                board[8]
            ]
        });
        lines.push({
            type: 'diagonal',
            index: 1,
            data: [
                board[2],
                board[4],
                board[6]
            ]
        });

        return lines.find(function (line) {
            return this.isLineWin(line, this.currentUser); // ?
        }, this);
    },
    isLineWin: function ({ data }, winSymbol) {
        // const { data } = line;

        return data.every(function (content) {
            return content === winSymbol;
        });
    },
    step: function (cellIdx) {
        if (this.status !== 'STARTED') {
            return ;
        }

        if (this.board[cellIdx] !== EMPTY) {
            return -1;
        }

        this.board[cellIdx] = this.currentUser;

        const winLine = this.getUserWinLine();
        const standoff = !this.board.includes(EMPTY);

        if (winLine) {
            this.status = 'WIN';

            this.boardEl.dataset.win = 1;
            this.boardEl.dataset.winType = winLine.type;
            this.boardEl.dataset.winIdx = winLine.index;

            if (this.onEndGame) {
                this.onEndGame();
            }
        } else if (standoff) {
            this.status = 'STANDOFF';

            if (this.onEndGame) {
                this.onEndGame();
            }
        } else {
            this.currentUser = this.currentUser === X ? O : X;

            if (this.onStep) {
                this.onStep();
            }
        }

        this.render();
    },
    createX: function () {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        el.setAttribute('class', 'board__sign board__sign--x');
        el.setAttribute('viewBox', '0 0 20 20');

        line1.setAttribute('class', 'board__line');
        line1.setAttribute('x1', '4');
        line1.setAttribute('y1', '2');
        line1.setAttribute('x2', '16');
        line1.setAttribute('y2', '18');

        line2.setAttribute('class', 'board__line');
        line2.setAttribute('x1', '16');
        line2.setAttribute('y1', '2');
        line2.setAttribute('x2', '4');
        line2.setAttribute('y2', '18');

        el.append(line1, line2);

        return el;
    },
    createO: function () {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

        el.setAttribute('class', 'board__sign board__sign--o');
        el.setAttribute('viewBox', '0 0 20 20');

        ellipse.setAttribute('class', 'board__ellipse');
        ellipse.setAttribute('cx', '10');
        ellipse.setAttribute('cy', '10');
        ellipse.setAttribute('rx', '7');
        ellipse.setAttribute('ry', '8');

        el.append(ellipse);

        return el;
    },
    render: function () {
        const { board } = this;
        //* board = game.board

        this.cellsCol.forEach((cell, idx) => {
            const content = board[idx];

            if (content === X && cell.children.length === 0) {
                const el = this.createX(); // ?

                cell.append(el);
            } else if (content === O && cell.innerHTML === '') {
                cell.append( this.createO() ); // ?
            }
        });
    }
};

// eslint-disable-next-line no-unused-vars
function createGame(selector, onEndGame, onStep) {
    const game = {
        boardEl: document.querySelector(selector),
        board: new Array(9).fill(EMPTY),
        currentUser: X,
        status: 'STARTED',
        __proto__: gamePrototype
    };

    game.cellsCol = Array.from(game.boardEl.querySelectorAll('.board__item'));
    game.addEventListeners();
    game.onEndGame = onEndGame;
    game.onStep = onStep;

    return game;
}
