"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ast {
}
exports.Ast = Ast;
class Root extends Ast {
    constructor() {
        super(...arguments);
        this.packages = [];
    }
    visit(visitor, context) {
        return visitor.visitRoot(this, context);
    }
}
exports.Root = Root;
class Package extends Ast {
    constructor() {
        super(...arguments);
        this.children = [];
    }
    visit(visitor, context) {
        return visitor.visitPackage(this, context);
    }
    hasChild(name) {
        return !!this.children.find(child => child.name === name);
    }
}
exports.Package = Package;
class Identifier extends Ast {
    visit(visitor, context) {
        return visitor.visitIdentifier(this, context);
    }
}
exports.Identifier = Identifier;
// enum
class Enum extends Ast {
    constructor() {
        super(...arguments);
        this.items = [];
    }
    visit(visitor, context) {
        return visitor.visitEnum(this, context);
    }
}
exports.Enum = Enum;
// enum item
class EnumItem extends Ast {
    visit(visitor, context) {
        return visitor.visitEnumItem(this, context);
    }
}
exports.EnumItem = EnumItem;
// service
class Service extends Ast {
    constructor() {
        super(...arguments);
        this.methods = [];
    }
    visit(visitor, context) {
        return visitor.visitService(this, context);
    }
}
exports.Service = Service;
// method
class Method extends Ast {
    constructor() {
        super(...arguments);
        this.name = ``;
        this.decorator = [];
        this.parameter = ``;
        this.type = ``;
    }
    visit(visitor, context) {
        return visitor.visitMethod(this, context);
    }
}
exports.Method = Method;
// message
class Message extends Ast {
    constructor() {
        super(...arguments);
        this.fields = [];
        this.children = [];
    }
    visit(visitor, context) {
        return visitor.visitMessage(this, context);
    }
}
exports.Message = Message;
// field
class Field extends Ast {
    constructor() {
        super(...arguments);
        this.decorator = [];
    }
    visit(visitor, context) {
        return visitor.visitField(this, context);
    }
}
exports.Field = Field;
class OneOf extends Ast {
    constructor() {
        super(...arguments);
        this.items = [];
    }
    visit(visitor, context) {
        return visitor.visitOneOf(this, context);
    }
}
exports.OneOf = OneOf;
class ParseVisitor {
    visitIdentifier(node, context) {
        return node.name;
    }
    visitPackage(node, context) {
        return `package ${node.name};\nsyntax = "${node.syntax}";\n${node.children.map(pack => pack.visit(this, context)).join(`\n`)}`;
    }
    visitRoot(node, context) {
        return `${node.packages.map(pack => pack.visit(this, context)).join(`\n`)}`;
    }
    visitEnum(node, context) {
        return `enum ${node.name}{\n\t${node.items.map(item => item.visit(this, context)).join(`\n`)}}`;
    }
    visitEnumItem(node, context) {
        return `${node.name} = ${node.value}`;
    }
    visitService(node, context) {
        return `service ${node.name} {\n${node.methods.map(method => method.visit(this, context)).join(``)}}`;
    }
    visitMethod(node, context) {
        return `\t${this.createDecorator(node.decorator)}${node.name}(${node.parameter}) returns(${node.type}) {}\n`;
    }
    visitMessage(node, context) {
        return `message ${node.name}{\n${node.fields.map(field => field.visit(this, context)).join(``)}${node.children.map(child => child.visit(this, context)).join(`\n`)}}`;
    }
    visitField(node, context) {
        return `\t${this.createDecorator(node.decorator)}${node.type} ${node.name} = ${node.index};\n`;
    }
    visitOneOf(node, context) {
        return `oneof ${node.name} {\n\t${node.items.map(item => item.visit(this, context)).join(`\n`)}}`;
    }
    createDecorator(args) {
        if (args.length > 0) {
            return args.join(' ') + ` `;
        }
        return ``;
    }
}
exports.ParseVisitor = ParseVisitor;
//# sourceMappingURL=ast.js.map