class TimeoutSet extends Set {
    constructor(iterable, options) {
        super();
        this._timeouts = {};
        this.configure(options, true);
        for (const element of iterable) this.add(element);
    }
    configure(options, reset=false) {
        if (reset) {
            this._config = {
                // how long until called
                timeout: null,
                // delete value before callback?
                autodelete: true,
                // what is called
                handler: () => {},
                // minimum time interval between timeouts
                margin: 0,
                // additional arguments in callback
                additional_arguments: [],
            };
        }
        Object.assign(this._config, options);
    }
    add(value, options) {
        if (!options) {
            options = this._config;
        }
        else {
            options = Object.assign(Object.assign({}, this._config), options);
        }
        this._set_timeout(value, options);
        return super.add(value);
    }
    delete(value) {
        this._clear_timeout(value);
        return super.delete(value);
    }
    clear() {
        for (let key in this._timeouts) {
            if (this._timeouts.hasOwnProperty(key)) {
                this._clear_timeout(key);
            }
        }
        return super.clear();
    }
    size_timeout() {
        return Object.keys(this._timeouts).length;
    }
    _clear_timeout(value) {
        let timeout = this._timeouts[value];
        delete this._timeouts[value];
        if (timeout != null) {
            clearTimeout(timeout);
            return true;
        }
        return false;
    }
    _set_timeout(value, config) {
        this._clear_timeout(value);
        if (config.timeout == null || config.timeout === Infinity) return;

        let timeout = config.timeout;
        if (config.margin) timeout += config.margin - (timeout % config.margin);

        this._timeouts[value] = setTimeout(() => {
            if (config.autodelete) this.delete(value);
            else this._clear_timeout(value);
            config.handler(value, this, ...config.additional_arguments);
        }, timeout);
    }
}

module.exports = TimeoutSet;
