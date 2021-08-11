export class Counter {
    constructor() {
        this.rootEl = document.querySelector('.todo-count');
        this.itemsCountEl = this.rootEl.querySelector('strong:first-child');
        this.completedCountEl = this.rootEl.querySelector('strong:last-child');
    }

    setValue(itemsCount, completedCount) {
        this.itemsCountEl.innerText = itemsCount;
        this.completedCountEl.innerText = completedCount;
    }
}
