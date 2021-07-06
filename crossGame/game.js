const X = 'x';
const O = 'o';
const EMPTY = '';

const game = {
    boardEl: document.querySelector('.board'),
    cellsCol: Array.from(document.querySelectorAll('.board__item')),
    board: [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    currentUser: X,
    status: 'STARTED',
    start: function () {
        game.clearBoard();
        game.currentUser = X;
        game.status = 'STARTED';
    },
    addEventListeners: function () {
        game.cellsCol.forEach(function (cell, idx) {
            cell.addEventListener('click', function () {
                game.step(idx);
            });
        });
    },
    clearBoard: function () {
        game.boardEl.dataset.win = 0;
        delete game.boardEl.dataset.winType;
        delete game.boardEl.dataset.winIdx;

        game.cellsCol.forEach(function (cell) {
            cell.innerText = '';
        });
    },
    getUserWinLine: function () {
        const lines = [];
        const { board } = game;

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
            return game.isLineWin(line, game.currentUser);
        });
    },
    isLineWin: function ({ data }, winSymbol) {
        // const { data } = line;

        return data.every(function (content) {
            return content === winSymbol;
        });
    },
    step: function (cellIdx) {
        if (game.status !== 'STARTED') {
            return ;
        }

        if (game.board[cellIdx] !== EMPTY) {
            return -1;
        }

        game.board[cellIdx] = game.currentUser;

        const winLine = game.getUserWinLine();

        if (winLine) {
            game.status = 'ENDED';

            game.boardEl.dataset.win = 1;
            game.boardEl.dataset.winType = winLine.type;
            game.boardEl.dataset.winIdx = winLine.index;
        } else {
            game.currentUser = game.currentUser === X ? O : X;
        }

        game.render();
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
        const { board } = game;
        //* board = game.board

        game.cellsCol.forEach(function (cell, idx) {
            const content = board[idx];

            if (content === X && cell.children.length === 0) {
                const el = game.createX();

                cell.append(el);
            } else if (content === O && cell.innerHTML === '') {
                cell.append( game.createO() );
            }
        });
    }
};

console.log(game);

game.addEventListeners();
game.start();
