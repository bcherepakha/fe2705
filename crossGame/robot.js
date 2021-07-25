export function robot(board, user, info) {
    const { lastStep } = info;

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

    const steps = board.filter(el => el !== '');
    const step = steps.length;

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

    // играют нолики
    if (step === 1 && board[4] === 'x') {
        info.firstXinCenter = true;

        return goInRandomCornerOrCell(board);
    } else if (step === 1) {
        info.firstXinCenter = false;
        info.firstStep = lastStep;
        info.firstStepInCorner = [0, 2, 6, 8].includes( info.firstStep );

        return 4;
    }

    if (info.firstXinCenter) {
        return goInRandomCornerOrCell(board);
    }

    if (info.firstStepInCorner && step === 3) {
        return goOpositeCorner(board, info.firstStep);
    }

    if (step === 3 && [0, 2, 6, 8].includes(lastStep)) {
        return goOpositeCorner(board, lastStep);
    }

    if (step === 3 && isOpositeSide(info.firstStep, lastStep)) {
        return goInRandomCornerOrCell(board);
    }

    if (step === 3) {
        return getNearestCorner(info.firstStep, lastStep);
    }

    return getRandomEmptyCell(board);
}

function getNearestCorner(step1, step2) {
    switch (step2 + step1) {
    case 4:
        return 0;
    case 6:
        return 2;
    case 10:
        return 6;
    case 12:
        return 8;
    default:
        throw new Error(`${step1} and ${step2} not nearest sides`);
    }
}

function isOpositeSide(step1, step2) {
    const opositeSide = {
        1: 7,
        3: 5,
        5: 3,
        7: 1
    }[step1];

    return opositeSide === step2;
}

function goOpositeCorner(board, step) {
    const oppositeCorner = {
        0: 8,
        2: 6,
        6: 2,
        8: 0
    }[step];

    if (board[oppositeCorner] === '') {
        return oppositeCorner;
    }

    return getRandomEmptySideCell(board);
}

function goInRandomCornerOrCell(board) {
    const cornerIdx = getRandomEmptyCorner(board);

    if (typeof cornerIdx !== 'number') {
        return getRandomEmptyCell(board);
    } else {
        return cornerIdx;
    }
}

function getRandomEmptyCorner(board) {
    const emptyCellIdxColl = [0, 2, 6, 8]
        .filter(idx => board[idx] === '');

    return emptyCellIdxColl[Math.floor(emptyCellIdxColl.length * Math.random())];
}

function getRandomEmptySideCell(board) {
    const emptyCellIdxColl = [1, 3, 5, 7]
        .filter(idx => board[idx] === '');

    return emptyCellIdxColl[Math.floor(emptyCellIdxColl.length * Math.random())];
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
