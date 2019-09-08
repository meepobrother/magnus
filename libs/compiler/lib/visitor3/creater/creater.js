"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scalarCreater_1 = require("./scalarCreater");
const entityCreater_1 = require("./entityCreater");
const directiveCreater_1 = require("./directiveCreater");
const magnusCreater_1 = require("./magnusCreater");
class Creater {
    createScalar(node, context) {
        const creater = new scalarCreater_1.ScalarCreater();
        creater.collection = this.collection;
        creater.documentAst = this.documentAst;
        return creater.createName(node, context);
    }
    createEntity(node, context) {
        const creater = new entityCreater_1.EntityCreater();
        creater.collection = this.collection;
        creater.documentAst = this.documentAst;
        return creater.createName(node, context);
    }
    createDirective(node, context) {
        const creater = new directiveCreater_1.DirectiveCreater();
        creater.collection = this.collection;
        creater.documentAst = this.documentAst;
        return creater.createName(node, context);
    }
    createMagnus(node, context) {
        const creater = new magnusCreater_1.MagnusCreater();
        creater.collection = this.collection;
        creater.documentAst = this.documentAst;
        return creater.createName(node, context);
    }
}
exports.Creater = Creater;
//# sourceMappingURL=creater.js.map