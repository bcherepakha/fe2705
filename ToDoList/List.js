export class List {
    constructor() {
        // this = {}
        // this.__proto__ = List.prototype

        this.rootEl = document.querySelector('.todo-list');
        this.items = [];

        this.clear();

        // return this;
    }

    clear() {
        this.rootEl.innerText = '';
    }

    addItems(items) {
        this.items = [...this.items, ...items];

        this.render();
    }

    addItem(item) {
        this.addItems([item]);
    }

    render() {
        this.rootEl.append(...this.items.map(item => item.render()));
    }
}
