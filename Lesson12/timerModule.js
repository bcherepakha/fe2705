(function (context, moduleName) {

    function Timer(rootELorSelector, controled) {
        //? this = {}
        //? this.__proto__ = Timer.prototype

        this.startTime = null;
        this.shiftTime = 0;
        this.status = 'NOT_STARTED';
        if (typeof rootELorSelector === 'string') {
            this.rootEl = document.querySelector(rootELorSelector);
        } else {
            this.rootEl = rootELorSelector;
        }

        this.fill( controled );
        this.render();

        //? return this;
    }

    Timer.prototype.fill = function( controled ) {
        const valueEl = document.createElement('span');

        valueEl.className = 'timer__value';

        this.valueEl = valueEl;

        this.rootEl.classList.add('timer');
        this.rootEl.append( valueEl );

        if (controled) {
            const startBtn = document.createElement('button');
            const pauseBtn = document.createElement('button');
            const resetBtn = document.createElement('button');

            startBtn.innerText = 'Start';
            pauseBtn.innerText = 'Pause';
            resetBtn.innerText = 'Reset';

            startBtn.className = 'timer__button';
            pauseBtn.className = 'timer__button';
            resetBtn.className = 'timer__button';

            startBtn.addEventListener('click', this.start.bind(this));
            resetBtn.addEventListener('click', this.reset.bind(this));
            pauseBtn.addEventListener('click', this.pause.bind(this));

            this.rootEl.append(startBtn, pauseBtn, resetBtn);
        }
    };

    Timer.prototype.render = function() {
        const currentTime = this.getCurrentTime() / 1000;
        const ss = Math.floor(currentTime % 60).toString().padStart(2, '0');
        const mm = Math.floor(currentTime / 60).toString().padStart(2, '0');

        this.valueEl.innerText = `${mm}:${ss}`;
        this.rootEl.dataset.status = this.status;
    };

    Timer.prototype.start = function () {
        if (this.status === 'STARTED') {
            return ;
        }

        this.startTime = Date.now();
        this.status = 'STARTED';

        this.render();

        this._intervalId = setInterval(this.render.bind(this), 1000);
    };

    Timer.prototype.reset = function () {
        this.startTime = null;
        this.shiftTime = 0;
        this.status = 'NOT_STARTED';

        this.render();

        if (this._intervalId) {
            clearInterval(this._intervalId);
            delete this._intervalId;
        }
    };

    Timer.prototype.pause = function () {
        this.shiftTime = this.getCurrentTime();
        this.startTime = null;
        this.status = 'PAUSED';

        this.render();

        if (this._intervalId) {
            clearInterval(this._intervalId);
            delete this._intervalId;
        }
    };

    Timer.prototype.getCurrentTime = function () {
        if (this.startTime) {
            return this.shiftTime + Date.now() - this.startTime;
        }

        return this.shiftTime;
    };

    context[moduleName] = Timer;

})(window, 'Timer');
