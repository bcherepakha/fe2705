function showAlert(text) {
    if (!showAlert.rootEl) {
        showAlert.rootEl = document.querySelector('.modal.alert');
        showAlert.textEl = showAlert.rootEl.querySelector('.modal__text');
        showAlert.btnEl = showAlert.rootEl.querySelector('.modal__actions button');
        showAlert.show = function(text) {
            return new Promise(function (resolve) {
                showAlert.textEl.innerText = text;
                showAlert.rootEl.hidden = false;
                showAlert.btnEl.focus();

                showAlert.btnEl.addEventListener('click', e => {
                    e.preventDefault();

                    showAlert.rootEl.hidden = true;

                    resolve();
                }, {
                    once: true
                });
            });
        };
    }

    if (!showAlert.rootEl.hidden) {
        return showAlert.promise
            .then(() => {
                showAlert.promise = showAlert.show(text);

                return showAlert.promise;
            });
    }

    showAlert.promise = showAlert.show(text);

    return showAlert.promise;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

showAlert('сообщение 1');

delay(1000)
    .then(() => showAlert('сообщение 2'))
    .catch(err => console.error(err));
