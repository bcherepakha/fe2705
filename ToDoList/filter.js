import { EventSource } from './EventSource.js';

const SELECTED = 'selected';

export class Filter extends EventSource {
    constructor() {
        super();

        this.rootEl = document.querySelector('.filters');
        this.linksCol = Array.from(this.rootEl.querySelectorAll('a'));
        this.availableFilters = this.linksCol.map(linkEl => linkEl.hash);

        let currentFilter = location.hash;
        const selectedLink = this.linksCol.find(linkEl => linkEl.classList.contains(SELECTED));

        this.setCurrentFilter(
            currentFilter && this.isAvailable(currentFilter)
                ? currentFilter
                : selectedLink && selectedLink.hash
        );

        window.addEventListener('hashchange', this.onHashChange.bind(this));
    }

    isAvailable(value) {
        return this.availableFilters.includes(value);
    }

    getFilterValue(value) {
        if (this.isAvailable(value)) {
            return value;
        }

        return this.availableFilters[0];
    }

    setCurrentFilter(value) {
        this.currentFilter = this.getFilterValue(value);

        this.linksCol.forEach(linkEl => {
            if (linkEl.hash === this.currentFilter) {
                linkEl.classList.add(SELECTED);
            } else {
                linkEl.classList.remove(SELECTED);
            }
        });

        location.hash = this.currentFilter;

        this.trigger('change');
    }

    onHashChange() {
        if (location.hash !== this.currentFilter && this.isAvailable(location.hash)) {
            this.setCurrentFilter(location.hash);
        }
    }
}
