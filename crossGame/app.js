/* global createGame, createNotification, createGreeting, createGamer */
const greeting = createGreeting( onHello );
const game = createGame('.board', endGameHandler);
const notification = createNotification( startNewGame );
const gamerX = createGamer('.game__user--x');
const gamerO = createGamer('.game__user--o');

startNewGame();

console.log({ gamerX, gamerO });

function startNewGame() {
    game.start();
}

function endGameHandler() {
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
    console.log( 'onHello', userName, greeting );
    gamerX.setData('human', userName);
    gamerO.setData('human', userName);
}
