export class EventSource {
    constructor() {
        this._events = {};
    }

    addEventListener(eventName, eventCallback) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }

        this._events[eventName].push(eventCallback);
    }

    removeEventListener(eventName, eventCallback) {
        if (!this._events[eventName]) {
            return ;
        }

        this._events[eventName] = this._events[eventName]
            .filter(callback => callback !== eventCallback);
    }

    trigger(eventName, data) {
        if (!this._events[eventName]) {
            return ;
        }

        this._events[eventName].forEach(eventCallback => {
            eventCallback({
                target: this,
                data,
                type: eventName
            });
        });
    }
}
