let userName;
const modal = {
    el: document.querySelector('.modal'),
    formEl: document.querySelector('.greeting'),
    inputEl: document.querySelector('.greeting input')
};

modal.formEl.addEventListener('submit', onGreet);

function onGreet(e) {
    e.preventDefault();

    userName = modal.inputEl.value;

    console.log('Greet', userName);

    if (userName && userName.length > 3) {
        modal.el.hidden = true;
    }
}
