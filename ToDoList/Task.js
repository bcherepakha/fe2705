import { EventSource } from './EventSource.js';

// extends
/**
 * Task.prototype.__proto__ = EventSource.prototype
 */

export class Task extends EventSource {
    constructor(data) {
        super();

        // this.__proto__ = Task.prototype;
        this.data = data;

        this.createElements();
    }

    createElements() {
        const rootEl = document.createElement('li');
        const viewEl = document.createElement('div');
        const changeEl = document.createElement('form');
        const toggleEl = document.createElement('input');
        const viewTextEl = document.createElement('span');
        const destroyBtn = document.createElement('button');
        const editTextEl = document.createElement('input');
        const editSubmitEl = document.createElement('button');

        rootEl.append(viewEl, changeEl);
        viewEl.append(toggleEl, viewTextEl, destroyBtn);
        changeEl.append(editTextEl, editSubmitEl);

        toggleEl.type = 'checkbox';
        toggleEl.className = 'toggle';
        destroyBtn.className = 'destroy';
        viewTextEl.innerText = this.data.text;

        editTextEl.className = 'edit';
        editSubmitEl.classList.add('visually-hidden');
        editSubmitEl.type = 'submit';
        editSubmitEl.innerText = 'Изменить';

        destroyBtn.addEventListener('click', this.destroy.bind(this));

        this.changeEl = changeEl;
        this.viewEl = viewEl;
        this.rootEl = rootEl;
    }

    destroy() {
        this.trigger('destroy');
    }

    render() {
        return this.rootEl;
    }
}
