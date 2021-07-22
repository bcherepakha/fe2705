export default function Settings( onSubmitHandler ) {
    //? this = {}
    //? this.__proto__ = Settings.prototype

    this.onSubmitHandler = onSubmitHandler;
    this.formEl = document.querySelector('.game-data');

    this.formEl.addEventListener('submit', this.submit.bind(this));

    //? return this;
}

Settings.prototype.submit = function (e) {
    e.preventDefault();

    const data = new FormData(this.formEl);
    const sign = data.get('sign');
    const type = data.get('type');

    this.onSubmitHandler({ sign, type });
};
