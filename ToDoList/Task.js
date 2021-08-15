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
        this.edit = false;
        this._clickCount = 0;
        this._dbClickTime = 500;
        this._dbClickTimeout = null;

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

        viewEl.className = 'view';
        toggleEl.type = 'checkbox';
        toggleEl.className = 'toggle';
        destroyBtn.className = 'destroy';

        editTextEl.className = 'edit';
        editSubmitEl.classList.add('visually-hidden');
        editSubmitEl.type = 'submit';
        editSubmitEl.innerText = 'Изменить';

        destroyBtn.addEventListener('click', this.destroy.bind(this));
        toggleEl.addEventListener('change', this.toggleCompleted.bind(this));
        viewTextEl.addEventListener('click', this.toggleEditHandler.bind(this));
        changeEl.addEventListener('submit', this.submitHandler.bind(this));

        this.editTextEl = editTextEl;
        this.toggleEl = toggleEl;
        this.viewTextEl = viewTextEl;
        this.changeEl = changeEl;
        this.viewEl = viewEl;
        this.rootEl = rootEl;
    }

    submitHandler(e) {
        e.preventDefault();
        const { value: newText } = this.editTextEl;
        const newData = {
            ...this.data,
            text: newText.trim()
        };

        if (newData.text) {
            this.changeData(newData);
            this.toggleEdit(false);
            this.trigger('changeText', newData);
        }
    }

    toggleEdit(editable = !this.edit) {
        this.edit = editable;

        this.render();
    }

    toggleEditHandler() {
        this._clickCount++;
        // console.log('click', this._clickCount);

        if (this._clickCount === 2) {
            // console.log('dbClick');
            this.toggleEdit();

            if (this._dbClickTimeout) {
                clearTimeout(this._dbClickTimeout);
                this._dbClickTimeout = null;
            }

            this._clickCount = 0;
        } else {
            this._dbClickTimeout = setTimeout(() => {
                // console.log('reset this._clickCount');
                this._clickCount = Math.max(0, this._clickCount - 1);
            }, this._dbClickTime);
        }
    }

    toggleCompleted() {
        this.trigger('toggleCompleted');
    }

    destroy() {
        this.trigger('destroy');
    }

    remove() {
        this.rootEl.remove();
    }

    changeData(newData) {
        this.data = newData;
        this.render();
    }

    setVisibility(visibility) {
        this.rootEl.hidden = !visibility;
    }

    render() {
        this.editTextEl.value = this.data.text;
        this.toggleEl.checked = this.data.completed;
        this.viewTextEl.innerText = this.data.text;

        if (this.data.completed) {
            this.rootEl.classList.add('completed');
        } else {
            this.rootEl.classList.remove('completed');
        }

        if (this.edit) {
            this.rootEl.classList.add('editing');
        } else {
            this.rootEl.classList.remove('editing');
        }

        return this.rootEl;
    }
}
