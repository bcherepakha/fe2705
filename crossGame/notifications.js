// eslint-disable-next-line no-unused-vars
function createNotification( actionHandler ) {
    const notify = {
        rootEl: document.querySelector('.notification'),
        setText(text) {
            this.titleEl.innerText = text;

            return this;
        },
        show() {
            this.rootEl.hidden = false;

            return this;
        },
        hide() {
            this.rootEl.hidden = true;

            return this;
        }
    };

    notify.titleEl = notify.rootEl.querySelector('.notification__title');
    notify.actionEl = notify.rootEl.querySelector('.notification__action');

    notify.actionEl.addEventListener('click', function() {
        notify.hide();

        if (actionHandler) {
            actionHandler();
        }
    });

    return notify;
}
