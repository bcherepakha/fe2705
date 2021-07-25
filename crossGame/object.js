const game = {
    lastStep: true
}; //? new Object()

//? game.__proto__ = Object.prototype

const gameInfo = {
    draw: true,
    lastStep: game.lastStep
};

Object.defineProperty(gameInfo, 'lastStep', {
    configurable: true,
    enumerable: true,
    get: function () {
        return game.lastStep;
    }
});

console.log( gameInfo );

gameInfo.lastStep = 12; //? gameInfo.lastStep[[setter]]

console.log( gameInfo.lastStep ); //? gameInfo.lastStep[[getter]]

game.lastStep = 8;

console.log( gameInfo );
console.log( gameInfo.lastStep );
