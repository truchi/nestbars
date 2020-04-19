"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name = (keys) => keys.join(':');
class Data {
    constructor() {
        this.data = {};
    }
    set(data, ...keys) {
        this.data[name(keys)] = data;
    }
    get(...keys) {
        return this.data[name(keys)];
    }
    empty() {
        this.data = {};
    }
}
exports.Data = Data;
//# sourceMappingURL=Data.js.map