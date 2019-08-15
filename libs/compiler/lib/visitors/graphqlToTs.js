"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const lodash_1 = require("lodash");
const graphql_1 = require("graphql");
class ClientTs extends magnus_graphql_1.ClientVisitor {
    visitVariableAst(node, context) {
        const name = node.name.visit(this, context);
        return name;
    }
    visitNonNullTypeAst(node, context) {
        return {
            required: true,
            type: node.type.visit(this, context)
        };
    }
    visitNamedTypeAst(node, context) {
        return node.name && node.name.visit(this, context);
    }
}
exports.ClientTs = ClientTs;
const client = new ClientTs();
class GraphqlToTs {
    constructor() {
        this.name = `GraphqlToTs`;
        this.types = new Set();
        // visitEnumTypeDefinitionAst(node: EnumTypeDefinitionAst, context: any) { }
    }
    visitDocumentAst(node, context) {
        context += `\n`;
        if (this.config) {
            context += `import { ${this.config.runner.name} } from '${this.config.runner.path}';\n`;
        }
        const res = node.definitions
            .filter(def => !(def instanceof magnus_graphql_1.ast.ScalarTypeDefinitionAst) && !!def)
            .map(def => def.visit(this, ``))
            .join(`\n`);
        const types = [];
        this.types.forEach(t => types.push(t));
        if (this.config) {
            if (types.length > 0) {
                context += `import { ${types.join(", ")} } from '${this.config.types}';\n`;
            }
        }
        context += res;
        return context;
    }
    visitTypeDefinitionAst(node, context) {
        return context;
    }
    visitFieldDefinitionAst(node, context) {
        this.isParameter = false;
        const name = node.name.visit(this, ``);
        const type = node.type.visit(this, ``);
        const parameters = (node.arguments || []).map(arg => {
            this.isParameter = true;
            return arg.visit(this, false);
        });
        let res = ``;
        if (node.description) {
            res += `\t/*`;
            res += node.description.value || ``;
            res += `*/\n`;
        }
        if (this.isProto) {
            if (node.arguments) {
                if (parameters.length > 0) {
                    res += `\t${name}(${parameters.join(",")}): Observable<${type}>;\n`;
                }
                else {
                    res += `\t${name}(): Observable<${type}>;\n`;
                }
            }
            else {
                if (node.type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
                    res += `\t${name}: Observable<${type}>;\n`;
                }
                else {
                    res += `\t${name}?: Observable<${type}>;\n`;
                }
            }
            return res;
        }
        if (this.isGraphql) {
            if (node.arguments) {
                if (parameters.length > 0) {
                    res += `\t${name}<T>(${parameters.join(", ")}, __selection?: string): Promise<T & ${type}>;\n`;
                }
                else {
                    res += `\t${name}<T>(__selection?: string): Promise<T & ${type}>;\n`;
                }
            }
            else {
                if (node.type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
                    res += `\t${name}: Promise<${type}>;\n`;
                }
                else {
                    res += `\t${name}?: Promise<${type}>;\n`;
                }
            }
            return res;
        }
        if (node.arguments) {
            if (parameters.length > 0) {
                res += `\t${name}(${parameters.join(", ")}, __selection?: string): ${type};\n`;
            }
            else {
                res += `\t${name}(__selection?: string): ${type};\n`;
            }
        }
        else {
            if (node.type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
                res += `\t${name}: ${type};\n`;
            }
            else {
                res += `\t${name}?: ${type};\n`;
            }
        }
        return res;
    }
    visitInputValueDefinitionAst(node, context) {
        if (node.name) {
            const name = node.name.visit(this, context);
            const type = node.type.visit(this, context);
            let res = ``;
            if (node.description) {
                res += `/*`;
                res += node.description.value || ``;
                res += `*/`;
            }
            if (this.isParameter) {
                if (node.type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
                    res += `${name}: ${type}`;
                }
                else {
                    res += `${name}?: ${type}`;
                }
                return res;
            }
            if (node.type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
                res += `\t${name}: ${type};\n`;
            }
            else {
                res += `\t${name}?: ${type};\n`;
            }
            return res;
        }
        return ``;
    }
    visitNameAst(node, context) {
        switch (node.value) {
            case "Int":
            case "Int32":
            case "Int64":
                return `number`;
            case "String":
                return `string`;
            case "Boolean":
            case "Bool":
                return "boolean";
            case "Json":
                return "object";
            default:
                return node.value;
        }
    }
    visitNamedTypeAst(node, context) {
        return node.name.visit(this, context);
    }
    visitScalarTypeDefinitionAst(node, context) {
        return node.name.visit(this, context);
    }
    visitObjectTypeDefinitionAst(node, context) {
        const name = node.name.visit(this, ``);
        this.isProto = !!node.isProto || name === "Subscription";
        this.isGraphql = name === "Query" || name === "Mutation";
        if (node.description) {
            context += `/*`;
            context += node.description.value || ``;
            context += `*/\n`;
        }
        context += `export interface ${name} {\n`;
        context += node.fields
            .map(field => {
            return field.visit(this, name === "Proto");
        })
            .join(``);
        context += `}`;
        return context;
    }
    visitNonNullTypeAst(node, context) {
        return node.type.visit(this, ``);
    }
    visitUnionTypeDefinitionAst(node, context) {
        const name = node.name.visit(this, context);
        const types = node.types.map(t => {
            if (t.visit) {
                return t.visit(this, context);
            }
            return t;
        });
        return `type ${name} = ${types.join("|")};`;
    }
    visitInputObjectTypeDefinitionAst(node, context) {
        this.isParameter = false;
        context += `export interface ${node.name.visit(this, ``)} {\n`;
        context += node.fields.map(field => field.visit(this, true)).join(``);
        context += `}`;
        return context;
    }
    visitListTypeAst(node, context) {
        return `${node.type.visit(this, context)}[]`;
    }
    visitEnumTypeDefinitionAst(node, context) {
        if (node.name) {
            return `enum ${node.name.visit(this, context)}{
                ${node.values
                .map(value => value.visit(this, context))
                .join(",\n")}
                }`;
        }
        return ``;
    }
    visitEnumValueDefinitionAst(node, context) {
        return `\t${node.name.visit(this, context)}`;
    }
    visitSelectionSetAst(node, context) {
        return (node.selections.map(selec => selec.visit(this, context)).join(``) + `\n`);
    }
    visitSelectionAst(node, context) {
        if (node instanceof magnus_graphql_1.ast.FieldAst) {
        }
        if (node instanceof magnus_graphql_1.ast.FragmentSpreadAst) {
        }
        if (node instanceof magnus_graphql_1.ast.InlineFragmentAst) {
        }
    }
    createType(type, fileAlias, selectionSet, isArray, context) {
        const ast = this.schema.hasDefinitionAst(type);
        if (ast) {
            if (ast instanceof magnus_graphql_1.ObjectTypeDefinitionAst) {
                return `\t${fileAlias}: {\n${selectionSet.visit(this, {
                    ...context,
                    schema: ast
                })}}${isArray ? "[]" : ""};\n`;
            }
            else {
                if (ast) {
                    if (ast.name) {
                        return `${ast.name.visit(this, ``)}`;
                    }
                }
            }
        }
        switch (type) {
            case "Int":
                return `\t${fileAlias}: number${isArray ? "[]" : ""};\n`;
            case "String":
                return `\t${fileAlias}: string${isArray ? "[]" : ""};\n`;
            case "Boolean":
                return `\t${fileAlias}: boolean${isArray ? "[]" : ""};\n`;
            default:
                debugger;
        }
    }
    getType(node) {
        if (node instanceof magnus_graphql_1.NamedTypeAst) {
            return node.name.value;
        }
        else if (node instanceof magnus_graphql_1.ListTypeAst) {
            return this.getType(node.type);
        }
        else {
            return this.getType(node.type);
        }
    }
    visitFieldAst(node, context) {
        const { alias, name, arguments: args, directives, selectionSet } = node;
        const fieldName = this.visitNameAst(name, ``);
        const schema = context.schema.getFields(fieldName);
        const fieldNlias = (alias || name).visit(this, context);
        if (schema) {
            const type = this.getType(schema.type);
            if (schema.type instanceof magnus_graphql_1.NamedTypeAst) {
                return this.createType(type, fieldNlias, selectionSet, false, context);
            }
            else if (schema.type instanceof magnus_graphql_1.ListTypeAst) {
                return this.createType(type, fieldNlias, selectionSet, true, context);
            }
            else {
                return this.createType(type, fieldNlias, selectionSet, false, context);
            }
        }
        else {
            console.log(`类型错误: ${context.schema.name.value}不存在${fieldName}属性`);
        }
    }
    getSchema(operation) {
        return this.schema.hasDefinitionAst(lodash_1.upperFirst(operation));
    }
    __getType(type) {
        switch (type) {
            case "Int":
                return `number`;
            case "String":
                return `string`;
            case "Boolean":
            case "Bool":
                return `boolean`;
            default:
                this.types.add(type);
                return type;
        }
    }
    visitOperationDefinitionAst(node, context) {
        const clientAst = client.visitOperationDefinitionAst(node, {});
        const operation = node.operation;
        const names = [];
        const parameters = clientAst.variableDefinitions
            .map(variable => {
            let type = ``;
            if (typeof variable.type === "object") {
                const variableType = variable.type;
                if (variableType.required) {
                    type = `: ${this.__getType(variableType.type)}`;
                }
                else {
                    type = `?: ${this.__getType(variableType.type)}`;
                }
            }
            else {
                type = `?: ${this.__getType(variable.type)}`;
            }
            names.push(variable.variable);
            if (variable.defaultValue) {
                return `${variable.variable}${type} = ${variable.defaultValue}`;
            }
            else {
                return `${variable.variable}${type}`;
            }
        })
            .join(`, `);
        const doc = new magnus_graphql_1.ast.DocumentAst();
        doc.definitions.push(node);
        const graphql = graphql_1.print(magnus_graphql_1.toJson(doc));
        const selection = node.selectionSet.visit(this, {
            operation,
            schema: this.getSchema(operation)
        });
        context += `interface ${lodash_1.upperFirst(clientAst.name)}Result {
    ${selection}
}\n`;
        context += `export async function ${clientAst.name}(${parameters}): Promise<${lodash_1.upperFirst(clientAst.name)}Result> {
    const names = ${JSON.stringify(names)};
    const args: any = {};
    for (let i = 0; i < arguments.length; i++) {
        args[names[i]] = arguments[i]
    }
    return ${this.config.runner.name}<${lodash_1.upperFirst(clientAst.name)}Result>(\`${graphql}\`, args)
}\n`;
        return context;
    }
}
exports.GraphqlToTs = GraphqlToTs;
//# sourceMappingURL=graphqlToTs.js.map