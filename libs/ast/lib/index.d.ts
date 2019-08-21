import * as ts from 'typescript';
export declare class TextRange {
    pos: number;
    end: number;
}
export declare abstract class Node<T extends ts.Node = ts.Node> {
    __name: string;
    kind: ts.SyntaxKind;
    flags: ts.NodeFlags;
    parent: Node;
    decorators: Decorator[];
    modifiers: ts.Modifier[];
    node: T;
    /**
     * 其他
     */
    docs: JSDoc[];
    from: string;
    abstract visit(visitor: Visitor, context: any): any;
    readonly isExport: boolean;
    readonly isAbstract: boolean;
    readonly isAsync: boolean;
    readonly isConst: boolean;
    readonly isDeclare: boolean;
    readonly isDefault: boolean;
    readonly isPublic: boolean;
    readonly isPrivate: boolean;
    readonly isProtected: boolean;
    readonly isReadonly: boolean;
    readonly isStatic: boolean;
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
    resolvedModules: Map<string, ts.ResolvedModuleFull>;
    visit(visitor: Visitor, context: any): any;
}
/**
 * 无用的
 */
export declare type Statement = ClassDeclaration | ImportDeclaration | VariableStatement | FunctionDeclaration | InterfaceDeclaration | EnumDeclaration | TypeAliasDeclaration | ReturnStatement | IfStatement | SwitchStatement | ForOfStatement | ForInStatement | FunctionBody | ExpressionStatement | BreakStatement | ThrowStatement | DebuggerStatement | ExportDeclaration | ExportAssignment | EmptyStatement | ConditionalExpression | RegularExpressionLiteral | TaggedTemplateExpression | TryStatement | ImportEqualsDeclaration | OtherStatement;
export declare class ClassLikeDeclarationBase extends Node<ts.ClassLikeDeclarationBase> {
    kind: ts.SyntaxKind.ClassDeclaration | ts.SyntaxKind.ClassExpression;
    name?: Identifier;
    typeParameters?: TypeParameterDeclaration[];
    heritageClauses?: HeritageClause[];
    members: ClassElement[];
    visit(visitor: Visitor, context: any): void;
}
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
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class PropertyDeclaration extends ClassElement<ts.PropertyDeclaration> {
    exclamationToken: ts.ExclamationToken;
    initializer: Expression;
    visit(visitor: Visitor, context: any): any;
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
export declare class Identifier extends Node<ts.Identifier> {
    kind: ts.SyntaxKind.Identifier;
    originalKeywordKind?: ts.SyntaxKind;
    isInJSDocNamespace?: boolean;
    escapedText: ts.__String;
    text: string;
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
    kind: ts.SyntaxKind.ShorthandPropertyAssignment;
    name: Identifier;
    questionToken?: ts.QuestionToken;
    exclamationToken?: ts.ExclamationToken;
    equalsToken?: ts.Token<ts.SyntaxKind.EqualsToken>;
    objectAssignmentInitializer?: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class SpreadAssignment extends Node<ts.SpreadAssignment> {
    expression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;
export declare type ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;
export declare class PropertyAssignment extends Node<ts.PropertyAssignment> {
    initializer: Expression;
    name: PropertyName;
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class SetAccessorDeclaration extends Node<ts.SetAccessorDeclaration> {
    name: PropertyName;
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: ts.QuestionToken;
    exclamationToken: ts.ExclamationToken;
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
    questionToken: ts.QuestionToken;
    exclamationToken: ts.ExclamationToken;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
export declare class CallExpression extends Node<ts.CallExpression> {
    kind: ts.SyntaxKind.CallExpression;
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
export declare type Expression = StringLiteral | NumericLiteral | ObjectLiteralExpression | ArrayLiteralExpression | Identifier | AsExpression | AwaitExpression | ArrowFunction | BooleanLiteral | CallExpression | BinaryExpression | ElementAccessExpression | PropertyAccessExpression | PrefixUnaryExpression | TemplateExpression | NewExpression | ThisExpression | NoSubstitutionTemplateLiteral | ConditionalExpression | SpreadElement | TaggedTemplateExpression | ParenthesizedExpression | RegularExpressionLiteral | OtherExpression;
export declare class OtherExpression extends Node<ts.Expression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class OmittedExpression extends Node<ts.OmittedExpression> {
    kind: ts.SyntaxKind.OmittedExpression;
    visit(visitor: Visitor, context: any): any;
}
export declare class MethodDeclaration extends Node<ts.MethodDeclaration> {
    body: FunctionBody;
    name: PropertyName;
    type: TypeNode;
    parameters: ParameterDeclaration[];
    typeParameters: TypeParameterDeclaration[];
    questionToken: ts.QuestionToken;
    _functionLikeDeclarationBrand: any;
    asteriskToken: ts.AsteriskToken;
    exclamationToken: ts.ExclamationToken;
    visit(visitor: Visitor, context: any): any;
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
export declare class TypeReferenceNode extends Node<ts.TypeReferenceNode> {
    typeArguments: TypeNode[];
    typeName: EntityName;
    visit(visitor: Visitor, context: any): any;
}
export declare type EntityName = Identifier | QualifiedName;
export declare class QualifiedName extends Node<ts.QualifiedName> {
    kind: ts.SyntaxKind.QualifiedName;
    left: EntityName;
    right: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class StringLiteral extends Node<ts.StringLiteral> {
    text: string;
    isUnterminated: boolean;
    hasExtendedUnicodeEscape: boolean;
    kind: ts.SyntaxKind.StringLiteral;
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
    questionToken: ts.QuestionToken;
    exclamationToken: ts.ExclamationToken;
    name: PropertyName;
    parameters: ParameterDeclaration[];
    typeParameters: TypeParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
}
export declare class AsteriskToken extends Node<ts.AsteriskToken> {
    visit(visitor: Visitor, context: any): any;
}
export declare class Modifier extends Node<ts.Modifier> {
    name: 'static' | 'readonly' | 'declare' | 'protected' | 'private' | 'export' | 'default' | 'const' | 'async' | 'abstract' | 'public';
    visit(visitor: Visitor, context: any): any;
}
export declare class FunctionBody extends Node<ts.FunctionBody> {
    statements: Statement[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ParameterDeclaration extends Node<ts.ParameterDeclaration> {
    dotDotDotToken: ts.DotDotDotToken;
    name: BindingName;
    type: TypeNode;
    questionToken: ts.QuestionToken;
    initializer: Expression;
    index: number;
    visit(visitor: Visitor, context: any): any;
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null;
}
export declare class TupleTypeNode extends Node<ts.TupleTypeNode> {
    elementTypes: TypeNode[];
    visit(visitor: Visitor, context: any): any;
}
export declare type ModuleName = Identifier | StringLiteral;
export declare type NamespaceBody = ModuleBlock | NamespaceDeclaration;
export declare type ModuleBody = NamespaceBody | JSDocNamespaceBody;
export declare type JSDocNamespaceBody = Identifier | JSDocNamespaceDeclaration;
export declare class ModuleDeclaration extends Node<ts.DeclarationStatement> {
    kind: ts.SyntaxKind.ModuleDeclaration;
    parent: ModuleBody | SourceFile;
    name: ModuleName;
    body?: ModuleBody | JSDocNamespaceDeclaration;
    visit(visitor: Visitor, context: any): any;
}
export declare class NamespaceDeclaration extends ModuleDeclaration {
    name: Identifier;
    body: NamespaceBody;
    visit(visitor: Visitor, context: any): any;
}
export declare class JSDocNamespaceDeclaration extends ModuleDeclaration {
    name: Identifier;
    body?: JSDocNamespaceBody;
    visit(visitor: Visitor, context: any): any;
}
export declare class ModuleBlock extends Node<ts.ModuleBlock> {
    kind: ts.SyntaxKind.ModuleBlock;
    statements: Statement[];
    visit(visitor: Visitor, context: any): any;
}
export declare class ImportDeclaration extends Node<ts.ImportDeclaration> {
    kind: ts.SyntaxKind.ImportDeclaration;
    moduleSpecifier: Expression;
    importClause: ImportClause;
    visit(visitor: Visitor, context: any): any;
}
export declare class VariableStatement extends Node<ts.VariableStatement> {
    kind: ts.SyntaxKind.VariableStatement;
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
    types: ExpressionWithTypeArguments[];
    kind: ts.SyntaxKind.HeritageClause;
    token: ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword;
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
export declare class TypeQueryNode extends Node<ts.TypeQueryNode> {
    exprName: EntityName;
    visit(visitor: Visitor, context: any): any;
}
export declare class KeywordTypeNode extends Node<ts.KeywordTypeNode> {
    kind: ts.SyntaxKind.AnyKeyword | ts.SyntaxKind.UnknownKeyword | ts.SyntaxKind.NumberKeyword | ts.SyntaxKind.BigIntKeyword | ts.SyntaxKind.ObjectKeyword | ts.SyntaxKind.BooleanKeyword | ts.SyntaxKind.StringKeyword | ts.SyntaxKind.SymbolKeyword | ts.SyntaxKind.ThisKeyword | ts.SyntaxKind.VoidKeyword | ts.SyntaxKind.UndefinedKeyword | ts.SyntaxKind.NullKeyword | ts.SyntaxKind.NeverKeyword;
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
    questionToken: ts.QuestionToken;
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
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare type BindingName = ObjectBindingPattern | ArrayBindingPattern | Identifier;
export declare class ObjectBindingPattern extends Node<ts.ObjectBindingPattern> {
    elements: BindingElement[];
    visit(visitor: Visitor, context: any): any;
}
export declare class BindingElement extends Node<ts.BindingElement> {
    kind: ts.SyntaxKind.BindingElement;
    propertyName?: PropertyName;
    dotDotDotToken?: ts.DotDotDotToken;
    name: BindingName;
    initializer?: Expression;
    visit(visitor: Visitor, context: any): any;
}
declare type ArrayBindingElement = BindingElement | OmittedExpression;
export declare class ArrayBindingPattern extends Node<ts.ArrayBindingPattern> {
    elements: ArrayBindingElement[];
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
    exclamationToken: ts.ExclamationToken;
    type: TypeNode;
    initializer: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class AwaitExpression extends Node<ts.AwaitExpression> {
    kind: ts.SyntaxKind.AwaitExpression;
    expression: UnaryExpression;
    visit(visitor: Visitor, context: any): any;
}
export declare class YieldExpression extends Node<ts.YieldExpression> {
    kind: ts.SyntaxKind.YieldExpression;
    asteriskToken: AsteriskToken;
    expression: Expression;
    visit(visitor: Visitor, context: any): void;
}
export declare class SyntheticExpression extends Node<ts.SyntheticExpression> {
    kind: ts.SyntaxKind.SyntheticExpression;
    isSpread: boolean;
    type: Type;
    visit(visitor: Visitor, context: any): void;
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
    kind: ts.SyntaxKind.TrueKeyword | ts.SyntaxKind.FalseKeyword;
    visit(visitor: Visitor, context: any): any;
}
export declare class UnaryExpression extends Node<ts.UnaryExpression> {
    _unaryExpressionBrand: any;
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
    kind: ts.SyntaxKind.PrefixUnaryExpression;
    operator: ts.PrefixUnaryOperator;
    operand: UnaryExpression;
    visit(visitor: Visitor, context: any): any;
}
export declare class NullLiteral extends Node<ts.PrefixUnaryExpression> {
    visit(visitor: Visitor, context: any): any;
}
export declare class NoSubstitutionTemplateLiteral extends Node<ts.NoSubstitutionTemplateLiteral> {
    text: string;
    isUnterminated?: boolean;
    hasExtendedUnicodeEscape?: boolean;
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
    kind: ts.SyntaxKind.ForInStatement;
    initializer: Expression | VariableDeclarationList;
    expression: Expression;
    statement: Statement;
    visit(visitor: Visitor, context: any): any;
}
export declare class SwitchStatement extends Node<ts.SwitchStatement> {
    kind: ts.SyntaxKind.SwitchStatement;
    expression: Expression;
    caseBlock: CaseBlock;
    possiblyExhaustive: boolean;
    visit(visitor: Visitor, context: any): any;
}
export declare class CaseBlock extends Node<ts.CaseBlock> {
    kind: ts.SyntaxKind.CaseBlock;
    parent: SwitchStatement;
    clauses: CaseOrDefaultClause[];
    visit(visitor: Visitor, context: any): any;
}
export declare type CaseOrDefaultClause = CaseClause | DefaultClause;
export declare class CaseClause extends Node<ts.CaseClause> {
    kind: ts.SyntaxKind.CaseClause;
    parent: CaseBlock;
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
    _leftHandSideExpressionBrand: any;
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
    kind: ts.SyntaxKind.ExportAssignment;
    isExportEquals: boolean;
    expression: Expression;
    name: Identifier | StringLiteral | NumericLiteral;
    visit(visitor: Visitor, context: any): any;
}
export declare class ConditionalExpression extends Node<ts.ConditionalExpression> {
    kind: ts.SyntaxKind.ConditionalExpression;
    condition: Expression;
    questionToken: ts.QuestionToken;
    whenTrue: Expression;
    colonToken: ts.ColonToken;
    whenFalse: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class FunctionExpression extends Node<ts.FunctionExpression> {
    kind: ts.SyntaxKind.FunctionExpression;
    name?: Identifier;
    body: FunctionBody;
    visit(visitor: Visitor, context: any): void;
}
export declare class SpreadElement extends Node<ts.SpreadElement> {
    kind: ts.SyntaxKind.SpreadElement;
    parent: ArrayLiteralExpression | CallExpression | NewExpression;
    expression: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class EmptyStatement extends Node<ts.EmptyStatement> {
    visit(visitor: Visitor, context: any): any;
}
export declare class RegularExpressionLiteral extends Node<ts.RegularExpressionLiteral> {
    text: string;
    isUnterminated?: boolean;
    hasExtendedUnicodeEscape?: boolean;
    kind: ts.SyntaxKind.RegularExpressionLiteral;
    visit(visitor: Visitor, context: any): any;
}
declare type TemplateLiteral = TemplateExpression | NoSubstitutionTemplateLiteral;
export declare class TaggedTemplateExpression extends Node<ts.TaggedTemplateExpression> {
    kind: ts.SyntaxKind.TaggedTemplateExpression;
    tag: LeftHandSideExpression;
    typeArguments?: TypeNode[];
    template: TemplateLiteral;
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
declare type ModuleReference = EntityName | ExternalModuleReference;
export declare class ExternalModuleReference extends Node<ts.ExternalModuleReference> {
    kind: ts.SyntaxKind.ExternalModuleReference;
    parent: ImportEqualsDeclaration;
    expression: Expression;
    visit(visitor: Visitor, context: any): void;
}
export declare class ContinueStatement extends Node<ts.ContinueStatement> {
    kind: ts.SyntaxKind.ContinueStatement;
    label: Identifier;
    visit(visitor: Visitor, context: any): any;
}
export declare class JSDoc extends Node<ts.JSDoc> {
    comment: string;
    tags: JSDocTag[];
    visit(visitor: Visitor, context: any): any;
}
export declare class JSDocTypeExpression extends Node<ts.JSDocTypeExpression> {
    kind: ts.SyntaxKind.JSDocTypeExpression;
    type: TypeNode;
    visit(visitor: Visitor, context: any): void;
}
export declare class JSDocPropertyLikeTag extends Node<ts.JSDocPropertyLikeTag> {
    parent: JSDoc;
    name: EntityName;
    typeExpression?: JSDocTypeExpression;
    isNameFirst: boolean;
    isBracketed: boolean;
    visit(visitor: Visitor, context: any): void;
}
export declare class JSDocTypeLiteral extends Node<ts.JSDocTypeLiteral> {
    kind: ts.SyntaxKind.JSDocTypeLiteral;
    jsDocPropertyTags: JSDocPropertyLikeTag[];
    isArrayType?: boolean;
    visit(visitor: Visitor, context: any): void;
}
export declare class JSDocTag extends Node<ts.JSDocTag> {
    tagName: Identifier;
    comment: string;
    parent: JSDoc | JSDocTypeLiteral;
    visit(visitor: Visitor, context: any): any;
}
export declare class JSDocReturnTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocReturnTag;
    typeExpression?: JSDocTypeExpression;
    visit(visitor: Visitor, context: any): void;
}
export declare class JSDocUnknownTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocTag;
    visit(visitor: Visitor, context: any): void;
}
export declare class JSDocClassTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocClassTag;
}
export declare class JSDocEnumTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocEnumTag;
    typeExpression?: JSDocTypeExpression;
}
export declare class JSDocThisTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocThisTag;
    typeExpression?: JSDocTypeExpression;
}
export declare class JSDocTemplateTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocTemplateTag;
    constraint: JSDocTypeExpression | undefined;
    typeParameters: TypeParameterDeclaration[];
}
export declare class JSDocTypeTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocTypeTag;
    typeExpression: JSDocTypeExpression;
}
export declare class JSDocAugmentsTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocAugmentsTag;
    visit(visitor: Visitor, context: any): void;
}
export declare class ConstructSignatureDeclaration extends Node<ts.ConstructSignatureDeclaration> {
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class CallSignatureDeclaration extends Node<ts.CallSignatureDeclaration> {
    _typeElementBrand: any;
    kind: ts.SyntaxKind.CallSignature;
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class IndexSignatureDeclaration extends Node<ts.IndexSignatureDeclaration> {
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any): any;
}
export declare class MappedTypeNode extends Node<ts.MappedTypeNode> {
    readonlyToken: ReadonlyToken | PlusToken | MinusToken;
    typeParameter: TypeParameterDeclaration;
    questionToken: ts.QuestionToken | PlusToken | MinusToken;
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
    kind: ts.SyntaxKind.BinaryExpression;
    left: Expression;
    operatorToken: ts.BinaryOperatorToken;
    right: Expression;
    visit(visitor: Visitor, context: any): any;
}
export declare class AssignmentExpression<TOperator extends ts.AssignmentOperatorToken, Left extends LeftHandSideExpression> extends BinaryExpression {
    left: LeftHandSideExpression;
    operatorToken: TOperator;
    visit(visitor: Visitor, context: any): void;
}
export declare class ObjectDestructuringAssignment extends Node<ts.ObjectDestructuringAssignment> {
    left: ObjectLiteralExpression;
    visit(visitor: Visitor, context: any): void;
}
export declare class ArrayDestructuringAssignment extends Node<ts.ArrayDestructuringAssignment> {
    left: ArrayLiteralExpression;
    visit(visitor: Visitor, context: any): void;
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
    type: TypeNode;
    visit(visitor: Visitor, context: any): any;
}
export declare class IntersectionTypeNode extends Node<ts.IntersectionTypeNode> {
    visit(visitor: Visitor, context: any): any;
}
export declare class ThisTypeNode extends Node<ts.ThisTypeNode> {
    kind: ts.SyntaxKind.ThisType;
    visit(visitor: Visitor, context: any): any;
}
export declare class OtherStatement extends Node<ts.Node> {
    visit(visitor: Visitor, context: any): any;
}
export interface Visitor<C = any, O = any> {
    name: string;
    visitTypeQueryNode?(node: TypeQueryNode, context: C): O;
    visitModuleBlock?(node: ModuleBlock, context: C): O;
    visitJSDocNamespaceDeclaration?(node: JSDocNamespaceDeclaration, context: C): O;
    visitNamespaceDeclaration?(node: NamespaceDeclaration, context: C): O;
    visitModuleDeclaration?(node: ModuleDeclaration, context: C): O;
    visitOmittedExpression?(node: OmittedExpression, context: C): O;
    visitBindingElement?(node: BindingElement, context: C): O;
    visitOtherExpression?(node: OtherStatement, context: C): O;
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
    visitPropertyAssignment?(node: PropertyAssignment, context: C): O;
    visitSetAccessorDeclaration?(node: SetAccessorDeclaration, context: C): O;
    visitGetAccessorDeclaration?(node: GetAccessorDeclaration, context: C): O;
    visitCallExpression?(node: CallExpression, context: C): O;
    visitObjectLiteralExpression?(node: ObjectLiteralExpression, context: C): O;
    visitPropertyName?(node: PropertyName, context: C): O;
    visitPropertyDeclaration?(node: PropertyDeclaration, context: C): O;
    visitTypeNode?(node: TypeNode, context: C): O;
    visitExpression?(node: Expression, context: C): O;
    visitMethodDeclaration?(node: MethodDeclaration, context: C): O;
    visitTypeReferenceNode?(node: TypeReferenceNode, context: C): O;
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
export {};
