"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("./ast"));
class ClientVisitor {
    constructor() {
        this.name = `ClientVisitor`;
    }
    visitFieldAst(node, context) {
        const alias = node.alias && node.alias.visit(this, context);
        const args = {};
        node.arguments.map(arg => {
            const argument = this.visitArgumentAst(arg, context);
            args[argument.name] = argument.value;
        });
        const directives = {};
        node.directives.map(dir => {
            const dir2 = this.visitDirectiveAst(dir, context);
            directives[dir2.name] = dir2;
        });
        const name = node.name && node.name.visit(this, context);
        const selectionSet = node.selectionSet && node.selectionSet.visit(this, context);
        return {
            alias,
            args,
            directives,
            name,
            selectionSet,
            type: 'FieldJson'
        };
    }
    visitDocumentAst(node, context) {
        const definitions = node.definitions.map(de => de.visit(this, context));
        return definitions;
    }
    visitDirectiveAst(node, context) {
        const name = this.visitNameAst(node.name, context);
        const args = {};
        node.arguments.map(arg => {
            const argument = this.visitArgumentAst(arg, context);
            args[argument.name] = argument;
        });
        return {
            name,
            args
        };
    }
    createDirectives(nodes, context) {
        const directives = {};
        nodes.map(dire => {
            const dir = this.visitDirectiveAst(dire, context);
            directives[dir.name] = dir;
        });
        return directives;
    }
    visitOperationDefinitionAst(node, context) {
        const name = node.name && node.name.visit(this, context);
        const operation = node.operation;
        const selections = node.selectionSet && node.selectionSet.visit(this, context);
        const variableDefinitions = node.variableDefinitions.map(def => def.visit(this, context));
        return {
            directives: this.createDirectives(node.directives, context),
            name,
            operation,
            selections,
            variableDefinitions
        };
    }
    visitSelectionSetAst(node, context) {
        const res = {};
        node.selections.map(sel => {
            const selection = this.visitSelectionAst(sel, context);
            res[selection.name] = selection;
        });
        return res;
    }
    visitSelectionAst(node, context) {
        if (node instanceof ast.FieldAst) {
            return this.visitFieldAst(node, context);
        }
        else if (node instanceof ast.FragmentSpreadAst) {
            return this.visitFragmentSpreadAst(node, context);
        }
        else {
            return this.visitInlineFragmentAst(node, context);
        }
    }
    visitFragmentSpreadAst(node, context) {
        const name = node.name.visit(this, context);
        const directives = this.createDirectives(node.directives, context);
        return {
            name, directives, type: 'FragmentSpread'
        };
    }
    visitInlineFragmentAst(node, context) {
        const typeCondition = this.visitNamedTypeAst(node.typeCondition, context);
        const directives = this.createDirectives(node.directives, context);
        const selectionSet = this.visitSelectionSetAst(node.selectionSet, context);
        return {
            name: typeCondition,
            directives,
            selectionSet,
            type: 'InlineFragment'
        };
    }
    visitArgumentAst(node, context) {
        const name = node.name.visit(this, context);
        const value = node.value.visit(this, context);
        return {
            name,
            value
        };
    }
    visitBooleanValueAst(node, context) {
        return node.value;
    }
    visitStringValueAst(node, context) {
        return node.value;
    }
    visitNameAst(node, context) {
        return node.value;
    }
    visitIntValueAst(node, context) {
        return node.value;
    }
    visitVariableDefinitionAst(node, context) {
        const variable = node.variable && node.variable.visit(this, context);
        const type = node.type && node.type.visit(this, context);
        const defaultValue = node.defaultValue && node.defaultValue.visit(this, context);
        return {
            variable,
            type,
            directives: this.createDirectives(node.directives, context),
            defaultValue
        };
    }
    visitVariableAst(node, context) {
        const name = node.name.visit(this, context);
        return context[name];
    }
    visitNonNullTypeAst(node, context) {
        return node.type.visit(this, context);
    }
    visitNamedTypeAst(node, context) {
        return node.name && node.name.visit(this, context);
    }
    visitObjectValueAst(node, context) {
        const res = {};
        node.fields.map(field => field.visit(this, res));
        return res;
    }
    visitObjectFieldAst(node, context) {
        context[node.name.visit(this, context)] = node.value.visit(this, context);
    }
    visitListValueAst(node, context) {
        return node.values.map(val => val.visit(this, context));
    }
}
exports.ClientVisitor = ClientVisitor;
//# sourceMappingURL=client.js.map