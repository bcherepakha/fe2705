function Slider( selector, loop = false, type = 'fade', autoMove = 2000 ) {
    //* this = {}
    //* this.__proto__ = Slider.prototype

    this.loop = loop;
    this.type = type;
    this.autoMove = autoMove;
    this.rootEl = document.querySelector( selector );
    this.bodyEl = this.rootEl.querySelector('.slider__body');
    this.slides = Array.from(this.rootEl.querySelectorAll( '.slider__slide' ));
    this.currentSlide = Math.max(this.slides
        .findIndex(el => el.classList.contains('slider__current')), 0);
    this.prevBtn = this.rootEl.querySelector('.slider__prev');
    this.nextBtn = this.rootEl.querySelector('.slider__next');
    this.playBtn = this.rootEl.querySelector('.slider__run');
    this.pauseBtn = this.rootEl.querySelector('.slider__stop');

    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.playBtn.addEventListener('click', this.play.bind(this));
    this.pauseBtn.addEventListener('click', this.pause.bind(this));

    this.rootEl.classList.add(type);

    if (autoMove > 0) {
        this.play();
    }

    // this.render = type === 'slide' ? this.renderSlide : this.renderFade;

    this.render();

    //* return this;
}

Slider.prototype.play = function () {
    this._intervalId = setInterval(this.next.bind(this), this.autoMove);
};

Slider.prototype.pause = function () {
    if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
    }
};

Slider.prototype.next = function () {
    let nextSlide = this.currentSlide + 1;

    // if (this.loop && nextSlide >= this.slides.length) {
    //     nextSlide = nextSlide % this.slides.length;
    // }

    this.show(nextSlide);
};

Slider.prototype.prev = function () {
    let prevSlide = this.currentSlide - 1;

    // if (this.loop && prevSlide < 0) {
    //     prevSlide = this.slides.length + prevSlide % this.slides.length;
    // }

    this.show(prevSlide);
};

Slider.prototype.show = function (idx) {
    let currentSlide = Math.min(Math.max(idx, 0), this.slides.length - 1);

    if (this.loop) {
        currentSlide = idx % this.slides.length;

        if (currentSlide < 0) {
            currentSlide += this.slides.length;
        }
    }

    this.currentSlide = currentSlide;

    this.render();
};

Slider.prototype.renderFade = function () {
    const {currentSlide} = this;

    this.slides.forEach(function (slide, idx) {
        if (idx === currentSlide) {
            slide.classList.add('slider__current');
        } else {
            slide.classList.remove('slider__current');
        }
    });
};

Slider.prototype.renderSlide = function () {
    const {currentSlide} = this;

    this.bodyEl.style.transform = `translateX(-${100*currentSlide}%)`;
};

Slider.prototype.render = function () {
    switch (this.type) {
    case 'fade':
        return this.renderFade();
    default:
        return this.renderSlide();
    }
};
