export class List {
    constructor( isCompleted ) {
        // this = {}
        // this.__proto__ = List.prototype

        this.isCompleted = isCompleted;
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

    removeItem(removedItem) {
        this.items = this.items.filter(item => item !== removedItem);
        removedItem.remove();

        this.render();
    }

    get size() {
        return this.items.length;
    }

    get completed() {
        return this.items.filter(this.isCompleted).length;
    }

    render() {
        this.rootEl.append(...this.items.map(item => item.render()));
    }
}
