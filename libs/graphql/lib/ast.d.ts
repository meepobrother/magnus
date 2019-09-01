export declare abstract class Ast<C = any, O = any> {
    abstract visit(visitor: Visitor, context: C): O;
    abstract copy(): any;
}
export declare type ASTNode<C = any, O = any> = NameAst<C, O> | DocumentAst<C, O> | OperationDefinitionAst<C, O> | VariableDefinitionAst<C, O> | VariableAst<C, O> | SelectionSetAst<C, O> | FieldAst<C, O> | ArgumentAst<C, O> | FragmentSpreadAst<C, O> | InlineFragmentAst<C, O> | FragmentDefinitionAst<C, O> | IntValueAst<C, O> | FloatValueAst<C, O> | StringValueAst<C, O> | BooleanValueAst<C, O> | NullValueAst<C, O> | EnumValueAst<C, O> | ListValueAst<C, O> | ObjectValueAst<C, O> | ObjectFieldAst<C, O> | DirectiveAst<C, O> | NamedTypeAst<C, O> | ListTypeAst<C, O> | NonNullTypeAst<C, O> | SchemaDefinitionAst<C, O> | OperationTypeDefinitionAst<C, O> | ScalarTypeDefinitionAst<C, O> | ObjectTypeDefinitionAst<C, O> | FieldDefinitionAst<C, O> | InputValueDefinitionAst<C, O> | InterfaceTypeDefinitionAst<C, O> | UnionTypeDefinitionAst<C, O> | EnumTypeDefinitionAst<C, O> | EnumValueDefinitionAst<C, O> | InputObjectTypeDefinitionAst<C, O> | DirectiveDefinitionAst<C, O> | SchemaExtensionAst<C, O> | ScalarTypeExtensionAst<C, O> | ObjectTypeExtensionAst<C, O> | InterfaceTypeExtensionAst<C, O> | UnionTypeExtensionAst<C, O> | EnumTypeExtensionAst<C, O> | InputObjectTypeExtensionAst<C, O>;
/**
 * scalar
 * type
 * interface
 * union
 * enum
 * input
 */
export declare type TypeDefinitionAst<C = any, O = any> = ScalarTypeDefinitionAst<C, O> | ObjectTypeDefinitionAst<C, O> | InterfaceTypeDefinitionAst<C, O> | UnionTypeDefinitionAst<C, O> | EnumTypeDefinitionAst<C, O> | InputObjectTypeDefinitionAst<C, O>;
export declare type DefinitionAst<C = any, O = any> = ExecutableDefinitionAst<C, O> | TypeSystemDefinitionAst<C, O> | TypeSystemExtensionAst<C, O>;
export declare type TypeSystemDefinitionAst<C = any, O = any> = SchemaDefinitionAst<C, O> | TypeDefinitionAst<C, O> | DirectiveDefinitionAst<C, O>;
export declare type ExecutableDefinitionAst<C = any, O = any> = OperationDefinitionAst<C, O> | FragmentDefinitionAst<C, O>;
export declare type TypeSystemExtensionAst<C = any, O = any> = SchemaExtensionAst<C, O> | TypeExtensionAst<C, O>;
export declare type TypeExtensionAst<C = any, O = any> = ScalarTypeExtensionAst | ObjectTypeExtensionAst | InterfaceTypeExtensionAst | UnionTypeExtensionAst | EnumTypeExtensionAst | InputObjectTypeExtensionAst;
export declare class SchemaExtensionAst<C = any, O = any> extends Ast<C, O> {
    directives: ReadonlyArray<DirectiveAst>;
    operationTypes: ReadonlyArray<OperationTypeDefinitionAst>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): SchemaExtensionAst<any, any>;
}
export declare type ValueAst<C = any, O = any> = VariableAst<C, O> | IntValueAst<C, O> | FloatValueAst<C, O> | StringValueAst<C, O> | BooleanValueAst<C, O> | NullValueAst<C, O> | EnumValueAst<C, O> | ListValueAst<C, O> | ObjectValueAst<C, O>;
export declare type TypeAst<C = any, O = any> = NamedTypeAst<C, O> | ListTypeAst<C, O> | NonNullTypeAst<C, O>;
export declare type OperationType = 'query' | 'mutation' | 'subscription';
export declare type SelectionAst<C = any, O = any> = FieldAst<C, O> | FragmentSpreadAst<C, O> | InlineFragmentAst<C, O>;
export interface Visitor<C = any, O = any> {
    name: string;
    visit?(node: Ast, context: C): O;
    visitTypeDefinitionAst?(node: TypeDefinitionAst<C, O>, context: C): O;
    visitDefinitionAst?(node: DefinitionAst<C, O>, context: C): O;
    visitTypeSystemDefinitionAst?(node: TypeSystemDefinitionAst<C, O>, context: C): O;
    visitExecutableDefinitionAst?(node: ExecutableDefinitionAst<C, O>, context: C): O;
    visitSchemaExtensionAst?(node: SchemaExtensionAst<C, O>, context: C): O;
    visitTypeExtensionAst?(node: TypeExtensionAst<C, O>, context: C): O;
    visitTypeSystemExtensionAst?(node: TypeSystemExtensionAst<C, O>, context: C): O;
    visitDocumentAst?(node: DocumentAst<C, O>, context: C): O;
    visitVariableAst?(node: VariableAst<C, O>, context: C): O;
    visitIntValueAst?(node: IntValueAst<C, O>, context: C): O;
    visitFloatValueAst?(node: FloatValueAst<C, O>, context: C): O;
    visitStringValueAst?(node: StringValueAst<C, O>, context: C): O;
    visitBooleanValueAst?(node: BooleanValueAst<C, O>, context: C): O;
    visitNullValueAst?(node: NullValueAst<C, O>, context: C): O;
    visitEnumValueAst?(node: EnumValueAst<C, O>, context: C): O;
    visitListValueAst?(node: ListValueAst<C, O>, context: C): O;
    visitObjectValueAst?(node: ObjectValueAst<C, O>, context: C): O;
    visitObjectFieldAst?(node: ObjectFieldAst<C, O>, context: C): O;
    visitUnionTypeExtensionAst?(node: UnionTypeExtensionAst<C, O>, context: C): O;
    visitScalarTypeExtensionAst?(node: ScalarTypeExtensionAst<C, O>, context: C): O;
    visitObjectTypeExtensionAst?(node: ObjectTypeExtensionAst<C, O>, context: C): O;
    visitNamedTypeAst?(node: NamedTypeAst<C, O>, context: C): O;
    visitInterfaceTypeExtensionAst?(node: InterfaceTypeExtensionAst<C, O>, context: C): O;
    visitFieldDefinitionAst?(node: FieldDefinitionAst<C, O>, context: C): O;
    visitInputValueDefinitionAst?(node: InputValueDefinitionAst<C, O>, context: C): O;
    visitEnumTypeExtensionAst?(node: EnumTypeExtensionAst<C, O>, context: C): O;
    visitEnumValueDefinitionAst?(node: EnumValueDefinitionAst<C, O>, context: C): O;
    visitInputObjectTypeExtensionAst?(node: InputObjectTypeExtensionAst<C, O>, context: C): O;
    visitOperationDefinitionAst?(node: OperationDefinitionAst<C, O>, context: C): O;
    visitFieldAst?(node: FieldAst<C, O>, context: C): any;
    visitFragmentSpreadAst?(node: FragmentSpreadAst<C, O>, context: C): O;
    visitInlineFragmentAst?(node: InlineFragmentAst<C, O>, context: C): O;
    visitVariableDefinitionAst?(node: VariableDefinitionAst<C, O>, context: C): O;
    visitSelectionSetAst?(node: SelectionSetAst<C, O>, context: C): O;
    visitFragmentDefinitionAst?(node: FragmentDefinitionAst<C, O>, context: C): O;
    visitSchemaDefinitionAst?(node: SchemaDefinitionAst<C, O>, context: C): O;
    visitOperationTypeDefinitionAst?(node: OperationTypeDefinitionAst<C, O>, context: C): O;
    visitDirectiveDefinitionAst?(node: DirectiveDefinitionAst<C, O>, context: C): O;
    visitScalarTypeDefinitionAst?(node: ScalarTypeDefinitionAst<C, O>, context: C): O;
    visitObjectTypeDefinitionAst?(node: ObjectTypeDefinitionAst<C, O>, context: C): O;
    visitInterfaceTypeDefinitionAst?(node: InterfaceTypeDefinitionAst<C, O>, context: C): O;
    visitUnionTypeDefinitionAst?(node: UnionTypeDefinitionAst<C, O>, context: C): O;
    visitEnumTypeDefinitionAst?(node: EnumTypeDefinitionAst<C, O>, context: C): O;
    visitInputObjectTypeDefinitionAst?(node: InputObjectTypeDefinitionAst<C, O>, context: C): O;
    visitNameAst?(node: NameAst<C, O>, context: C): O;
    visitListTypeAst?(node: ListTypeAst<C, O>, context: C): O;
    visitNonNullTypeAst?(node: NonNullTypeAst<C, O>, context: C): O;
    visitArgumentAst?(node: ArgumentAst<C, O>, context: C): O;
    visitDirectiveAst?(node: DirectiveAst<C, O>, context: C): O;
}
export declare class DocumentAst<C = any, O = any> extends Ast<C, O> {
    definitions: Array<DefinitionAst<C, O>>;
    protos: ObjectTypeDefinitionAst[];
    visit(visitor: Visitor, context: C): O;
    getDefinitionAstIndex(name: string): number;
    hasDefinitionAst(name: string): ScalarTypeExtensionAst<any, any> | ObjectTypeExtensionAst<any, any> | InterfaceTypeExtensionAst<any, any> | UnionTypeExtensionAst<any, any> | EnumTypeExtensionAst<any, any> | InputObjectTypeExtensionAst<any, any> | OperationDefinitionAst<C, O> | FragmentDefinitionAst<C, O> | SchemaDefinitionAst<C, O> | ScalarTypeDefinitionAst<C, O> | ObjectTypeDefinitionAst<C, O> | InterfaceTypeDefinitionAst<C, O> | UnionTypeDefinitionAst<C, O> | EnumTypeDefinitionAst<C, O> | InputObjectTypeDefinitionAst<C, O> | DirectiveDefinitionAst<C, O> | SchemaExtensionAst<C, O> | undefined;
    copy(): DocumentAst<any, any>;
}
export declare class VariableAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    visit(visitor: Visitor, context: C): O;
    copy(): VariableAst<any, any>;
}
export declare class IntValueAst<C = any, O = any> extends Ast<C, O> {
    value: number;
    visit(visitor: Visitor, context: C): O;
    copy(): IntValueAst<any, any>;
}
export declare class FloatValueAst<C = any, O = any> extends Ast<C, O> {
    value: number;
    visit(visitor: Visitor, context: C): O;
    copy(): FloatValueAst<any, any>;
}
export declare class StringValueAst<C = any, O = any> extends Ast<C, O> {
    value: string;
    block: boolean;
    visit(visitor: Visitor, context: C): O;
    copy(): StringValueAst<any, any>;
}
export declare class BooleanValueAst<C = any, O = any> extends Ast<C, O> {
    value: boolean;
    visit(visitor: Visitor, context: C): O;
    copy(): BooleanValueAst<any, any>;
}
export declare class NullValueAst<C = any, O = any> extends Ast<C, O> {
    visit(visitor: Visitor, context: C): O;
    copy(): NullValueAst<any, any>;
}
export declare class EnumValueAst<C = any, O = any> extends Ast<C, O> {
    value: string;
    visit(visitor: Visitor, context: C): O;
    copy(): EnumValueAst<any, any>;
}
export declare class ListValueAst<C = any, O = any> extends Ast<C, O> {
    values: Array<ValueAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): ListValueAst<any, any>;
}
export declare class ObjectValueAst<C = any, O = any> extends Ast<C, O> {
    fields: Array<ObjectFieldAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): ObjectValueAst<any, any>;
}
export declare class ObjectFieldAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    value: ValueAst<C, O>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): ObjectFieldAst<any, any>;
}
export declare class UnionTypeExtensionAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    types: Array<NamedTypeAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): UnionTypeExtensionAst<any, any>;
}
export declare class DirectiveAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    arguments: Array<ArgumentAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): DirectiveAst<any, any>;
}
export declare class ArgumentAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    value: ValueAst<C, O>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): ArgumentAst<any, any>;
}
export declare class ScalarTypeExtensionAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): ScalarTypeExtensionAst<any, any>;
}
export declare class ObjectTypeExtensionAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    interfaces: Array<NamedTypeAst<C, O>>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): ObjectTypeExtensionAst<any, any>;
}
export declare class NamedTypeAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    isEntity: boolean;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): NamedTypeAst<any, any>;
}
export declare class InterfaceTypeExtensionAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    fields: Array<FieldDefinitionAst<C, O>>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): InterfaceTypeExtensionAst<any, any>;
}
export declare class FieldDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    arguments: Array<InputValueDefinitionAst<C, O>>;
    allArguments: Array<InputValueDefinitionAst<C, O>>;
    type: TypeAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    index: number;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): FieldDefinitionAst<any, any>;
}
export declare class InputValueDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    type: TypeAst<C, O>;
    defaultValue: ValueAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    index: number;
    decorator: string[];
    visit(visitor: Visitor, context: C): O;
    copy(): InputValueDefinitionAst<any, any>;
}
export declare class EnumTypeExtensionAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    values: Array<EnumValueDefinitionAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): EnumTypeExtensionAst<any, any>;
}
export declare class EnumValueDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): EnumValueDefinitionAst<any, any>;
}
export declare class InputObjectTypeExtensionAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    fields: Array<InputValueDefinitionAst<C, O>>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): InputObjectTypeExtensionAst<any, any>;
}
export declare class OperationDefinitionAst<C = any, O = any> extends Ast<C, O> {
    operation: OperationType;
    name: NameAst<C, O>;
    variableDefinitions: Array<VariableDefinitionAst<C, O>>;
    directives: Array<DirectiveAst<C, O>>;
    selectionSet: SelectionSetAst<C, O>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): OperationDefinitionAst<any, any>;
}
export declare class FieldAst<C = any, O = any> extends Ast<C, O> {
    alias: NameAst<C, O>;
    name: NameAst<C, O>;
    arguments: Array<ArgumentAst<C, O>>;
    directives: Array<DirectiveAst<C, O>>;
    selectionSet: SelectionSetAst<C, O>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): FieldAst<any, any>;
}
export declare class FragmentSpreadAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): FragmentSpreadAst<any, any>;
}
export declare class InlineFragmentAst<C = any, O = any> extends Ast<C, O> {
    typeCondition: NamedTypeAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    selectionSet: SelectionSetAst<C, O>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): InlineFragmentAst<any, any>;
}
export declare class VariableDefinitionAst<C = any, O = any> extends Ast<C, O> {
    variable: VariableAst<C, O>;
    type: TypeAst<C, O>;
    defaultValue: ValueAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): VariableDefinitionAst<any, any>;
}
export declare class SelectionSetAst<C = any, O = any> extends Ast<C, O> {
    selections: Array<SelectionAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): SelectionSetAst<any, any>;
}
export declare class FragmentDefinitionAst<C = any, O = any> extends Ast<C, O> {
    name: NameAst<C, O>;
    variableDefinitions: Array<VariableDefinitionAst<C, O>>;
    typeCondition: NamedTypeAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    selectionSet: SelectionSetAst<C, O>;
    visit(visitor: Visitor, context: C): O;
    copy(): FragmentDefinitionAst<any, any>;
}
export declare class SchemaDefinitionAst<C = any, O = any> extends Ast<C, O> {
    directives: Array<DirectiveAst<C, O>>;
    operationTypes: Array<OperationTypeDefinitionAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): SchemaDefinitionAst<any, any>;
}
export declare class OperationTypeDefinitionAst<C = any, O = any> extends Ast<C, O> {
    operation: OperationType;
    type: NamedTypeAst<C, O>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): OperationTypeDefinitionAst<any, any>;
}
export declare class DirectiveDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    arguments: Array<InputValueDefinitionAst<C, O>>;
    locations: Array<NameAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): DirectiveDefinitionAst<any, any>;
}
export declare class ScalarTypeDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): ScalarTypeDefinitionAst<any, any>;
}
export declare class ObjectTypeDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    interfaces: Array<NamedTypeAst<C, O>>;
    directives: Array<DirectiveAst<C, O>>;
    fields: Array<FieldDefinitionAst<C, O>>;
    isGrpc: boolean;
    isProto: boolean;
    visit(visitor: Visitor, context: C): O;
    getFields(name: string): FieldDefinitionAst | undefined;
    copy(): ObjectTypeDefinitionAst<any, any>;
}
export declare class InterfaceTypeDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    fields: Array<FieldDefinitionAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): InterfaceTypeDefinitionAst<any, any>;
}
export declare class UnionTypeDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    directives: ReadonlyArray<DirectiveAst<C, O>>;
    types: ReadonlyArray<NamedTypeAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): UnionTypeDefinitionAst<any, any>;
}
export declare class EnumTypeDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    directives: ReadonlyArray<DirectiveAst<C, O>>;
    values: ReadonlyArray<EnumValueDefinitionAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): EnumTypeDefinitionAst<any, any>;
}
export declare class InputObjectTypeDefinitionAst<C = any, O = any> extends Ast<C, O> {
    description: StringValueAst<C, O>;
    name: NameAst<C, O>;
    directives: Array<DirectiveAst<C, O>>;
    fields: Array<InputValueDefinitionAst<C, O>>;
    visit(visitor: Visitor, context: C): O;
    copy(): InputObjectTypeDefinitionAst<any, any>;
}
export declare class NameAst<C = any, O = any> extends Ast<C, O> {
    value: string;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): NameAst<any, any>;
}
export declare class ListTypeAst<C = any, O = any> extends Ast<C, O> {
    type: TypeAst<C, O>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): ListTypeAst<any, any>;
}
export declare class NonNullTypeAst<C = any, O = any> extends Ast<C, O> {
    type: NamedTypeAst<C, O> | ListTypeAst<C, O>;
    visit(visitor: Visitor<C, O>, context: C): O;
    copy(): NonNullTypeAst<any, any>;
}
