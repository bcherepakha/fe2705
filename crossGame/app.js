import Settings from './gameData.js';
import { robot } from './robot.js';

/* global createGame, createNotification, createGreeting, createGamer */
createGreeting( onHello ); //? this = undefined | Window
new Settings( onChangeSettings );
const boardEl = document.querySelector('.board');
const game = createGame('.board', endGameHandler, stepHandler, canIClick);
const notification = createNotification( startNewGame );
const gamerX = createGamer('.game__user--x');
const gamerO = createGamer('.game__user--o');
const gameInfo = {
    drawSymbol: false,
    get lastStep() {
        return game.lastStep;
    }
};

boardEl.addEventListener('animationend', onEndAnimation);

// startNewGame();
game.clearBoard();

function onChangeSettings({ sign, type }) {
    if (type === 'robot') {
        if (sign === 'x') {
            gamerO.setData('robot');
            gamerX.setData('human');
        } else {
            gamerX.setData('robot');
            gamerO.setData('human');
        }
    } else {
        gamerX.setData('human');
        gamerO.setData('human');
    }

    startNewGame();

    if (type === 'robot' && sign === 'o') {
        const cellIdx = robot(game.board, game.currentUser, game.lastStep);

        game.step(cellIdx);
    }
}

function startNewGame() {
    gameInfo.drawSymbol = false;

    game.start();
    gamerX.timer.reset();
    gamerO.timer.reset();
    // gamerX.timer.start();
}

function endGameHandler() {
    gamerO.timer.pause();
    gamerX.timer.pause();

    if (game.status === 'STANDOFF') {
        notification.setText('Ничья');
    } else if (game.currentUser === 'x') {
        notification.setText('Победили Крестики');
    } else {
        notification.setText('Победили Нолики');
    }

    notification.show();
}

function onHello(userName) {
    gamerX.setData('human', userName); //? this = gamerX
    gamerO.setData('human', userName); //? this = gamerO
    startNewGame();
}

function stepHandler() {
    gameInfo.drawSymbol = true;

    let currentUser;

    switch (game.currentUser) {
    case 'x':
        gamerX.timer.start();
        gamerO.timer.pause();
        currentUser = gamerX;
        break;
    default:
        gamerO.timer.start();
        gamerX.timer.pause();
        currentUser = gamerO;
        break;
    }

    if (currentUser.data.type === 'robot') {
        const cellIdx = robot(
            game.board,
            game.currentUser,
            gameInfo);

        setTimeout(() => game.step(cellIdx), 0);
    }
}

function canIClick() {
    const currentUser = game.currentUser === 'x' ? gamerX : gamerO;

    if (currentUser.data.type === 'robot') {
        return false;
    }

    if (gameInfo.drawSymbol) {
        return false;
    }

    return true;
}

function onEndAnimation(e) {
    if (
        (e.animationName === 'b-l1' && e.target.parentElement.children[1] === e.target)
        || e.animationName === 'b-e') {
        gameInfo.drawSymbol = false;
    }
}
