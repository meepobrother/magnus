"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ast {
}
exports.Ast = Ast;
class SchemaExtensionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitSchemaExtensionAst) {
            return visitor.visitSchemaExtensionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitSchemaExtensionAst`);
        }
    }
    copy() {
        const ast = new SchemaExtensionAst();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.operationTypes = this.operationTypes.map(o => o.copy());
        return ast;
    }
}
exports.SchemaExtensionAst = SchemaExtensionAst;
class DocumentAst extends Ast {
    constructor() {
        super(...arguments);
        this.definitions = [];
        this.protos = [];
    }
    visit(visitor, context) {
        if (visitor.visitDocumentAst) {
            return visitor.visitDocumentAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitDocumentAst`);
        }
    }
    getDefinitionAstIndex(name) {
        return this.definitions.findIndex(def => {
            if (def instanceof OperationDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof FragmentDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof SchemaDefinitionAst) {
                return false;
            }
            else if (def instanceof ScalarTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof ObjectTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof InterfaceTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof UnionTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof EnumTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof InputObjectTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof DirectiveDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof SchemaExtensionAst) {
                return false;
            }
            else {
                if (def && def.name) {
                    console.log(`hasDefinitionAst`, def.name.value);
                }
                return false;
                // return def.name.value === name;
            }
        });
    }
    hasDefinitionAst(name) {
        return this.definitions.find((def) => {
            if (def instanceof OperationDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof FragmentDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof SchemaDefinitionAst) {
                return false;
            }
            else if (def instanceof ScalarTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof ObjectTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof InterfaceTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof UnionTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof EnumTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof InputObjectTypeDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof DirectiveDefinitionAst) {
                return def.name.value === name;
            }
            else if (def instanceof SchemaExtensionAst) {
                return false;
            }
            else {
                if (def && def.name) {
                    console.log(`hasDefinitionAst`, def.name.value);
                }
                return false;
            }
        });
    }
    copy() {
        const ast = new DocumentAst();
        return ast;
    }
}
exports.DocumentAst = DocumentAst;
class VariableAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitVariableAst) {
            return visitor.visitVariableAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitVariableAst`);
        }
    }
    copy() {
        const ast = new VariableAst();
        ast.name = this.name.copy();
        return ast;
    }
}
exports.VariableAst = VariableAst;
class IntValueAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitIntValueAst) {
            return visitor.visitIntValueAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitIntValueAst`);
        }
    }
    copy() {
        const ast = new IntValueAst();
        ast.value = this.value;
        return ast;
    }
}
exports.IntValueAst = IntValueAst;
class FloatValueAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitFloatValueAst) {
            return visitor.visitFloatValueAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitFloatValueAst`);
        }
    }
    copy() {
        const ast = new FloatValueAst();
        ast.value = this.value;
        return ast;
    }
}
exports.FloatValueAst = FloatValueAst;
class StringValueAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitStringValueAst) {
            return visitor.visitStringValueAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitStringValueAst`);
        }
    }
    copy() {
        const ast = new StringValueAst();
        ast.value = this.value;
        ast.block = this.block;
        return ast;
    }
}
exports.StringValueAst = StringValueAst;
class BooleanValueAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitBooleanValueAst) {
            return visitor.visitBooleanValueAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitBooleanValueAst`);
        }
    }
    copy() {
        const ast = new BooleanValueAst();
        ast.value = this.value;
        return ast;
    }
}
exports.BooleanValueAst = BooleanValueAst;
class NullValueAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitNullValueAst) {
            return visitor.visitNullValueAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitNullValueAst`);
        }
    }
    copy() {
        const ast = new NullValueAst();
        return ast;
    }
}
exports.NullValueAst = NullValueAst;
class EnumValueAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitEnumValueAst) {
            return visitor.visitEnumValueAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitEnumValueAst`);
        }
    }
    copy() {
        const ast = new EnumValueAst();
        ast.value = this.value;
        return ast;
    }
}
exports.EnumValueAst = EnumValueAst;
// [0,1,2]
class ListValueAst extends Ast {
    constructor() {
        super(...arguments);
        this.values = [];
    }
    visit(visitor, context) {
        if (visitor.visitListValueAst) {
            return visitor.visitListValueAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitListValueAst`);
        }
    }
    copy() {
        const ast = new ListValueAst();
        ast.values = this.values.map(va => va.copy());
        return ast;
    }
}
exports.ListValueAst = ListValueAst;
class ObjectValueAst extends Ast {
    constructor() {
        super(...arguments);
        this.fields = [];
    }
    visit(visitor, context) {
        if (visitor.visitObjectValueAst) {
            return visitor.visitObjectValueAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitObjectValueAst`);
        }
    }
    copy() {
        const ast = new ObjectValueAst();
        ast.fields = this.fields.map(field => field.copy());
        return ast;
    }
}
exports.ObjectValueAst = ObjectValueAst;
class ObjectFieldAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitObjectFieldAst) {
            return visitor.visitObjectFieldAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitObjectFieldAst`);
        }
    }
    copy() {
        const ast = new ObjectFieldAst();
        ast.name = this.name.copy();
        ast.value = this.value.copy();
        return ast;
    }
}
exports.ObjectFieldAst = ObjectFieldAst;
class UnionTypeExtensionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
        this.types = [];
    }
    visit(visitor, context) {
        if (visitor.visitUnionTypeExtensionAst) {
            return visitor.visitUnionTypeExtensionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitUnionTypeExtensionAst`);
        }
    }
    copy() {
        const ast = new UnionTypeExtensionAst();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.types = this.types.map(t => t.copy());
        return ast;
    }
}
exports.UnionTypeExtensionAst = UnionTypeExtensionAst;
class DirectiveAst extends Ast {
    constructor() {
        super(...arguments);
        this.arguments = [];
    }
    visit(visitor, context) {
        if (visitor.visitDirectiveAst) {
            return visitor.visitDirectiveAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitDirectiveAst`);
        }
    }
    copy() {
        const ast = new DirectiveAst();
        ast.name = this.name.copy();
        ast.arguments = this.arguments.map(arg => arg.copy());
        return ast;
    }
}
exports.DirectiveAst = DirectiveAst;
class ArgumentAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitArgumentAst) {
            return visitor.visitArgumentAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitArgumentAst`);
        }
    }
    copy() {
        const ast = new ArgumentAst();
        ast.name = this.name.copy();
        this.value = this.value.copy();
        return ast;
    }
}
exports.ArgumentAst = ArgumentAst;
class ScalarTypeExtensionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitScalarTypeExtensionAst) {
            return visitor.visitScalarTypeExtensionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitScalarTypeExtensionAst`);
        }
    }
    copy() {
        const ast = new ScalarTypeExtensionAst();
        ast.name = this.name.copy();
        ast.directives = this.directives && this.directives.map(int => int.copy());
        return ast;
    }
}
exports.ScalarTypeExtensionAst = ScalarTypeExtensionAst;
class ObjectTypeExtensionAst extends Ast {
    constructor() {
        super(...arguments);
        this.interfaces = [];
    }
    visit(visitor, context) {
        if (visitor.visitObjectTypeExtensionAst) {
            return visitor.visitObjectTypeExtensionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitObjectTypeExtensionAst`);
        }
    }
    copy() {
        const ast = new ObjectTypeExtensionAst();
        ast.name = this.name.copy();
        ast.interfaces = this.interfaces.map(int => int.copy());
        return ast;
    }
}
exports.ObjectTypeExtensionAst = ObjectTypeExtensionAst;
class NamedTypeAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitNamedTypeAst) {
            return visitor.visitNamedTypeAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitNamedTypeAst`);
        }
    }
    copy() {
        const ast = new NamedTypeAst();
        ast.name = this.name.copy();
        return ast;
    }
}
exports.NamedTypeAst = NamedTypeAst;
class InterfaceTypeExtensionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
        this.fields = [];
    }
    visit(visitor, context) {
        if (visitor.visitInterfaceTypeExtensionAst) {
            return visitor.visitInterfaceTypeExtensionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitInterfaceTypeExtensionAst`);
        }
    }
    copy() {
        const ast = new InterfaceTypeExtensionAst();
        ast.name = this.name.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.fields = this.fields.map(f => f.copy());
        return ast;
    }
}
exports.InterfaceTypeExtensionAst = InterfaceTypeExtensionAst;
class FieldDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitFieldDefinitionAst) {
            return visitor.visitFieldDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitFieldDefinitionAst`);
        }
    }
    copy() {
        const ast = new FieldDefinitionAst();
        ast.directives = this.directives && this.directives.map(dir => dir.copy());
        ast.index = this.index;
        ast.name = this.name && this.name.copy();
        ast.arguments = this.arguments && this.arguments.map(arg => arg.copy());
        ast.type = this.type && this.type.copy();
        ast.description = this.description && this.description.copy();
        return ast;
    }
}
exports.FieldDefinitionAst = FieldDefinitionAst;
class InputValueDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitInputValueDefinitionAst) {
            return visitor.visitInputValueDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitInputValueDefinitionAst`);
        }
    }
    copy() {
        const ast = new InputValueDefinitionAst();
        ast.index = this.index;
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.defaultValue = this.defaultValue && this.defaultValue.copy();
        ast.type = this.type && this.type.copy();
        ast.name = this.name && this.name.copy();
        ast.description = this.description && this.description.copy();
        return ast;
    }
}
exports.InputValueDefinitionAst = InputValueDefinitionAst;
class EnumTypeExtensionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
        this.values = [];
    }
    visit(visitor, context) {
        if (visitor.visitEnumTypeExtensionAst) {
            return visitor.visitEnumTypeExtensionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitEnumTypeExtensionAst`);
        }
    }
    copy() {
        const ast = new EnumTypeExtensionAst();
        ast.values = this.values && this.values.map(v => v.copy());
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.name = this.name && this.name.copy();
        return ast;
    }
}
exports.EnumTypeExtensionAst = EnumTypeExtensionAst;
class EnumValueDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitEnumValueDefinitionAst) {
            return visitor.visitEnumValueDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitEnumValueDefinitionAst`);
        }
    }
    copy() {
        const ast = new EnumValueDefinitionAst();
        ast.description = this.description.copy();
        this.name = this.name.copy();
        this.directives = this.directives && this.directives.map(d => d.copy());
        return ast;
    }
}
exports.EnumValueDefinitionAst = EnumValueDefinitionAst;
class InputObjectTypeExtensionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
        this.fields = [];
    }
    visit(visitor, context) {
        if (visitor.visitInputObjectTypeExtensionAst) {
            return visitor.visitInputObjectTypeExtensionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitInputObjectTypeExtensionAst`);
        }
    }
    copy() {
        const ast = new InputObjectTypeExtensionAst();
        ast.name = this.name.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.fields = this.fields && this.fields.map(f => f.copy());
        return ast;
    }
}
exports.InputObjectTypeExtensionAst = InputObjectTypeExtensionAst;
class OperationDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.variableDefinitions = [];
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitOperationDefinitionAst) {
            return visitor.visitOperationDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitOperationDefinitionAst`);
        }
    }
    copy() {
        const ast = new OperationDefinitionAst();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.operation = this.operation;
        ast.name = this.name && this.name.copy();
        return ast;
    }
}
exports.OperationDefinitionAst = OperationDefinitionAst;
class FieldAst extends Ast {
    constructor() {
        super(...arguments);
        this.arguments = [];
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitFieldAst) {
            return visitor.visitFieldAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitFieldAst`);
        }
    }
    copy() {
        const ast = new FieldAst();
        ast.name = this.name.copy();
        ast.alias = this.alias.copy();
        ast.arguments = this.arguments.map(arg => arg.copy());
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.selectionSet = this.selectionSet.copy();
        return ast;
    }
}
exports.FieldAst = FieldAst;
class FragmentSpreadAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitFragmentSpreadAst) {
            return visitor.visitFragmentSpreadAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitFragmentSpreadAst`);
        }
    }
    copy() {
        const ast = new FragmentSpreadAst();
        ast.name = this.name.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        return ast;
    }
}
exports.FragmentSpreadAst = FragmentSpreadAst;
class InlineFragmentAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitInlineFragmentAst) {
            return visitor.visitInlineFragmentAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitInlineFragmentAst`);
        }
    }
    copy() {
        const ast = new InlineFragmentAst();
        ast.typeCondition = this.typeCondition.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.selectionSet = this.selectionSet.copy();
        return ast;
    }
}
exports.InlineFragmentAst = InlineFragmentAst;
class VariableDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitVariableDefinitionAst) {
            return visitor.visitVariableDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitVariableDefinitionAst`);
        }
    }
    copy() {
        const ast = new VariableDefinitionAst();
        ast.variable = this.variable.copy();
        ast.type = this.type.copy();
        ast.defaultValue = this.defaultValue.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        return ast;
    }
}
exports.VariableDefinitionAst = VariableDefinitionAst;
class SelectionSetAst extends Ast {
    constructor() {
        super(...arguments);
        this.selections = [];
    }
    visit(visitor, context) {
        if (visitor.visitSelectionSetAst) {
            return visitor.visitSelectionSetAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitSelectionSetAst`);
        }
    }
    copy() {
        const ast = new SelectionSetAst();
        ast.selections = this.selections.map(sel => sel.copy());
        return ast;
    }
}
exports.SelectionSetAst = SelectionSetAst;
class FragmentDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.variableDefinitions = [];
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitFragmentDefinitionAst) {
            return visitor.visitFragmentDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitFragmentDefinitionAst`);
        }
    }
    copy() {
        const ast = new FragmentDefinitionAst();
        ast.name = this.name;
        ast.variableDefinitions = this.variableDefinitions.map(v => v.copy());
        ast.typeCondition = this.typeCondition.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.selectionSet = this.selectionSet.copy();
        return ast;
    }
}
exports.FragmentDefinitionAst = FragmentDefinitionAst;
class SchemaDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
        this.operationTypes = [];
    }
    visit(visitor, context) {
        if (visitor.visitSchemaDefinitionAst) {
            return visitor.visitSchemaDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitSchemaDefinitionAst`);
        }
    }
    copy() {
        const ast = new SchemaDefinitionAst();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.operationTypes = this.operationTypes.map(t => t.copy());
        return ast;
    }
}
exports.SchemaDefinitionAst = SchemaDefinitionAst;
class OperationTypeDefinitionAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitOperationTypeDefinitionAst) {
            return visitor.visitOperationTypeDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitOperationTypeDefinitionAst`);
        }
    }
    copy() {
        const ast = new OperationTypeDefinitionAst();
        ast.operation = this.operation;
        ast.type = this.type.copy();
        return ast;
    }
}
exports.OperationTypeDefinitionAst = OperationTypeDefinitionAst;
class DirectiveDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.arguments = [];
        this.locations = [];
    }
    visit(visitor, context) {
        if (visitor.visitDirectiveDefinitionAst) {
            return visitor.visitDirectiveDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitDirectiveDefinitionAst`);
        }
    }
    copy() {
        const ast = new DirectiveDefinitionAst();
        ast.description = this.description.copy();
        ast.name = this.name.copy();
        ast.arguments = this.arguments.map(a => a.copy());
        ast.locations = this.locations.map(l => l.copy());
        return ast;
    }
}
exports.DirectiveDefinitionAst = DirectiveDefinitionAst;
class ScalarTypeDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitScalarTypeDefinitionAst) {
            return visitor.visitScalarTypeDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitScalarTypeDefinitionAst`);
        }
    }
    copy() {
        const ast = new ScalarTypeDefinitionAst();
        ast.description = this.description.copy();
        ast.name = this.name.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        return ast;
    }
}
exports.ScalarTypeDefinitionAst = ScalarTypeDefinitionAst;
class ObjectTypeDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.interfaces = [];
        this.directives = [];
        this.fields = [];
    }
    visit(visitor, context) {
        if (visitor.visitObjectTypeDefinitionAst) {
            return visitor.visitObjectTypeDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitObjectTypeDefinitionAst`);
        }
    }
    getFields(name) {
        return this.fields.find(field => field.name.value === name);
    }
    copy() {
        const ast = new ObjectTypeDefinitionAst();
        ast.description = this.description.copy();
        ast.name = this.name.copy();
        ast.interfaces = this.interfaces.map(i => i.copy());
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.fields = this.fields.map(d => d.copy());
        ast.isGrpc = this.isGrpc;
        ast.isProto = this.isProto;
        ast.description = this.description.copy();
        return ast;
    }
}
exports.ObjectTypeDefinitionAst = ObjectTypeDefinitionAst;
class InterfaceTypeDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
        this.fields = [];
    }
    visit(visitor, context) {
        if (visitor.visitInterfaceTypeDefinitionAst) {
            return visitor.visitInterfaceTypeDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitInterfaceTypeDefinitionAst`);
        }
    }
    copy() {
        const ast = new InterfaceTypeDefinitionAst();
        ast.description = this.description.copy();
        ast.name = this.name.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.fields = this.fields.map(f => f.copy());
        return ast;
    }
}
exports.InterfaceTypeDefinitionAst = InterfaceTypeDefinitionAst;
class UnionTypeDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
    }
    visit(visitor, context) {
        if (visitor.visitUnionTypeDefinitionAst) {
            return visitor.visitUnionTypeDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitUnionTypeDefinitionAst`);
        }
    }
    copy() {
        const ast = new UnionTypeDefinitionAst();
        ast.description = this.description.copy();
        ast.name = this.name.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.types = this.types.map(d => d.copy());
        return ast;
    }
}
exports.UnionTypeDefinitionAst = UnionTypeDefinitionAst;
class EnumTypeDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
        this.values = [];
    }
    visit(visitor, context) {
        if (visitor.visitEnumTypeDefinitionAst) {
            return visitor.visitEnumTypeDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitEnumTypeDefinitionAst`);
        }
    }
    copy() {
        const ast = new EnumTypeDefinitionAst();
        ast.description = this.description.copy();
        ast.name = this.name.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.values = this.values.map(v => v.copy());
        return ast;
    }
}
exports.EnumTypeDefinitionAst = EnumTypeDefinitionAst;
class InputObjectTypeDefinitionAst extends Ast {
    constructor() {
        super(...arguments);
        this.directives = [];
        this.fields = [];
    }
    visit(visitor, context) {
        if (visitor.visitInputObjectTypeDefinitionAst) {
            return visitor.visitInputObjectTypeDefinitionAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitInputObjectTypeDefinitionAst`);
        }
    }
    copy() {
        const ast = new InputObjectTypeDefinitionAst();
        ast.description = this.description && this.description.copy();
        ast.name = this.name && this.name.copy();
        ast.directives = this.directives && this.directives.map(d => d.copy());
        ast.fields = this.fields && this.fields.map(f => f.copy());
        return ast;
    }
}
exports.InputObjectTypeDefinitionAst = InputObjectTypeDefinitionAst;
class NameAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitNameAst) {
            return visitor.visitNameAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitNameAst`);
        }
    }
    copy() {
        const ast = new NameAst();
        ast.value = this.value;
        return ast;
    }
}
exports.NameAst = NameAst;
class ListTypeAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitListTypeAst) {
            return visitor.visitListTypeAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitListTypeAst`);
        }
    }
    copy() {
        const ast = new ListTypeAst();
        ast.type = this.type.copy();
        return ast;
    }
}
exports.ListTypeAst = ListTypeAst;
class NonNullTypeAst extends Ast {
    visit(visitor, context) {
        if (visitor.visitNonNullTypeAst) {
            return visitor.visitNonNullTypeAst(this, context);
        }
        else {
            throw new Error(`${visitor.name} requied visitNonNullTypeAst`);
        }
    }
    copy() {
        const ast = new NonNullTypeAst();
        ast.type = this.type.copy();
        return ast;
    }
}
exports.NonNullTypeAst = NonNullTypeAst;
//# sourceMappingURL=ast.js.map