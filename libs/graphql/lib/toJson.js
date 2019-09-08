"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toJson(node) {
    const visitor = new ToJsonVisitor();
    return node.visit(visitor, {});
}
exports.toJson = toJson;
class ToJsonVisitor {
    constructor() {
        this.name = `ToJsonVisitor`;
    }
    visitTypeDefinitionAst(node, context) {
        return node.visit(this, context);
    }
    visitDefinitionAst(node, context) {
        return node.visit(this, context);
    }
    visitObjectFieldAst(node, context) {
        return {
            kind: "ObjectField",
            name: node.name && node.name.visit(this, context),
            value: node.value && node.value.visit(this, context)
        };
    }
    visitorTypeDefinitionAst(node, context) {
        return node.visit(this, context);
    }
    visitorDefinitionAst(node, context) {
        return node.visit(this, context);
    }
    visitTypeSystemDefinitionAst(node, context) {
        return node.visit(this, context);
    }
    visitExecutableDefinitionAst(node, context) {
        return node.visit(this, context);
    }
    visitSchemaExtensionNode(node, context) {
        return {
            kind: "SchemaDefinition",
            directives: node.directives.map(dir => dir.visit(this, context)),
            operationTypes: node.operationTypes.map(oper => oper.visit(this, context))
        };
    }
    visitTypeExtensionNode(node, context) {
        return node.visit(this, context);
    }
    visitTypeSystemExtensionNode(node, context) {
        return node.visit(this, context);
    }
    visitDocumentAst(node, context) {
        return {
            kind: "Document",
            definitions: node.definitions
                .filter(node => !!node)
                .map(def => {
                return def.visit(this, context);
            })
        };
    }
    visitVariableAst(node, context) {
        return {
            kind: "Variable",
            name: node.name && node.name.visit(this, context)
        };
    }
    visitIntValueAst(node, context) {
        return {
            kind: "IntValue",
            value: `${node.value}`
        };
    }
    visitFloatValueAst(node, context) {
        return {
            kind: "FloatValue",
            value: `${node.value}`
        };
    }
    visitStringValueAst(node, context) {
        return {
            kind: "StringValue",
            value: node.value,
            block: node.block
        };
    }
    visitBooleanValueAst(node, context) {
        return {
            kind: "BooleanValue",
            value: node.value
        };
    }
    visitNullValueAst(node, context) {
        return {
            kind: "NullValue"
        };
    }
    visitEnumValueAst(node, context) {
        return {
            kind: "EnumValue",
            value: node.value
        };
    }
    visitListValueAst(node, context) {
        return {
            kind: "ListValue",
            values: node.values.map(value => value.visit(this, context))
        };
    }
    visitObjectValueAst(node, context) {
        return {
            kind: "ObjectValue",
            fields: node.fields.map(field => field.visit(this, context))
        };
    }
    visitAstVisitor(node, context) {
        return {
            kind: "ObjectField",
            name: node.name && node.name.visit(this, context),
            value: node.value.visit(this, context)
        };
    }
    visitUnionTypeExtensionAst(node, context) {
        return {
            kind: "UnionTypeExtension",
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(directive => directive.visit(this, context))
        };
    }
    visitScalarTypeExtensionAst(node, context) {
        return {
            kind: "ScalarTypeExtension",
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dire => dire.visit(this, context))
        };
    }
    visitObjectTypeExtensionAst(node, context) {
        return {
            kind: "ObjectTypeExtension",
            name: node.name && node.name.visit(this, context),
            interfaces: node.interfaces.map(int => int.visit(this, context))
        };
    }
    visitNamedTypeAst(node, context) {
        const name = node.name && node.name.visit(this, context);
        return {
            kind: "NamedType",
            name
        };
    }
    visitInterfaceTypeExtensionAst(node, context) {
        return {
            kind: "InterfaceTypeExtension",
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dire => dire.visit(this, context)),
            fields: node.fields.map(field => field.visit(this, context))
        };
    }
    visitFieldDefinitionAst(node, context) {
        try {
            const name = node.name && node.name.visit(this, context);
            const item = {
                kind: "FieldDefinition",
                description: node.description && node.description.visit(this, context),
                name,
                arguments: node.arguments && node.arguments.map(arg => arg.visit(this, context)),
                type: node.type && node.type.visit(this, context),
                directives: node.directives.map(dir => dir.visit(this, context))
            };
            return item;
        }
        catch (e) {
            throw e;
        }
    }
    visitInputValueDefinitionAst(node, context) {
        return {
            kind: "InputValueDefinition",
            description: node.description && node.description.visit(this, context),
            name: node.name && node.name.visit(this, context),
            type: node.type && node.type.visit(this, context),
            defaultValue: node.defaultValue && node.defaultValue.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context))
        };
    }
    visitEnumTypeExtensionAst(node, context) {
        return {
            kind: "EnumTypeExtension",
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context)),
            values: node.values && node.values.map(val => val.visit(this, context))
        };
    }
    visitEnumValueDefinitionAst(node, context) {
        return {
            kind: "EnumValueDefinition",
            description: node.description && node.description.visit(this, context),
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context))
        };
    }
    visitInputObjectTypeExtensionAst(node, context) {
        return {
            kind: "InputObjectTypeExtension",
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context)),
            fields: node.fields.map(field => field.visit(this, context))
        };
    }
    visitOperationDefinitionAst(node, context) {
        return {
            kind: "OperationDefinition",
            operation: node.operation,
            name: node.name && node.name.visit(this, context),
            variableDefinitions: node.variableDefinitions.map(variable => variable.visit(this, context)),
            directives: node.directives.map(dir => dir.visit(this, context)),
            selectionSet: node.selectionSet.visit(this, context)
        };
    }
    visitFieldAst(node, context) {
        return {
            kind: "Field",
            alias: node.alias && node.alias.visit(this, context),
            name: node.name && node.name.visit(this, context),
            arguments: node.arguments.map(arg => arg.visit(this, context)),
            directives: node.directives.map(dir => dir.visit(this, context)),
            selectionSet: node.selectionSet && node.selectionSet.visit(this, context)
        };
    }
    visitFragmentSpreadAst(node, context) {
        return {
            kind: "FragmentSpread",
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context))
        };
    }
    visitInlineFragmentAst(node, context) {
        return {
            kind: "InlineFragment",
            typeCondition: node.typeCondition.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context)),
            selectionSet: node.selectionSet.visit(this, context)
        };
    }
    visitVariableDefinitionAst(node, context) {
        return {
            kind: "VariableDefinition",
            variable: node.variable && node.variable.visit(this, context),
            type: node.type && node.type.visit(this, context),
            defaultValue: node.defaultValue && node.defaultValue.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context))
        };
    }
    visitSelectionSetAst(node, context) {
        return {
            kind: "SelectionSet",
            selections: node.selections.map(sel => sel.visit(this, context))
        };
    }
    visitFragmentDefinitionAst(node, context) {
        return {
            kind: "FragmentDefinition",
            name: node.name && node.name.visit(this, context),
            variableDefinitions: node.variableDefinitions.map(variable => variable.visit(this, context)),
            typeCondition: node.typeCondition && node.typeCondition.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context)),
            selectionSet: node.selectionSet && node.selectionSet.visit(this, context)
        };
    }
    visitSchemaDefinitionAst(node, context) {
        return {
            kind: "SchemaDefinition",
            directives: node.directives.map(dir => dir.visit(this, context)),
            operationTypes: node.operationTypes.map(t => t.visit(this, context))
        };
    }
    visitOperationTypeDefinitionAst(node, context) {
        return {
            kind: "OperationTypeDefinition",
            operation: node.operation,
            type: node.type && node.type.visit(this, context)
        };
    }
    visitDirectiveDefinitionAst(node, context) {
        return {
            kind: "DirectiveDefinition",
            description: node.description && node.description.visit(this, context),
            name: node.name && node.name.visit(this, context),
            arguments: node.arguments.map(arg => arg.visit(this, context)),
            locations: node.locations.map(loc => loc.visit(this, context)),
            repeatable: true
        };
    }
    visitScalarTypeDefinitionAst(node, context) {
        return {
            kind: "ScalarTypeDefinition",
            description: node.description && node.description.visit(this, context),
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context))
        };
    }
    visitObjectTypeDefinitionAst(node, context) {
        try {
            return {
                kind: "ObjectTypeDefinition",
                description: node.description && node.description.visit(this, context),
                name: node.name && node.name.visit(this, context),
                interfaces: node.interfaces &&
                    node.interfaces.map(int => int.visit(this, context)),
                directives: node.directives &&
                    node.directives.map(dir => dir.visit(this, context)),
                fields: node.fields && node.fields.map(field => field.visit(this, context))
            };
        }
        catch (e) {
            throw e;
        }
    }
    visitInterfaceTypeDefinitionAst(node, context) {
        return {
            kind: "InterfaceTypeDefinition",
            description: node.description && node.description.visit(this, context),
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context)),
            fields: node.fields.map(field => field.visit(this, context))
        };
    }
    visitUnionTypeDefinitionAst(node, context) {
        return {
            kind: "UnionTypeDefinition",
            description: node.description && node.description.visit(this, context),
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context)),
            types: (node.types || [])
                .map(type => {
                if (type.visit)
                    return type.visit(this, context);
            })
                .filter(res => !!res)
        };
    }
    visitEnumTypeDefinitionAst(node, context) {
        return {
            kind: "EnumTypeDefinition",
            description: node.description && node.description.visit(this, context),
            name: node.name && node.name.visit(this, context),
            directives: node.directives.map(dir => dir.visit(this, context)),
            values: node.values.map(val => val.visit(this, context))
        };
    }
    visitInputObjectTypeDefinitionAst(node, context) {
        try {
            return {
                kind: "InputObjectTypeDefinition",
                description: node.description && node.description.visit(this, context),
                name: node.name && node.name.visit(this, context),
                directives: node.directives.map(dir => dir.visit(this, context)),
                fields: node.fields.map(field => field.visit(this, context))
            };
        }
        catch (e) {
            throw e;
        }
    }
    visitSchemaExtensionAst(node, context) {
        return {
            kind: "SchemaExtension",
            directives: node.directives.map(dire => dire.visit(this, context)),
            operationTypes: node.operationTypes.map(type => type.visit(this, context))
        };
    }
    visitNameAst(node, context) {
        let name = ``;
        if (typeof node.value === "string") {
            name = node.value;
        }
        else {
            console.log(node.value);
        }
        return {
            kind: "Name",
            value: name
        };
    }
    visitListTypeAst(node, context) {
        return {
            kind: "ListType",
            type: node.type && node.type.visit(this, context)
        };
    }
    visitNonNullTypeAst(node, context) {
        return {
            kind: "NonNullType",
            type: node.type && node.type.visit(this, context)
        };
    }
    visitArgumentAst(node, context) {
        return {
            kind: "Argument",
            name: node.name && node.name.visit(this, context),
            value: node.value && node.value.visit(this, context)
        };
    }
    visitDirectiveAst(node, context) {
        return {
            kind: "Directive",
            name: node.name && node.name.visit(this, context),
            arguments: node.arguments.map(arg => arg.visit(this, context))
        };
    }
}
exports.ToJsonVisitor = ToJsonVisitor;
//# sourceMappingURL=toJson.js.map