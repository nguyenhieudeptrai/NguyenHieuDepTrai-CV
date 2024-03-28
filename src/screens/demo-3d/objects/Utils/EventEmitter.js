export default class EventEmitter {

    static instance;

    constructor() {
        if (EventEmitter.instance) {
            return EventEmitter.instance;
        }
        this.events = {};
    }

    _getEventListByName(eventName) {
        if (typeof this.events[eventName] === 'undefined') {
            this.events[eventName] = new Set();
        }
        return this.events[eventName];
    }

    on(eventName, fn) {
        this._getEventListByName(eventName).add(fn);
    }

    once(eventName, fn) {
        const self = this;

        const onceFn = (...args) => {
            self.removeListener(eventName, onceFn);
            fn.apply(self, args);
        };
        this.on(eventName, onceFn);
    }

    emit(eventName, ...args) {
        this._getEventListByName(eventName).forEach(
            function (fn) {
                fn.apply(this, args);
            }.bind(this)
        );
    }

    removeListener(eventName, fn) {
        this._getEventListByName(eventName).delete(fn);
    }
}