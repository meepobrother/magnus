import * as ts from "typescript";
import * as util from "./util";
export declare abstract class Node<T extends ts.Node = ts.Node> {
    decorators: Decorator[];
    parent: Node;
    modifiers: Modifier[];
    node: T;
    docs: JSDoc[];
    from: string;
    abstract visit(visitor: Visitor, context: any): any;
}
export declare class TypeChecker {
    node: ts.TypeChecker;
    visit(visitor: Visitor, context: any): any;
}
export declare class Program {
    node: ts.Program;
    typeChecker: TypeChecker;
    visit(visitor: Visitor, context: any): any;
}
export declare class LanguageService {
    node: ts.LanguageService;
    program: Program;
    visit(visitor: Visitor, context: any): any;
}
export declare class Diagnostic {
    node: ts.Diagnostic;
    visit(visitor: Visitor, context: any): any;
}
export declare class Project {
    languageService: LanguageService;
    program: Program;
    typeChecker: TypeChecker;
    ambientModules: Symbol[];
    sourceFiles: SourceFile[];
    preEmitDiagnostics: Diagnostic[];
    visit(visitor: Visitor, context: any): any;
}
export declare class Type {
    visit(visitor: Visitor, context: any): any;
}
export declare class SourceFile extends Node<ts.SourceFile> {
    statements: Statement[];
    fileName: string;
    text: string;
    moduleName: string;
    languageVariant: ts.LanguageVariant;
    isDeclarationFile: boolean;
    hasNoDefaultLib: boolean;
    languageVersion: ts.ScriptTarget;
    visit(visitor: Visitor, context: any): any;
}
/**
 * 无用的
 */
export declare type Statement = ClassDeclaration | ImportDeclaration | VariableStatement | FunctionDeclaration | InterfaceDeclaration | EnumDeclaration | TypeAliasDeclaration | ReturnStatement | IfStatement | SwitchStatement | ForOfStatement | ForInStatement | FunctionBody | ExpressionStatement | BreakStatement | ThrowStatement | DebuggerStatement | ExportDeclaration | ExportAssignment | EmptyStatement | ConditionalExpression | RegularExpressionLiteral | TaggedTemplateExpression | TryStatement | ImportEqualsDeclaration | OtherStatement;
export declare class ClassDeclaration extends Node<ts.ClassDeclaration> {
    members: (ClassElement | PropertyDeclaration | ConstructorDeclaration | MethodDeclaration | SemicolonClassElement | GetAccessorDeclaration | SetAccessorDeclaration | Decorator)[];
    name: Identifier;
    typeParameters: TypeParameterDeclaration[];
    heritageClauses: HeritageClause[];
    visit(visitor: Visitor, context: any): any;
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
/**
 * 无用的
 */
export declare class ClassElement<T extends ts.ClassElement = ts.ClassElement> extends Node<T> {
    name: PropertyName;
    type: TypeNode;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class PropertyDeclaration extends ClassElement<ts.PropertyDeclaration> {
    exclamationToken: ExclamationToken;
    initializer: Expression;
    visit(visitor: Visitor, context: any): any;
    getDecorators(): (visitor: Visitor) => string[];
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
export declare class Identifier extends Node<ts.Identifier> {
    escapedText: ts.__String;
    text: string;
    from: string;
    visit(visitor: Visitor, context: any): any;
}
export declare class TypeParameterDeclaration extends Node<ts.TypeParameterDeclaration> {
    constraint: TypeNode;
    default: TypeNode;
    expression: Expression;
    name: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class Decorator extends Node<ts.Decorator> {
    expression: LeftHandSideExpression;
    visit(visitor: Visitor, context: any): any;
}
export declare class ShorthandPropertyAssignment extends Node<ts.ShorthandPropertyAssignment> {
    visit(visitor: Visitor, context: any): any;
}
export declare class SpreadAssignment extends Node<ts.SpreadAssignment> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ObjectLiteralElementLike extends Node<ts.ObjectLiteralElementLike> {
    visit(visitor: Visitor, context: any): any;
}
export declare class PropertyAssignment extends Node<ts.PropertyAssignment> {
    initializer: Expression;
    name: PropertyName;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class SetAccessorDeclaration extends Node<ts.SetAccessorDeclaration> {
    name: PropertyName;
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: QuestionToken;
    exclamationToken: ExclamationToken;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
export declare class GetAccessorDeclaration extends Node<ts.GetAccessorDeclaration> {
    name: PropertyName;
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: QuestionToken;
    exclamationToken: ExclamationToken;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
export declare class CallExpression extends Node<ts.CallExpression> {
    typeArguments: TypeNode[];
    expression: LeftHandSideExpression;
    arguments: Expression[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ObjectLiteralExpression extends Node<ts.ObjectLiteralExpression> {
    properties: ObjectLiteralElementLike[];
    visit(visitor: Visitor, context: any): any;
}
export declare type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName;
export declare type TypeNode = TypeReferenceNode | TupleTypeNode | UnionTypeNode | KeywordTypeNode | FunctionTypeNode | MappedTypeNode | IndexedAccessTypeNode | TypeOperatorNode | TypeLiteralNode | ArrayTypeNode | LiteralTypeNode | TypePredicateNode | ImportTypeNode | ParenthesizedTypeNode | IntersectionTypeNode | ExpressionWithTypeArguments | JSDocNullableType;
export declare class QuestionToken extends Node<ts.QuestionToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ExclamationToken extends Node<ts.ExclamationToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare class Expression extends Node<ts.Expression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class NonNullExpression extends Expression {
    visit(visitor: Visitor, context: any): any;
}
export declare class DeleteExpression extends Expression {
    visit(visitor: Visitor, context: any): any;
}
export declare class MethodDeclaration extends Node<ts.MethodDeclaration> {
    body: FunctionBody;
    name: PropertyName;
    type: TypeNode;
    parameters: ParameterDeclaration[];
    typeParameters: TypeParameterDeclaration[];
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any): any;
    getDecorators(): (visitor: Visitor) => string[];
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
export declare class TypeReferenceNode extends Node<ts.TypeReferenceNode> {
    typeArguments: TypeNode[];
    typeName: EntityName;
    visit(visitor: Visitor, context: any): any;
}
export declare class EntityName extends Node<ts.EntityName> {
    visit(visitor: Visitor, context: any): any;
}
export declare class QualifiedName extends Node<ts.QualifiedName> {
    visit(visitor: Visitor, context: any): any;
}
export declare class StringLiteral extends Node<ts.StringLiteral> {
    text: string;
    visit(visitor: Visitor, context: any): any;
    create(): string;
}
export declare class NumericLiteral extends Node<ts.NumericLiteral> {
    text: string;
    isUnterminated: boolean;
    hasExtendedUnicodeEscape: boolean;
    visit(visitor: Visitor, context: any): any;
}
export declare class ComputedPropertyName extends Node<ts.ComputedPropertyName> {
    expression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class SemicolonClassElement extends Node<ts.SemicolonClassElement> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ConstructorDeclaration extends Node<ts.ConstructorDeclaration> {
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: QuestionToken;
    exclamationToken: ExclamationToken;
    name: PropertyName;
    parameters: ParameterDeclaration[];
    typeParameters: TypeParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
    getDecorators(): (visitor: Visitor) => string[];
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
export declare class AsteriskToken extends Node<ts.AsteriskToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare class Modifier extends Node<ts.Modifier> {
    name: "static" | "readonly" | "declare" | "protected" | "private" | "export" | "default" | "const" | "async" | "abstract" | "public";
    visit(visitor: Visitor, context: any): any;
}
export declare class FunctionBody extends Node<ts.FunctionBody> {
    statements: Statement[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ParameterDeclaration extends Node<ts.ParameterDeclaration> {
    dotDotDotToken: DotDotDotToken;
    name: BindingName;
    type: TypeNode;
    questionToken: QuestionToken;
    initializer: Expression;
    index: number;
    visit(visitor: Visitor, context: any): any;
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
    getDecorators(): (visitor: Visitor) => string[];
}
export declare class TupleTypeNode extends Node<ts.TupleTypeNode> {
    elementTypes: TypeNode[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ImportDeclaration extends Node<ts.ImportDeclaration> {
    moduleSpecifier: Expression;
    importClause: ImportClause;
    sourcePath: string;
    visit(visitor: Visitor, context: any): any;
}
export declare class VariableStatement extends Node<ts.VariableStatement> {
    declarationList: VariableDeclarationList;
    visit(visitor: Visitor, context: any): any;
}
export declare class FunctionDeclaration extends Node<ts.FunctionDeclaration> {
    body: FunctionBody;
    name: Identifier;
    parameters: ParameterDeclaration[];
    typeParameters: TypeParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
}
export declare class InterfaceDeclaration extends Node<ts.InterfaceDeclaration> {
    members: TypeElement[];
    typeParameters: TypeParameterDeclaration[];
    name: Identifier;
    heritageClauses: HeritageClause[];
    visit(visitor: Visitor, context: any): any;
}
export declare class HeritageClause extends Node<ts.HeritageClause> {
    token: "extends" | "implements";
    types: ExpressionWithTypeArguments[];
    visit(visitor: Visitor, context: any): any;
}
export declare class EnumDeclaration extends Node<ts.EnumDeclaration> {
    members: EnumMember[];
    name: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class TypeAliasDeclaration extends Node<ts.TypeAliasDeclaration> {
    name: Identifier;
    type: TypeNode;
    typeParameters: TypeParameterDeclaration[];
    visit(visitor: Visitor, context: any): any;
}
export declare class UnionTypeNode extends Node<ts.UnionTypeNode> {
    types: TypeNode[];
    visit(visitor: Visitor, context: any): any;
}
export declare class KeywordTypeNode extends Node<ts.KeywordTypeNode> {
    name: util.KeywordType;
    visit(visitor: Visitor, context: any): any;
}
export declare class EnumMember extends Node<ts.EnumMember> {
    name: PropertyName;
    initializer: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare type TypeElement = PropertySignature | MethodSignature | IndexSignatureDeclaration | ConstructSignatureDeclaration | CallSignatureDeclaration;
export declare class PropertySignature extends Node<ts.PropertySignature> {
    name: PropertyName;
    questionToken: QuestionToken;
    type: TypeNode;
    initializer: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class FunctionTypeNode extends Node<ts.FunctionTypeNode> {
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
}
export declare class MethodSignature extends Node<ts.MethodSignature> {
    name: PropertyName;
    type: TypeNode;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class DotDotDotToken extends Node<ts.DotDotDotToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare type BindingName = ObjectBindingPattern | ArrayBindingPattern | Identifier;
export declare class ObjectBindingPattern extends Node<ts.ObjectBindingPattern> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ArrayBindingPattern extends Node<ts.ArrayBindingPattern> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ArrayLiteralExpression extends Node<ts.ArrayLiteralExpression> {
    elements: Expression[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ReturnStatement extends Node<ts.ReturnStatement> {
    expression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class AsExpression extends Node<ts.AsExpression> {
    type: TypeNode;
    expression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class VariableDeclarationList extends Node<ts.VariableDeclarationList> {
    declarations: VariableDeclaration[];
    visit(visitor: Visitor, context: any): any;
}
export declare class VariableDeclaration extends Node<ts.VariableDeclaration> {
    name: BindingName;
    exclamationToken: ExclamationToken;
    type: TypeNode;
    initializer: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class AwaitExpression extends Node<ts.AwaitExpression> {
    expression: UnaryExpression;
    visit(visitor: Visitor, context: any): any;
}
export declare class ArrowFunction extends Node<ts.ArrowFunction> {
    equalsGreaterThanToken: EqualsGreaterThanToken;
    body: ConciseBody;
    visit(visitor: Visitor, context: any): any;
}
export declare class ConciseBody extends Node<ts.ConciseBody> {
    visit(visitor: Visitor, context: any): any;
}
export declare class EqualsGreaterThanToken extends Node<ts.ConciseBody> {
    visit(visitor: Visitor, context: any): any;
}
export declare class BooleanLiteral extends Node<ts.BooleanLiteral> {
    value: boolean;
    visit(visitor: Visitor, context: any): any;
}
export declare class UnaryExpression extends Node<ts.UnaryExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ElementAccessExpression extends Node<ts.ElementAccessExpression> {
    expression: LeftHandSideExpression;
    argumentExpression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class ParenthesizedExpression extends Node<ts.ParenthesizedExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class SuperExpression extends Node<ts.SuperExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ThisExpression extends Node<ts.ThisExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class PropertyAccessExpression extends Node<ts.PropertyAccessExpression> {
    expression: LeftHandSideExpression;
    name: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class PrefixUnaryExpression extends Node<ts.PrefixUnaryExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class NullLiteral extends Node<ts.PrefixUnaryExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class NoSubstitutionTemplateLiteral extends Node<ts.NoSubstitutionTemplateLiteral> {
    text: string;
    isUnterminated: boolean;
    hasExtendedUnicodeEscape: boolean;
    visit(visitor: Visitor, context: any): any;
}
export declare class TemplateExpression extends Node<ts.TemplateExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class NewExpression extends Node<ts.NewExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class IfStatement extends Node<ts.IfStatement> {
    expression: Expression;
    thenStatement: Statement;
    elseStatement: Statement;
    visit(visitor: Visitor, context: any): any;
}
export declare class ForOfStatement extends Node<ts.ForOfStatement> {
    awaitModifier: AwaitKeywordToken;
    initializer: Expression | VariableDeclarationList;
    expression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class ForInitializer extends Node<ts.ForInitializer> {
    initializer: ForInitializer;
    condition: Expression;
    incrementor: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class AwaitKeywordToken extends Node<ts.AwaitKeywordToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ForInStatement extends Node<ts.ForInStatement> {
    initializer: Expression | VariableDeclarationList;
    expression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class SwitchStatement extends Node<ts.SwitchStatement> {
    expression: Expression;
    caseBlock: CaseBlock;
    possiblyExhaustive: boolean;
    visit(visitor: Visitor, context: any): any;
}
export declare class CaseBlock extends Node<ts.CaseBlock> {
    clauses: CaseOrDefaultClause[];
    visit(visitor: Visitor, context: any): any;
}
export declare class CaseOrDefaultClause extends Node<ts.CaseOrDefaultClause> {
    visit(visitor: Visitor, context: any): any;
}
export declare class CaseClause extends Node<ts.CaseClause> {
    expression: Expression;
    statements: Statement[];
    visit(visitor: Visitor, context: any): any;
}
export declare class DefaultClause extends Node<ts.DefaultClause> {
    statements: Statement[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ImportClause extends Node<ts.ImportClause> {
    namedBindings: NamedImportBindings;
    name: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare type NamedImportBindings = NamespaceImport | NamedImports;
export declare class NamespaceImport extends Node<ts.NamespaceImport> {
    name: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class NamedImports extends Node<ts.NamedImports> {
    elements: ImportSpecifier[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ImportSpecifier extends Node<ts.ImportSpecifier> {
    propertyName: Identifier;
    name: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class LeftHandSideExpression extends Node<ts.LeftHandSideExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ExpressionWithTypeArguments extends Node<ts.ExpressionWithTypeArguments> {
    expression: LeftHandSideExpression;
    typeArguments: TypeNode[];
    visit(visitor: Visitor, context: any): any;
}
export declare class JSDocNullableType extends Node<ts.JSDocNullableType> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ExpressionStatement extends Node<ts.ExpressionStatement> {
    expression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class BreakStatement extends Node<ts.BreakStatement> {
    label: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class ThrowStatement extends Node<ts.ThrowStatement> {
    expression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class DebuggerStatement extends Node<ts.DebuggerStatement> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ExportDeclaration extends Node<ts.ExportDeclaration> {
    exportClause: NamedExports;
    moduleSpecifier: Expression;
    name: Identifier | NumericLiteral | StringLiteral;
    visit(visitor: Visitor, context: any): any;
}
export declare class Symbol {
    visit(visitor: Visitor, context: any): any;
}
export declare class NamedExports extends Node<ts.NamedExports> {
    elements: ExportSpecifier[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ExportSpecifier extends Node<ts.ExportSpecifier> {
    propertyName: Identifier;
    name: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class ExportAssignment extends Node<ts.ExportAssignment> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ConditionalExpression extends Node<ts.ConditionalExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class SpreadElement extends Node<ts.SpreadElement> {
    visit(visitor: Visitor, context: any): any;
}
export declare class EmptyStatement extends Node<ts.EmptyStatement> {
    visit(visitor: Visitor, context: any): any;
}
export declare class RegularExpressionLiteral extends Node<ts.RegularExpressionLiteral> {
    visit(visitor: Visitor, context: any): any;
}
export declare class TaggedTemplateExpression extends Node<ts.TaggedTemplateExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class TryStatement extends Node<ts.TryStatement> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ImportEqualsDeclaration extends Node<ts.ImportEqualsDeclaration> {
    name: Identifier;
    moduleReference: ModuleReference;
    visit(visitor: Visitor, context: any): any;
}
export declare class ModuleReference extends Node<ts.ModuleReference> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ContinueStatement extends Node<ts.ContinueStatement> {
    label: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class JSDoc extends Node<ts.JSDoc> {
    comment: string;
    tags: JSDocTag[];
    visit(visitor: Visitor, context: any): any;
}
export declare class JSDocTag extends Node<ts.JSDocTag> {
    tagName: Identifier;
    comment: string;
    visit(visitor: Visitor, context: any): any;
}
export declare class ConstructSignatureDeclaration extends Node<ts.ConstructSignatureDeclaration> {
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class CallSignatureDeclaration extends Node<ts.CallSignatureDeclaration> {
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class IndexSignatureDeclaration extends Node<ts.IndexSignatureDeclaration> {
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    questionToken: QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class MappedTypeNode extends Node<ts.MappedTypeNode> {
    readonlyToken: ReadonlyToken | PlusToken | MinusToken;
    typeParameter: TypeParameterDeclaration;
    questionToken: QuestionToken | PlusToken | MinusToken;
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
}
export declare class MinusToken extends Node<ts.ReadonlyToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare class PlusToken extends Node<ts.ReadonlyToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ReadonlyToken extends Node<ts.ReadonlyToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare class IndexedAccessTypeNode extends Node<ts.IndexedAccessTypeNode> {
    objectType: TypeNode;
    indexType: TypeNode;
    visit(visitor: Visitor, context: any): any;
}
export declare class TypeOperatorNode extends Node<ts.TypeOperatorNode> {
    operator: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.UniqueKeyword | ts.SyntaxKind.ReadonlyKeyword;
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
}
export declare class BinaryExpression extends Node<ts.BinaryExpression> {
    left: Expression;
    operatorToken: BinaryOperatorToken;
    right: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class BinaryOperatorToken extends Node<ts.BinaryOperatorToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ArrayTypeNode extends Node<ts.ArrayTypeNode> {
    elementType: TypeNode;
    visit(visitor: Visitor, context: any): any;
}
export declare class LiteralTypeNode extends Node<ts.LiteralTypeNode> {
    literal: BooleanLiteral | LiteralExpression | PrefixUnaryExpression;
    visit(visitor: Visitor, context: any): any;
}
export declare type LiteralExpression = NumericLiteral | BigIntLiteral | RegularExpressionLiteral | NoSubstitutionTemplateLiteral;
export declare class BigIntLiteral extends Node<ts.BigIntLiteral> {
    text: string;
    isUnterminated: boolean;
    hasExtendedUnicodeEscape: boolean;
    visit(visitor: Visitor, context: any): any;
}
export declare class TypeLiteralNode extends Node<ts.TypeLiteralNode> {
    members: TypeElement[];
    visit(visitor: Visitor, context: any): any;
}
export declare class TypePredicateNode extends Node<ts.TypePredicateNode> {
    parameterName: Identifier | ThisTypeNode;
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
}
export declare class ImportTypeNode extends Node<ts.ImportTypeNode> {
    isTypeOf: boolean;
    argument: TypeNode;
    qualifier: EntityName;
    typeArguments: TypeNode[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ParenthesizedTypeNode extends Node<ts.ParenthesizedTypeNode> {
    visit(visitor: Visitor, context: any): any;
}
export declare class IntersectionTypeNode extends Node<ts.IntersectionTypeNode> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ThisTypeNode extends Node<ts.ThisTypeNode> {
    visit(visitor: Visitor, context: any): any;
}
export declare class OtherStatement extends Node<ts.Node> {
    visit(visitor: Visitor, context: any): any;
}
export interface Visitor<C = any, O = any> {
    name: string;
    visitDeleteExpression?(node: DeleteExpression, context: C): O;
    visitNonNullExpression?(node: NonNullExpression, context: C): O;
    visitOtherStatement?(node: OtherStatement, context: C): O;
    visitJSDocNullableType?(node: JSDocNullableType, context: C): O;
    visitBigIntLiteral?(node: BigIntLiteral, context: C): O;
    visitLiteralExpression?(node: LiteralExpression, context: C): O;
    visitAsteriskToken?(node: AsteriskToken, context: C): O;
    visitModuleReference?(node: ModuleReference, context: C): O;
    visitImportEqualsDeclaration?(node: ImportEqualsDeclaration, context: C): O;
    visitEqualsGreaterThanToken?(node: EqualsGreaterThanToken, context: C): O;
    visitConciseBody?(node: ConciseBody, context: C): O;
    visitDiagnostic?(node: Diagnostic, context: C): O;
    visitTypeChecker?(node: TypeChecker, context: C): O;
    visitProgram?(node: Program, context: C): O;
    visitLanguageService?(node: LanguageService, context: C): O;
    visitProject?(node: Project, context: C): O;
    visitSymbol?(node: Symbol, context: C): O;
    visitType?(node: Type, context: C): O;
    visitExportSpecifier?(node: ExportSpecifier, context: C): O;
    visit?(node: Node, context: C): O;
    visitNamedExports?(node: NamedExports, context: C): O;
    visitSpreadElement?(node: SpreadElement, context: C): O;
    visitIntersectionTypeNode?(node: IntersectionTypeNode, context: C): O;
    visitTryStatement?(node: TryStatement, context: C): O;
    visitTaggedTemplateExpression?(node: TaggedTemplateExpression, context: C): O;
    visitRegularExpressionLiteral?(node: RegularExpressionLiteral, context: C): O;
    visitEmptyStatement?(node: EmptyStatement, context: C): O;
    visitConditionalExpression?(node: ConditionalExpression, context: C): O;
    visitExportAssignment?(node: ExportAssignment, context: C): O;
    visitNoSubstitutionTemplateLiteral?(node: NoSubstitutionTemplateLiteral, context: C): O;
    visitCallSignatureDeclaration?(node: CallSignatureDeclaration, context: C): O;
    visitParenthesizedTypeNode?(node: ParenthesizedTypeNode, context: C): O;
    visitConstructSignatureDeclaration?(node: ConstructSignatureDeclaration, context: C): O;
    visitNullLiteral?(node: NullLiteral, context: C): O;
    visitImportTypeNode?(node: ImportTypeNode, context: C): O;
    visitSuperExpression?(node: SuperExpression, context: C): O;
    visitExportDeclaration?(node: ExportDeclaration, context: C): O;
    visitThrowStatement?(node: ThrowStatement, context: C): O;
    visitDebuggerStatement?(node: DebuggerStatement, context: C): O;
    visitParenthesizedExpression?(node: ParenthesizedExpression, context: C): O;
    visitNewExpression?(node: NewExpression, context: C): O;
    visitTemplateExpression?(node: TemplateExpression, context: C): O;
    visitPrefixUnaryExpression?(node: PrefixUnaryExpression, context: C): O;
    visitLiteralTypeNode?(node: LiteralTypeNode, context: C): O;
    visitArrayTypeNode?(node: ArrayTypeNode, context: C): O;
    visitTypePredicateNode?(node: TypePredicateNode, context: C): O;
    visitThisTypeNode?(node: ThisTypeNode, context: C): O;
    visitThisExpression?(node: ThisExpression, context: C): O;
    visitElementAccessExpression?(node: ElementAccessExpression, context: C): O;
    visitBinaryOperatorToken?(node: BinaryOperatorToken, context: C): O;
    visitTypeLiteralNode?(node: TypeLiteralNode, context: C): O;
    visitBinaryExpression?(node: BinaryExpression, context: C): O;
    visitTypeOperatorNode?(node: TypeOperatorNode, context: C): O;
    visitIndexedAccessTypeNode?(node: IndexedAccessTypeNode, context: C): O;
    visitMinusToken?(node: MinusToken, context: C): O;
    visitPlusToken?(node: PlusToken, context: C): O;
    visitReadonlyToken?(node: ReadonlyToken, context: C): O;
    visitMappedTypeNode?(node: MappedTypeNode, context: C): O;
    visitIndexSignatureDeclaration?(node: IndexSignatureDeclaration, context: C): O;
    visitContinueStatement?(node: ContinueStatement, context: C): O;
    visitBreakStatement?(node: BreakStatement, context: C): O;
    visitExpressionStatement?(node: ExpressionStatement, context: C): O;
    visitCaseBlock?(node: CaseBlock, context: C): O;
    visitCaseOrDefaultClause?(node: CaseOrDefaultClause, context: C): O;
    visitCaseClause?(node: CaseClause, context: C): O;
    visitDefaultClause?(node: DefaultClause, context: C): O;
    visitForInitializer?(node: ForInitializer, context: C): O;
    visitAwaitKeywordToken?(node: AwaitKeywordToken, context: C): O;
    visitExpressionWithTypeArguments?(node: ExpressionWithTypeArguments, context: C): O;
    visitJSDocTag?(node: JSDocTag, context: C): O;
    visitJSDoc?(node: JSDoc, context: C): O;
    visitStatement?(node: Statement, context: C): O;
    visitNamedImportBindings?(node: NamedImportBindings, context: C): O;
    visitShorthandPropertyAssignment?(node: ShorthandPropertyAssignment, context: C): O;
    visitSpreadAssignment?(node: SpreadAssignment, context: C): O;
    visitObjectLiteralElementLike?(node: ObjectLiteralElementLike, context: C): O;
    visitPropertyAssignment?(node: PropertyAssignment, context: C): O;
    visitSetAccessorDeclaration?(node: SetAccessorDeclaration, context: C): O;
    visitGetAccessorDeclaration?(node: GetAccessorDeclaration, context: C): O;
    visitCallExpression?(node: CallExpression, context: C): O;
    visitObjectLiteralExpression?(node: ObjectLiteralExpression, context: C): O;
    visitPropertyName?(node: PropertyName, context: C): O;
    visitPropertyDeclaration?(node: PropertyDeclaration, context: C): O;
    visitTypeNode?(node: TypeNode, context: C): O;
    visitQuestionToken?(node: QuestionToken, context: C): O;
    visitExclamationToken?(node: ExclamationToken, context: C): O;
    visitExpression?(node: Expression, context: C): O;
    visitMethodDeclaration?(node: MethodDeclaration, context: C): O;
    visitTypeReferenceNode?(node: TypeReferenceNode, context: C): O;
    visitEntityName?(node: EntityName, context: C): O;
    visitQualifiedName?(node: QualifiedName, context: C): O;
    visitStringLiteral?(node: StringLiteral, context: C): O;
    visitNumericLiteral?(node: NumericLiteral, context: C): O;
    visitComputedPropertyName?(node: ComputedPropertyName, context: C): O;
    visitSemicolonClassElement?(node: SemicolonClassElement, context: C): O;
    visitConstructorDeclaration?(node: ConstructorDeclaration, context: C): O;
    visitModifier?(node: Modifier, context: C): O;
    visitFunctionBody?(node: FunctionBody, context: C): O;
    visitParameterDeclaration?(node: ParameterDeclaration, context: C): O;
    visitTupleTypeNode?(node: TupleTypeNode, context: C): O;
    visitImportDeclaration?(node: ImportDeclaration, context: C): O;
    visitVariableStatement?(node: VariableStatement, context: C): O;
    visitInterfaceDeclaration?(node: InterfaceDeclaration, context: C): O;
    visitHeritageClause?(node: HeritageClause, context: C): O;
    visitEnumDeclaration?(node: EnumDeclaration, context: C): O;
    visitTypeAliasDeclaration?(node: TypeAliasDeclaration, context: C): O;
    visitUnionTypeNode?(node: UnionTypeNode, context: C): O;
    visitKeywordTypeNode?(node: KeywordTypeNode, context: C): O;
    visitEnumMember?(node: EnumMember, context: C): O;
    visitTypeElement?(node: TypeElement, context: C): O;
    visitPropertySignature?(node: PropertySignature, context: C): O;
    visitFunctionTypeNode?(node: FunctionTypeNode, context: C): O;
    visitMethodSignature?(node: MethodSignature, context: C): O;
    visitDotDotDotToken?(node: DotDotDotToken, context: C): O;
    visitBindingName?(node: BindingName, context: C): O;
    visitObjectBindingPattern?(node: ObjectBindingPattern, context: C): O;
    visitArrayBindingPattern?(node: ArrayBindingPattern, context: C): O;
    visitArrayLiteralExpression?(node: ArrayLiteralExpression, context: C): O;
    visitReturnStatement?(node: ReturnStatement, context: C): O;
    visitAsExpression?(node: AsExpression, context: C): O;
    visitVariableDeclarationList?(node: VariableDeclarationList, context: C): O;
    visitVariableDeclaration?(node: VariableDeclaration, context: C): O;
    visitAwaitExpression?(node: AwaitExpression, context: C): O;
    visitArrowFunction?(node: ArrowFunction, context: C): O;
    visitBooleanLiteral?(node: BooleanLiteral, context: C): O;
    visitUnaryExpression?(node: UnaryExpression, context: C): O;
    visitPropertyAccessExpression?(node: PropertyAccessExpression, context: C): O;
    visitIfStatement?(node: IfStatement, context: C): O;
    visitForOfStatement?(node: ForOfStatement, context: C): O;
    visitForInStatement?(node: ForInStatement, context: C): O;
    visitSwitchStatement?(node: SwitchStatement, context: C): O;
    visitImportClause?(node: ImportClause, context: C): O;
    visitNamespaceImport?(node: NamespaceImport, context: C): O;
    visitNamedImports?(node: NamedImports, context: C): O;
    visitImportSpecifier?(node: ImportSpecifier, context: C): O;
    visitLeftHandSideExpression?(node: LeftHandSideExpression, context: C): O;
    visitFunctionDeclaration?(node: FunctionDeclaration, context: C): O;
    visitSourceFile?(node: SourceFile, context: C): O;
    visitClassDeclaration?(node: ClassDeclaration, context: C): O;
    visitClassElement?(node: ClassElement, context: C): O;
    visitIdentifier?(node: Identifier, context: C): O;
    visitTypeParameterDeclaration?(node: TypeParameterDeclaration, context: C): O;
    visitDecorator?(node: Decorator, context: C): O;
}
export declare class TsVisitor implements Visitor {
    name: string;
    visitBigIntLiteral(node: BigIntLiteral, context: ts.BigIntLiteral): BigIntLiteral;
    visitLiteralExpression(node: any, context: ts.LiteralExpression): any;
    visitConciseBody(node: ConciseBody, context: ts.ConciseBody): ConciseBody;
    visitEqualsGreaterThanToken(node: EqualsGreaterThanToken, context: ts.EqualsGreaterThanToken): EqualsGreaterThanToken;
    visitDiagnostic(node: Diagnostic, context: ts.Diagnostic): Diagnostic;
    visitLanguageService(node: LanguageService, context: ts.LanguageService): LanguageService;
    visitProgram(node: Program, context: ts.Program): Program;
    visitTypeChecker(node: TypeChecker, context: ts.TypeChecker): TypeChecker;
    visit(node: Node, context: any): any;
    visitType(node: Type, context: any): Type;
    visitSymbol(node: Symbol, context: any): Symbol;
    visitExportSpecifier(node: ExportSpecifier, context: ts.ExportSpecifier): ExportSpecifier;
    visitNamedExports(node: NamedExports, context: ts.NamedExports): NamedExports;
    visitThisTypeNode(node: ThisTypeNode, context: ts.ThisTypeNode): ThisTypeNode;
    visitBinaryOperatorToken(node: BinaryOperatorToken, context: ts.MinusToken): BinaryOperatorToken;
    visitMinusToken(node: MinusToken, context: ts.MinusToken): MinusToken;
    visitPlusToken(node: PlusToken, context: ts.PlusToken): PlusToken;
    visitReadonlyToken(node: ReadonlyToken, context: ts.ReadonlyToken): ReadonlyToken;
    visitContinueStatement(node: ContinueStatement, context: ts.ContinueStatement): ContinueStatement;
    visitCaseBlock(node: CaseBlock, context: ts.CaseBlock): CaseBlock;
    visitCaseOrDefaultClause(node: CaseOrDefaultClause, context: ts.CaseOrDefaultClause): CaseClause | DefaultClause;
    visitCaseClause(node: CaseClause, context: ts.CaseClause): CaseClause;
    visitDefaultClause(node: DefaultClause, context: ts.DefaultClause): DefaultClause;
    visitForInitializer(node: ForInitializer, context: ts.ForInitializer): Expression | VariableDeclarationList;
    visitAwaitKeywordToken(node: AwaitKeywordToken, context: ts.AwaitKeywordToken): AwaitKeywordToken;
    sourceFile: ts.SourceFile;
    typeChecker: ts.TypeChecker;
    languageService: ts.LanguageService;
    /**
     * 扫描source file
     * @param {SourceFile} node
     * @param {ts.SourceFile} context
     */
    visitSourceFile(node: SourceFile, context: ts.SourceFile): SourceFile;
    /**
     * 生成statement
     * @param {Statement} node
     * @param {ts.Statement} context
     */
    visitStatement(node: any, context: ts.Statement): ClassDeclaration | ImportDeclaration | VariableStatement | FunctionDeclaration | InterfaceDeclaration | EnumDeclaration | TypeAliasDeclaration | ReturnStatement | IfStatement | SwitchStatement | ForOfStatement | ForInStatement | FunctionBody | ExpressionStatement | BreakStatement | ThrowStatement | DebuggerStatement | ExportDeclaration | ExportAssignment | EmptyStatement | ConditionalExpression | RegularExpressionLiteral | TaggedTemplateExpression | TryStatement | ImportEqualsDeclaration | OtherStatement;
    visitOtherStatement(node: OtherStatement, context: any): OtherStatement;
    visitImportEqualsDeclaration(node: ImportEqualsDeclaration, context: ts.ImportEqualsDeclaration): ImportEqualsDeclaration;
    visitModuleReference(node: ModuleReference, context: ts.ModuleReference): ModuleReference;
    visitTryStatement(node: TryStatement, context: any): TryStatement;
    visitTaggedTemplateExpression(node: TaggedTemplateExpression, context: any): TaggedTemplateExpression;
    visitRegularExpressionLiteral(node: RegularExpressionLiteral, context: any): RegularExpressionLiteral;
    visitConditionalExpression(node: ConditionalExpression, context: any): ConditionalExpression;
    visitEmptyStatement(node: EmptyStatement, context: any): EmptyStatement;
    visitExportAssignment(node: ExportAssignment, context: any): ExportAssignment;
    visitExportDeclaration(node: ExportDeclaration, context: ts.ExportDeclaration): ExportDeclaration;
    visitThrowStatement(node: ThrowStatement, context: any): ThrowStatement;
    visitDebuggerStatement(node: DebuggerStatement, context: any): DebuggerStatement;
    visitBreakStatement(node: BreakStatement, context: ts.BreakStatement): BreakStatement;
    visitExpressionStatement(node: ExpressionStatement, context: ts.ExpressionStatement): ExpressionStatement;
    visitForInStatement(node: ForInStatement, context: ts.ForInStatement): ForInStatement;
    visitForOfStatement(node: ForOfStatement, context: ts.ForOfStatement): ForOfStatement;
    visitSwitchStatement(node: SwitchStatement, context: ts.SwitchStatement): SwitchStatement;
    visitIfStatement(node: IfStatement, context: ts.IfStatement): IfStatement;
    visitReturnStatement(node: ReturnStatement, context: ts.ReturnStatement): ReturnStatement;
    /**
     * type Demo = string|number;
     * @param {TypeAliasDeclaration} node
     * @param {ts.TypeAliasDeclaration} context
     */
    visitTypeAliasDeclaration(node: TypeAliasDeclaration, context: ts.TypeAliasDeclaration): TypeAliasDeclaration;
    /**
     * enum Demo{
     *  Title,
     *  Name
     * }
     * @param {EnumDeclaration} node
     * @param {ts.EnumDeclaration} context
     */
    visitEnumDeclaration(node: EnumDeclaration, context: ts.EnumDeclaration): EnumDeclaration;
    visitJSDoc(node: JSDoc, context: ts.JSDoc): JSDoc;
    visitJSDocTag(node: JSDocTag, context: ts.JSDocTag): JSDocTag;
    /**
     * enum member
     * @param {EnumMember} node
     * @param {ts.EnumMember} context
     */
    visitEnumMember(node: EnumMember, context: ts.EnumMember): EnumMember;
    /**
     * interface
     * @param {InterfaceDeclaration}node
     * @param {ts.InterfaceDeclaration}context
     */
    visitInterfaceDeclaration(node: InterfaceDeclaration, context: ts.InterfaceDeclaration): InterfaceDeclaration;
    visitHeritageClause(node: HeritageClause, context: ts.HeritageClause): HeritageClause;
    visitExpressionWithTypeArguments(node: ExpressionWithTypeArguments, context: ts.ExpressionWithTypeArguments): ExpressionWithTypeArguments;
    /**
     * type element
     * @param node
     * @param context
     */
    visitTypeElement(node: any, context: ts.TypeElement): PropertySignature | MethodSignature | IndexSignatureDeclaration | ConstructSignatureDeclaration | CallSignatureDeclaration;
    visitCallSignatureDeclaration(node: CallSignatureDeclaration, context: any): CallSignatureDeclaration;
    visitConstructSignatureDeclaration(node: ConstructSignatureDeclaration, context: any): ConstructSignatureDeclaration;
    visitIndexSignatureDeclaration(node: IndexSignatureDeclaration, context: ts.IndexSignatureDeclaration): IndexSignatureDeclaration;
    /**
     * interface method
     * @param node
     * @param context
     */
    visitMethodSignature(node: MethodSignature, context: ts.MethodSignature): MethodSignature;
    /**
     * interface property
     * @param node
     * @param context
     */
    visitPropertySignature(node: PropertySignature, context: ts.PropertySignature): PropertySignature;
    visitFunctionDeclaration(node: FunctionDeclaration, context: ts.FunctionDeclaration): FunctionDeclaration;
    visitVariableStatement(node: VariableStatement, context: ts.VariableStatement): VariableStatement;
    visitVariableDeclarationList(node: VariableDeclarationList, context: ts.VariableDeclarationList): VariableDeclarationList;
    visitVariableDeclaration(node: VariableDeclaration, context: ts.VariableDeclaration): VariableDeclaration;
    visitImportDeclaration(node: ImportDeclaration, context: ts.ImportDeclaration): ImportDeclaration;
    visitImportClause(node: ImportClause, context: ts.ImportClause): ImportClause;
    visitNamedImportBindings(node: any, context: ts.NamedImportBindings): NamespaceImport | NamedImports;
    visitNamespaceImport(node: NamespaceImport, context: ts.NamespaceImport): NamespaceImport;
    visitNamedImports(node: NamedImports, context: ts.NamedImports): NamedImports;
    visitImportSpecifier(node: ImportSpecifier, context: ts.ImportSpecifier): ImportSpecifier;
    createJsDocs(docs?: ts.JSDoc[]): JSDoc[];
    /**
     * 扫描class declaration
     * @param {ClassDeclaration} node
     * @param {ts.ClassDeclaration} context
     */
    visitClassDeclaration(node: ClassDeclaration, context: ts.ClassDeclaration): ClassDeclaration;
    /**
     * 创建type
     * @param {TypeParameterDeclaration} node
     * @param {ts.TypeParameterDeclaration} context
     */
    visitTypeParameterDeclaration(node: TypeParameterDeclaration, context: ts.TypeParameterDeclaration): TypeParameterDeclaration;
    /**
     * 遍历identifier
     * @param {Identifier} node
     * @param {ts.Identifier} context
     */
    visitIdentifier(node: Identifier, context: ts.Identifier): Identifier;
    /**
     * 遍历类成员
     * @param {ClassElement} node
     * @param {ts.ClassElement} context
     */
    visitClassElement(node: ClassElement, context: ts.ClassElement): ClassElement | PropertyDeclaration | MethodDeclaration | SemicolonClassElement | ConstructorDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | Decorator;
    visitConstructorDeclaration(node: ConstructorDeclaration, context: ts.ConstructorDeclaration): ConstructorDeclaration;
    /**
     * todo
     * @param node
     * @param context
     */
    visitSemicolonClassElement(node: SemicolonClassElement, context: ts.SemicolonClassElement): SemicolonClassElement;
    /**
     * 创建modifiers
     * @param parent
     * @param modifiers
     */
    createModifiers(parent: Node, modifiers: ts.ModifiersArray | undefined): Modifier[];
    createJsDoc(comment: string): JSDoc;
    /**
     * 遍历方法
     * @param node
     * @param context
     */
    visitMethodDeclaration(node: MethodDeclaration, context: ts.MethodDeclaration): MethodDeclaration;
    visitParameterDeclaration(node: ParameterDeclaration, context: ts.ParameterDeclaration): ParameterDeclaration;
    visitBindingName(node: any, context: ts.BindingName): BindingName;
    visitArrayBindingPattern(node: ArrayBindingPattern, context: ts.ArrayBindingPattern): ArrayBindingPattern;
    visitObjectBindingPattern(node: ObjectBindingPattern, context: ts.ObjectBindingPattern): ObjectBindingPattern;
    /**
     * ...[],{}
     * @param node
     * @param context
     */
    visitDotDotDotToken(node: DotDotDotToken, context: ts.DotDotDotToken): DotDotDotToken;
    visitFunctionBody(node: FunctionBody, context: ts.FunctionBody): FunctionBody;
    /**
     * 完善类属性
     * @param {PropertyDeclaration} node
     * @param {ts.PropertyDeclaration} context
     */
    visitPropertyDeclaration(node: PropertyDeclaration, context: ts.PropertyDeclaration): PropertyDeclaration;
    /**
     * 完善 Modifier
     * @param {Modifier} node
     * @param {ts.Modifier} context
     */
    visitModifier(node: Modifier, context: ts.Modifier): Modifier;
    visitExpression(node: Expression, context: ts.Expression): any;
    visitDeleteExpression(node: DeleteExpression, context: any): DeleteExpression;
    visitNonNullExpression(node: NonNullExpression, context: ts.NonNullExpression): void;
    visitSpreadElement(node: SpreadElement, context: any): SpreadElement;
    visitNoSubstitutionTemplateLiteral(node: NoSubstitutionTemplateLiteral, context: ts.NoSubstitutionTemplateLiteral): NoSubstitutionTemplateLiteral;
    visitNullLiteral(node: NullLiteral, context: any): NullLiteral;
    visitPrefixUnaryExpression(node: PrefixUnaryExpression, context: any): PrefixUnaryExpression;
    visitTemplateExpression(node: TemplateExpression, context: any): TemplateExpression;
    visitNewExpression(node: NewExpression, context: any): NewExpression;
    visitElementAccessExpression(node: ElementAccessExpression, context: ts.ElementAccessExpression): ElementAccessExpression;
    visitBinaryExpression(node: BinaryExpression, context: ts.BinaryExpression): BinaryExpression;
    visitBooleanLiteral(node: BooleanLiteral, context: ts.BooleanLiteral): BooleanLiteral;
    visitArrowFunction(node: ArrowFunction, context: ts.ArrowFunction): ArrowFunction;
    visitAwaitExpression(node: AwaitExpression, context: ts.AwaitExpression): AwaitExpression;
    visitUnaryExpression(node: UnaryExpression, context: ts.UnaryExpression): CallExpression | UnaryExpression;
    visitAsExpression(node: AsExpression, context: ts.AsExpression): AsExpression;
    visitArrayLiteralExpression(node: ArrayLiteralExpression, context: ts.ArrayLiteralExpression): ArrayLiteralExpression;
    visitExclamationToken(node: ExclamationToken, context: ts.ExclamationToken): ExclamationToken;
    visitQuestionToken(node: QuestionToken, context: ts.QuestionToken): QuestionToken;
    /**
     * type node start
     */
    visitTypeNode(node: any, context: ts.TypeNode): TypeNode;
    visitJSDocNullableType(node: JSDocNullableType, context: any): JSDocNullableType;
    visitIntersectionTypeNode(node: IntersectionTypeNode, context: any): IntersectionTypeNode;
    visitParenthesizedTypeNode(node: ParenthesizedTypeNode, context: any): ParenthesizedTypeNode;
    visitImportTypeNode(node: ImportTypeNode, context: ts.ImportTypeNode): ImportTypeNode;
    visitTypePredicateNode(node: TypePredicateNode, context: ts.TypePredicateNode): TypePredicateNode;
    visitLiteralTypeNode(node: LiteralTypeNode, context: ts.LiteralTypeNode): LiteralTypeNode;
    visitArrayTypeNode(node: ArrayTypeNode, context: ts.ArrayTypeNode): ArrayTypeNode;
    visitTypeLiteralNode(node: TypeLiteralNode, context: ts.TypeLiteralNode): TypeLiteralNode;
    visitTypeOperatorNode(node: TypeOperatorNode, context: ts.TypeOperatorNode): TypeOperatorNode;
    visitIndexedAccessTypeNode(node: IndexedAccessTypeNode, context: ts.IndexedAccessTypeNode): IndexedAccessTypeNode;
    visitMappedTypeNode(node: MappedTypeNode, context: ts.MappedTypeNode): MappedTypeNode;
    /**
     * [number,string]
     * @param node
     * @param context
     */
    visitTupleTypeNode(node: TupleTypeNode, context: ts.TupleTypeNode): TupleTypeNode;
    visitTypeReferenceNode(node: TypeReferenceNode, context: ts.TypeReferenceNode): TypeReferenceNode;
    /**
     * getInfo: <T>()=>Promise<T>
     * @param node
     * @param context
     */
    visitFunctionTypeNode(node: FunctionTypeNode, context: ts.FunctionTypeNode): FunctionTypeNode;
    /**
     * number string ...
     * @param node
     * @param context
     */
    visitKeywordTypeNode(node: KeywordTypeNode, context: ts.KeywordTypeNode): KeywordTypeNode;
    /**
     * union
     * @param node
     * @param context
     */
    visitUnionTypeNode(node: UnionTypeNode, context: ts.UnionTypeNode): UnionTypeNode;
    /**
     * type node end
     */
    visitEntityName(node: EntityName, context: ts.EntityName): QualifiedName | Identifier;
    visitQualifiedName(node: QualifiedName, context: ts.QualifiedName): QualifiedName;
    visitPropertyName(node: any, context: ts.PropertyName): PropertyName;
    visitComputedPropertyName(node: ComputedPropertyName, context: ts.ComputedPropertyName): ComputedPropertyName;
    visitNumericLiteral(node: NumericLiteral, context: ts.NumericLiteral): NumericLiteral;
    visitStringLiteral(node: StringLiteral, context: ts.StringLiteral): StringLiteral;
    createDecorators(context: ts.Node, parent: Node): Decorator[];
    visitDecorator(node: Decorator, context: ts.Decorator): Decorator;
    visitLeftHandSideExpression(node: LeftHandSideExpression, context: ts.LeftHandSideExpression): LeftHandSideExpression | PropertyAccessExpression | Identifier | NumericLiteral | ObjectLiteralExpression | CallExpression;
    visitSuperExpression(node: SuperExpression, context: ts.SuperExpression): SuperExpression;
    visitParenthesizedExpression(node: ParenthesizedExpression, context: any): ParenthesizedExpression;
    visitThisExpression(node: ThisExpression, context: ts.ThisExpression): ThisExpression;
    visitPropertyAccessExpression(node: PropertyAccessExpression, context: ts.PropertyAccessExpression): PropertyAccessExpression;
    visitCallExpression(node: CallExpression, context: ts.CallExpression): CallExpression;
    visitObjectLiteralExpression(node: ObjectLiteralExpression, context: ts.ObjectLiteralExpression): ObjectLiteralExpression;
    visitObjectLiteralElementLike(node: ObjectLiteralElementLike, context: ts.ObjectLiteralElementLike): ShorthandPropertyAssignment | PropertyAssignment | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | SpreadAssignment | ObjectLiteralElementLike;
    visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment, context: ts.ShorthandPropertyAssignment): ShorthandPropertyAssignment;
    visitSpreadAssignment(node: SpreadAssignment, context: ts.SpreadAssignment): SpreadAssignment;
    visitPropertyAssignment(node: PropertyAssignment, context: ts.PropertyAssignment): PropertyAssignment;
    visitSetAccessorDeclaration(node: SetAccessorDeclaration, context: ts.SetAccessorDeclaration): SetAccessorDeclaration;
    visitGetAccessorDeclaration(node: GetAccessorDeclaration, context: ts.GetAccessorDeclaration): GetAccessorDeclaration;
    visitAsteriskToken(node: AsteriskToken, context: ts.AsteriskToken): AsteriskToken;
}
export declare const tsVisitor: TsVisitor;
