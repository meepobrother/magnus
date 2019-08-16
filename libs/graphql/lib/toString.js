"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ToString {
    constructor() {
        this.name = `ToString`;
    }
    visitNonNullTypeAst(node, context) {
        return `${node.type.visit(this, context)}!`;
    }
    visitListTypeAst(node, context) {
        return `[${node.type.visit(this, context)}]`;
    }
    visitNameAst(node, context) {
        return node.value;
    }
    visitNamedTypeAst(node, context) {
        return node.name.visit(this, context);
    }
}
exports.ToString = ToString;
//# sourceMappingURL=toString.js.map