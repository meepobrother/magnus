"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
exports.a = 1;
const b = 2;
exports.b = b;
exports.c = b;
tslib_1.__exportStar(require("./1"), exports);
var typescript_1 = require("typescript");
exports.ScriptKind = typescript_1.ScriptKind;
exports.default = {
    a: exports.a,
    c: exports.a,
    b: 2,
    e: 1 + 1
};
var Items;
(function (Items) {
    Items[Items["TITLE"] = 0] = "TITLE";
    Items[Items["DEMO"] = 1] = "DEMO";
})(Items = exports.Items || (exports.Items = {}));
class AbstractCore {
    add(a, b) {
        return a + b;
    }
}
exports.AbstractCore = AbstractCore;
class Core extends AbstractCore {
    dec(a, b) {
        return a - b;
    }
}
exports.Core = Core;
//# sourceMappingURL=index.js.map