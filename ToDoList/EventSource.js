export class EventSource {
    static createEvent(type, target) {
        return {
            type,
            target,
            createdAt: Date.now()
        };
    }

    constructor() {
        this._handlers = {};
    }

    addEventListener(eventName, eventHandler) {
        if (!this._handlers[eventName]) {
            this._handlers[eventName] = [];
        }

        this._handlers[eventName].push(eventHandler);
    }

    removeEventListener(eventName, eventHandler) {
        if (this._handlers[eventName]) {
            this._handlers[eventName] = this._handlers[eventName]
                .filter(fn => fn !== eventHandler);
        }
    }

    trigger(eventName) {
        if (this._handlers[eventName]) {
            this._handlers[eventName]
                .forEach(fn => fn(EventSource.createEvent(eventName, this)));
        }
    }
}
