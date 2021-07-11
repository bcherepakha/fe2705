// eslint-disable-next-line no-unused-vars
function createGreeting( onHello ) {
    const modal = {
        el: document.querySelector('.modal'),
        formEl: document.querySelector('.greeting'),
        inputEl: document.querySelector('.greeting input')
    };

    modal.formEl.addEventListener('submit', onGreet);

    function onGreet(e) {
        e.preventDefault();

        const userName = modal.inputEl.value;

        if (userName && userName.length > 3) {
            modal.el.hidden = true;
            modal.userName = userName;

            if (onHello) {
                onHello(userName);
            }
        }

        console.log('Greet', userName);
    }

    return modal;
}
