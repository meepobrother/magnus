"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
/**
 * 执行
 * @param server
 * @param client
 * @param variables
 */
function exec(server, client, variables) {
    const serverAst = parse_1.parse(server);
    const clientAst = parse_1.parse(client);
    const execVisitor = new ExecVisitor();
    const context = new ExecContext();
    clientAst.visit(execVisitor, context);
    debugger;
}
exports.exec = exec;
class ExecContext {
    constructor() {
        this.errors = [];
        this.variables = {};
    }
}
exports.ExecContext = ExecContext;
class ExecVisitor {
    constructor() {
        this.name = `ExecVisitor`;
    }
    visitDocumentAst(node, context) {
        const definitions = node.definitions.map(def => def.visit(this, context));
        debugger;
    }
    createVariables(vars, context) {
        const res = {};
        vars.map(vari => {
            const result = vari.visit(this, context);
            const { variable, defaultValue } = result;
            const { name } = variable;
            result.value = context.variables[name] || defaultValue;
            res[`${name}`] = result;
        });
        return res;
    }
    createDirectives(vars, context) {
        const res = {};
        vars.map(v => {
            const result = this.visitDirectiveAst(v, context);
            const { name } = result;
            res[name] = result;
        });
        return res;
    }
    createInputValueDefinition(nodes, context) {
        const res = {};
        nodes.map(node => {
            const ast = node.visit(this, context);
            debugger;
        });
        return res;
    }
    visitDirectiveDefinitionAst(node, context) {
        const description = node.description.visit(this, context);
        const name = node.name.visit(this, context);
        const args = this.createInputValueDefinition(node.arguments, context);
        const locations = node.locations.map(loc => loc.visit(this, context));
        return {
            description,
            name,
            args,
            locations
        };
    }
    visitOperationDefinitionAst(node, context) {
        const name = node.name && node.name.visit(this, context);
        const variableDefinitions = this.createVariables(node.variableDefinitions, context);
        const directives = this.createDirectives(node.directives, context);
        const selectionSet = node.selectionSet && node.selectionSet.visit(this, context);
        return {
            name,
            variableDefinitions,
            selectionSet,
            directives,
            operation: node.operation
        };
    }
    visitSelectionSetAst(node, context) {
        const res = {};
        node.selections.map(sele => {
            const result = sele.visit(this, context);
            res[result.name] = result;
        });
        return res;
    }
    createArgument(nodes, context) {
        const res = {};
        nodes.map(node => {
            const ast = node.visit(this, context);
            res[ast.name] = ast;
        });
        return res;
    }
    visitFieldAst(node, context) {
        const alias = node.alias && node.alias.visit(this, context);
        const name = node.name && node.name.visit(this, context);
        const args = this.createArgument(node.arguments, context);
        const directives = this.createDirectives(node.directives, context);
        const selectionSet = node.selectionSet && node.selectionSet.visit(this, context);
        return {
            alias,
            name,
            args,
            directives,
            selectionSet
        };
    }
    visitNameAst(node, context) {
        return node.value;
    }
    visitArgumentAst(node, context) {
        const name = node.name.visit(this, context);
        const value = node.value.visit(this, context);
        return {
            name,
            value
        };
    }
    visitVariableAst(node, context) {
        const name = node.name.visit(this, context);
        return {
            name,
            kind: 'Variable'
        };
    }
    visitIntValueAst(node, context) {
        return node.value;
    }
    visitBooleanValueAst(node, context) {
        return node.value;
    }
    visitDirectiveAst(node, context) {
        const name = node.name.visit(this, context);
        const args = this.createArgument(node.arguments, context);
        return {
            name,
            args
        };
    }
    visitVariableDefinitionAst(node, context) {
        const defaultValue = node.defaultValue && node.defaultValue.visit(this, context);
        const directives = this.createDirectives(node.directives, context);
        const type = node.type && node.type.visit(this, context);
        const variable = node.variable && node.variable.visit(this, context);
        return {
            defaultValue,
            directives,
            type,
            variable,
            value: undefined
        };
    }
    visitNonNullTypeAst(node, context) {
        const type = node.type.visit(this, context);
        return {
            type,
            kind: `NonNullType`
        };
    }
    visitListTypeAst(node, context) {
        const type = node.type.visit(this, context);
        return {
            type,
            kind: `ListType`
        };
    }
    visitNamedTypeAst(node, context) {
        return node.name.visit(this, context);
    }
}
exports.ExecVisitor = ExecVisitor;
//# sourceMappingURL=exec.js.map