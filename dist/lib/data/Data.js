"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Data {
    constructor() {
        this.data = {};
    }
    set(name, data) {
        this.data[name] = data;
    }
    get(name) {
        return this.data[name];
    }
    empty() {
        this.data = {};
    }
}
exports.Data = Data;
//# sourceMappingURL=Data.js.map