import Settings from './gameData.js';
import { robot } from './robot.js';

/* global createGame, createNotification, createGreeting, createGamer */
createGreeting( onHello ); //? this = undefined | Window
const settings = new Settings( onChangeSettings );
const game = createGame('.board', endGameHandler, stepHandler);
const notification = createNotification( startNewGame );
const gamerX = createGamer('.game__user--x');
const gamerO = createGamer('.game__user--o');

console.log( settings );

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
        const cellIdx = robot(game.board, game.currentUser, game.lastStep);

        setTimeout(() => game.step(cellIdx), 3000);
    }
}
