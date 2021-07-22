export function robot(board, user, lastStep) {
    //* Правило 1. Если игрок может немедленно выиграть, он это делает.
    const myFutureWinLine = getFutureWinLine(board, user);

    if (myFutureWinLine) {
        return getEmptyPlaceIdx(myFutureWinLine);
    }

    //* Правило 2. Если противник мог бы немедленно выиграть,
    //* ходи предотвращая немедленный проигрыш.
    const enemyFutureWinLine = getFutureWinLine(board, user === 'x' ? 'o' : 'x');

    if (enemyFutureWinLine) {
        return getEmptyPlaceIdx(enemyFutureWinLine);
    }

    const step = board.filter(el => el !== '').length;

    if (user === 'x') {
        if (step === 0) {
            return 4;
        }

        const conerIdx = getCornerIdx(lastStep, board);

        if (typeof conerIdx === 'number') {
            return conerIdx;
        }

        return getRandomEmptyCell(board);
    }
}

function getRandomEmptyCell(board) {
    const emptyCellIdxColl = board.map((el, idx) => idx)
        .filter(idx => board[idx] === '');

    return emptyCellIdxColl[Math.floor(emptyCellIdxColl.length * Math.random())];
}

function getCornerIdx(lastStep, board) {
    const corners = [0, 2, 6, 8];

    function getDistance(cell1, cell2) {
        const row1 = Math.floor(cell1 / 3);
        const row2 = Math.floor(cell2 / 3);
        const col1 = cell1 % 3;
        const col2 = cell2 % 3;

        return (row2 - row1)^2 + (col2 - col1)^2;
    }

    corners.sort((c1, c2) => getDistance(c1, lastStep) - getDistance(c2, lastStep));

    return corners.filter(c => board[c] === '')[0];
}

function getEmptyPlaceIdx(line) {
    const emptyPlaceIdx = line.data.findIndex(cell => cell === '');

    if (line.type === 'row') {
        return line.index*3 + emptyPlaceIdx;
    }

    if (line.type === 'column') {
        return line.index + emptyPlaceIdx*3;
    }

    if (line.type === 'diagonal') {
        switch (emptyPlaceIdx) {
        case 0:
            return line.index === 0 ? 0 : 2;
        case 1:
            return 4;
        default:
            return line.index === 0 ? 8 : 6;
        }
    }
}

function getFutureWinLine(board, user) {
    const lines = getLines(board);

    return lines.find(line => line.data.filter(
        el => el === user).length === 2
                && line.data.includes('')
    );
}

function getLines(board) {
    const lines = [];

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

    return lines;
}
