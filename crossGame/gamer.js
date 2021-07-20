/* global Timer */
// eslint-disable-next-line no-unused-vars
function createGamer(selector) {
    const gamer = {
        data: {},
        win: 0
    };
    const typeLabels = {
        human: 'Человек',
        robot: 'Робот',
        default: 'Неизвестно'
    };

    gamer.rootEl = document.querySelector(selector);
    gamer.typeEl = gamer.rootEl.querySelector('.game__user-type');
    gamer.winEl = gamer.rootEl.querySelector('.game__user-win');
    gamer.timerEl = gamer.rootEl.querySelector('.game__timer');

    gamer.timer = new Timer(gamer.timerEl);

    gamer.setData = function (type, name) {
        gamer.data = {
            type,
            name
        };

        this.render();
    };

    gamer.render = function () {
        const { data: { type, name }, win } = this;

        //* win = this.win
        //* type = this.data.type
        //* name = this.data.name

        this.winEl.innerText = `${win} побед`;
        this.typeEl.innerText = `${typeLabels[type] || typeLabels.default}`;

        //* undefined => false
        //* 'Неизвестно' => true
        //* undefined || 'Неизвестно' =>

        if (name) {
            this.typeEl.innerText += `: ${name}`;
        }
    };

    gamer.render(); //* this = gamer

    return gamer;
}
