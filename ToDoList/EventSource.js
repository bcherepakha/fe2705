export class EventSource {
    static createEvent(type, target, data) {
        return {
            type,
            target,
            data,
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

    trigger(eventName, data) {
        if (this._handlers[eventName]) {
            this._handlers[eventName]
                .forEach(fn => fn(EventSource.createEvent(eventName, this, data)));
        }
    }
}
