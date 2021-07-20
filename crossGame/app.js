/* global createGame, createNotification, createGreeting, createGamer */
createGreeting( onHello ); //? this = undefined | Window
const game = createGame('.board', endGameHandler, stepHandler);
const notification = createNotification( startNewGame );
const gamerX = createGamer('.game__user--x');
const gamerO = createGamer('.game__user--o');

// startNewGame();
game.clearBoard();

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
    switch (game.currentUser) {
    case 'x':
        gamerX.timer.start();
        gamerO.timer.pause();
        break;
    default:
        gamerO.timer.start();
        gamerX.timer.pause();
        break;
    }
}
