import * as ts from 'typescript';
export class TextRange {
    pos: number;
    end: number;
}
export abstract class Node<T extends ts.Node = ts.Node> {
    __name: string;
    kind: ts.SyntaxKind;
    flags: ts.NodeFlags;
    parent: Node;
    decorators: Decorator[] = [];
    modifiers: ts.Modifier[] = [];
    node: T;
    /**
     * 其他
     */
    docs: JSDoc[] = [];
    from: string;
    abstract visit(visitor: Visitor, context: any): any;

    get isExport() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword))
    }

    get isAbstract() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.AbstractKeyword))
    }

    get isAsync() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword))
    }

    get isConst() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.ConstKeyword))
    }

    get isDeclare() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.DeclareKeyword))
    }

    get isDefault() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword))
    }

    get isPublic() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.PublicKeyword))
    }

    get isPrivate() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword))
    }

    get isProtected() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.ProtectedKeyword))
    }

    get isReadonly() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.ReadonlyKeyword))
    }

    get isStatic() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword))
    }
}


export class TypeChecker {
    node: ts.TypeChecker;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeChecker) {
            return visitor.visitTypeChecker(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeChecker 方法`)
        }
    }
}

export class Program {
    node: ts.Program;
    typeChecker: TypeChecker;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitProgram 方法`)
        }
    }
}

export class LanguageService {
    node: ts.LanguageService;
    program: Program;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitLanguageService) {
            return visitor.visitLanguageService(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitLanguageService 方法`)
        }
    }

}

export class Diagnostic {
    node: ts.Diagnostic;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitDiagnostic) {
            return visitor.visitDiagnostic(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitDiagnostic 方法`)
        }
    }
}

export class Project {
    languageService: LanguageService;
    program: Program;
    typeChecker: TypeChecker;
    ambientModules: Symbol[] = [];
    sourceFiles: SourceFile[] = [];
    preEmitDiagnostics: Diagnostic[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitProject) {
            return visitor.visitProject(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitProject 方法`)
        }
    }
}

export class Type {
    visit(visitor: Visitor, context: any) {
        if (visitor.visitType) {
            return visitor.visitType(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitType 方法`)
        }
    }
}

export class SourceFile extends Node<ts.SourceFile> {
    statements: Statement[];
    fileName: string;
    text: string;
    moduleName: string;
    languageVariant: ts.LanguageVariant;
    isDeclarationFile: boolean;
    hasNoDefaultLib: boolean;
    languageVersion: ts.ScriptTarget;
    resolvedModules: Map<string, ts.ResolvedModuleFull> = new Map();
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSourceFile) {
            return visitor.visitSourceFile(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSourceFile 方法`)
        }
    }
}

/**
 * 无用的
 */
export type Statement = ClassDeclaration |
    ImportDeclaration | VariableStatement |
    FunctionDeclaration | InterfaceDeclaration |
    EnumDeclaration | TypeAliasDeclaration |
    ReturnStatement | IfStatement |
    SwitchStatement | ForOfStatement | ForInStatement |
    FunctionBody | ExpressionStatement | BreakStatement |
    ThrowStatement | DebuggerStatement | ExportDeclaration |
    ExportAssignment | EmptyStatement | ConditionalExpression |
    RegularExpressionLiteral | TaggedTemplateExpression |
    TryStatement | ImportEqualsDeclaration | OtherStatement
export class ClassLikeDeclarationBase extends Node<ts.ClassLikeDeclarationBase>{
    kind: ts.SyntaxKind.ClassDeclaration | ts.SyntaxKind.ClassExpression;
    name?: Identifier;
    typeParameters?: TypeParameterDeclaration[];
    heritageClauses?: HeritageClause[];
    members: ClassElement[];
    visit(visitor: Visitor, context: any) { }
}
export class ClassDeclaration extends Node<ts.ClassDeclaration> {
    members: (ClassElement | PropertyDeclaration | ConstructorDeclaration | MethodDeclaration | SemicolonClassElement | GetAccessorDeclaration | SetAccessorDeclaration | Decorator)[] = [];
    name: Identifier;
    typeParameters: TypeParameterDeclaration[] = [];
    heritageClauses: HeritageClause[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitClassDeclaration) {
            return visitor.visitClassDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitClassDeclaration 方法`)
        }
    }

    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null {
        return (visitor: Visitor): T | undefined | null => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else if (item.arguments.length === 0) {
                    return undefined;
                } else {
                    return item.arguments
                }
            }
            return null;
        }
    }
}

/**
 * 无用的
 */
export class ClassElement<T extends ts.ClassElement = ts.ClassElement> extends Node<T> {
    name: PropertyName;
    type: TypeNode;
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any): any {
        if (visitor.visitClassElement) {
            return visitor.visitClassElement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitClassElement 方法`)
        }
    }
}

export class PropertyDeclaration extends ClassElement<ts.PropertyDeclaration>{
    exclamationToken: ts.ExclamationToken;
    initializer: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPropertyDeclaration) {
            return visitor.visitPropertyDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPropertyDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null {
        return (visitor: Visitor): T | undefined | null => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else if (item.arguments.length === 0) {
                    return undefined;
                } else {
                    return item.arguments
                }
            }
            return null;
        }
    }
}
export class Identifier extends Node<ts.Identifier> {
    kind: ts.SyntaxKind.Identifier;
    originalKeywordKind?: ts.SyntaxKind;
    isInJSDocNamespace?: boolean;
    escapedText: ts.__String;
    text: string;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIdentifier) {
            return visitor.visitIdentifier(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIdentifier 方法`)
        }
    }
}
export class TypeParameterDeclaration extends Node<ts.TypeParameterDeclaration> {
    constraint: TypeNode;
    default: TypeNode;
    expression: Expression;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeParameterDeclaration) {
            return visitor.visitTypeParameterDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeParameterDeclaration 方法`)
        }
    }
}
export class Decorator extends Node<ts.Decorator> {
    expression: LeftHandSideExpression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitDecorator) {
            return visitor.visitDecorator(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitDecorator 方法`)
        }
    }
}
export class ShorthandPropertyAssignment extends Node<ts.ShorthandPropertyAssignment>{
    kind: ts.SyntaxKind.ShorthandPropertyAssignment;
    name: Identifier;
    questionToken?: ts.QuestionToken;
    exclamationToken?: ts.ExclamationToken;
    equalsToken?: ts.Token<ts.SyntaxKind.EqualsToken>;
    objectAssignmentInitializer?: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitShorthandPropertyAssignment) {
            return visitor.visitShorthandPropertyAssignment(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitShorthandPropertyAssignment 方法`)
        }
    }
}
export class SpreadAssignment extends Node<ts.SpreadAssignment>{
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSpreadAssignment) {
            return visitor.visitSpreadAssignment(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSpreadAssignment 方法`)
        }
    }
}
export type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;
export type ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;

export class PropertyAssignment extends Node<ts.PropertyAssignment>{
    initializer: Expression;
    name: PropertyName;
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPropertyAssignment) {
            return visitor.visitPropertyAssignment(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPropertyAssignment 方法`)
        }
    }
}
export class SetAccessorDeclaration extends Node<ts.SetAccessorDeclaration>{
    name: PropertyName;
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: ts.QuestionToken;
    exclamationToken: ts.ExclamationToken;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSetAccessorDeclaration) {
            return visitor.visitSetAccessorDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSetAccessorDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null {
        return (visitor: Visitor): T | undefined | null => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else if (item.arguments.length === 0) {
                    return undefined;
                } else {
                    return item.arguments
                }
            }
            return null;
        }
    }
}
export class GetAccessorDeclaration extends Node<ts.GetAccessorDeclaration>{
    name: PropertyName;
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: ts.QuestionToken;
    exclamationToken: ts.ExclamationToken;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitGetAccessorDeclaration) {
            return visitor.visitGetAccessorDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitGetAccessorDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null {
        return (visitor: Visitor): T | undefined | null => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else if (item.arguments.length === 0) {
                    return undefined;
                } else {
                    return item.arguments
                }
            }
            return null;
        }
    }
}
export class CallExpression extends Node<ts.CallExpression> {
    kind: ts.SyntaxKind.CallExpression;
    typeArguments: TypeNode[] = [];
    expression: LeftHandSideExpression;
    arguments: Expression[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitCallExpression) {
            return visitor.visitCallExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitCallExpression 方法`)
        }
    }
}
export class ObjectLiteralExpression extends Node<ts.ObjectLiteralExpression> {
    properties: ObjectLiteralElementLike[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitObjectLiteralExpression) {
            return visitor.visitObjectLiteralExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitObjectLiteralExpression 方法`)
        }
    }
}
export type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName;
export type TypeNode = TypeReferenceNode | TupleTypeNode | UnionTypeNode | KeywordTypeNode | FunctionTypeNode | MappedTypeNode | IndexedAccessTypeNode | TypeOperatorNode | TypeLiteralNode | ArrayTypeNode | LiteralTypeNode | TypePredicateNode | ImportTypeNode | ParenthesizedTypeNode | IntersectionTypeNode | ExpressionWithTypeArguments | JSDocNullableType;

export type Expression = StringLiteral |
    NumericLiteral | ObjectLiteralExpression | ArrayLiteralExpression |
    Identifier | AsExpression | AwaitExpression | ArrowFunction |
    BooleanLiteral | CallExpression | BinaryExpression |
    ElementAccessExpression | PropertyAccessExpression | PrefixUnaryExpression |
    TemplateExpression | NewExpression | ThisExpression | NoSubstitutionTemplateLiteral |
    ConditionalExpression | SpreadElement | TaggedTemplateExpression | ParenthesizedExpression |
    RegularExpressionLiteral | OtherExpression;

export class OtherExpression extends Node<ts.Expression>{
    visit(visitor: Visitor, context: any): any {
        if (visitor.visitOtherExpression) {
            return visitor.visitOtherExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitOtherExpression 方法`)
        }
    }
}
export class OmittedExpression extends Node<ts.OmittedExpression>{
    kind: ts.SyntaxKind.OmittedExpression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitOmittedExpression) {
            return visitor.visitOmittedExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitOmittedExpression 方法`)
        }
    }
}
export class MethodDeclaration extends Node<ts.MethodDeclaration>{
    body: FunctionBody;
    name: PropertyName;
    type: TypeNode;
    parameters: ParameterDeclaration[] = [];
    typeParameters: TypeParameterDeclaration[] = [];
    questionToken: ts.QuestionToken;

    _functionLikeDeclarationBrand: any;
    asteriskToken: ts.AsteriskToken;
    exclamationToken: ts.ExclamationToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitMethodDeclaration) {
            return visitor.visitMethodDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitMethodDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null {
        return (visitor: Visitor): T | undefined | null => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else if (item.arguments.length === 0) {
                    return undefined;
                } else {
                    return item.arguments
                }
            }
            return null;
        }
    }
}
export class TypeReferenceNode extends Node<ts.TypeReferenceNode>{
    typeArguments: TypeNode[] = [];
    typeName: EntityName;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeReferenceNode) {
            return visitor.visitTypeReferenceNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeReferenceNode 方法`)
        }
    }
}
export type EntityName = Identifier | QualifiedName;

export class QualifiedName extends Node<ts.QualifiedName>{
    kind: ts.SyntaxKind.QualifiedName;
    left: EntityName;
    right: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitQualifiedName) {
            return visitor.visitQualifiedName(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitQualifiedName 方法`)
        }
    }
}
export class StringLiteral extends Node<ts.StringLiteral>{
    text: string;
    isUnterminated: boolean;
    hasExtendedUnicodeEscape: boolean;
    kind: ts.SyntaxKind.StringLiteral;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitStringLiteral) {
            return visitor.visitStringLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitStringLiteral 方法`)
        }
    }
    create() {
        return this.text;
    }
}
export class NumericLiteral extends Node<ts.NumericLiteral>{
    text: string;
    isUnterminated: boolean;
    hasExtendedUnicodeEscape: boolean;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNumericLiteral) {
            return visitor.visitNumericLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNumericLiteral 方法`)
        }
    }
}
export class ComputedPropertyName extends Node<ts.ComputedPropertyName>{
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitComputedPropertyName) {
            return visitor.visitComputedPropertyName(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitComputedPropertyName 方法`)
        }
    }
}
export class SemicolonClassElement extends Node<ts.SemicolonClassElement>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSemicolonClassElement) {
            return visitor.visitSemicolonClassElement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSemicolonClassElement 方法`)
        }
    }
}
export class ConstructorDeclaration extends Node<ts.ConstructorDeclaration>{
    body: FunctionBody;
    asteriskToken: AsteriskToken;
    questionToken: ts.QuestionToken;
    exclamationToken: ts.ExclamationToken;
    name: PropertyName;
    parameters: ParameterDeclaration[] = [];
    typeParameters: TypeParameterDeclaration[] = [];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitConstructorDeclaration) {
            return visitor.visitConstructorDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitConstructorDeclaration 方法`)
        }
    }
}
export class AsteriskToken extends Node<ts.AsteriskToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitAsteriskToken) {
            return visitor.visitAsteriskToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitAsteriskToken 方法`)
        }
    }
}
export class Modifier extends Node<ts.Modifier>{
    name: 'static' | 'readonly' | 'declare'
        | 'protected' | 'private' | 'export'
        | 'default' | 'const' | 'async'
        | 'abstract' | 'public';
    visit(visitor: Visitor, context: any) {
        if (visitor.visitModifier) {
            return visitor.visitModifier(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitModifier 方法`)
        }
    }
}
export class FunctionBody extends Node<ts.FunctionBody> {
    statements: Statement[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitFunctionBody) {
            return visitor.visitFunctionBody(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitFunctionBody 方法`)
        }
    }
}
export class ParameterDeclaration extends Node<ts.ParameterDeclaration> {
    dotDotDotToken: ts.DotDotDotToken;
    name: BindingName;
    type: TypeNode;
    questionToken: ts.QuestionToken;
    initializer: Expression;
    index: number;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitParameterDeclaration) {
            return visitor.visitParameterDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitParameterDeclaration 方法`)
        }
    }
    getDecorator<T>(name: string): (visitor: Visitor) => T | undefined | null {
        return (visitor: Visitor): T | undefined | null => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                } else if (item.arguments.length === 0) {
                    return undefined;
                } else {
                    return item.arguments
                }
            }
            return null;
        }
    }
}
export class TupleTypeNode extends Node<ts.TupleTypeNode> {
    elementTypes: TypeNode[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTupleTypeNode) {
            return visitor.visitTupleTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTupleTypeNode 方法`)
        }
    }
}
export type ModuleName = Identifier | StringLiteral;
export type NamespaceBody = ModuleBlock | NamespaceDeclaration;
export type ModuleBody = NamespaceBody | JSDocNamespaceBody;
export type JSDocNamespaceBody = Identifier | JSDocNamespaceDeclaration;
export class ModuleDeclaration extends Node<ts.DeclarationStatement> {
    kind: ts.SyntaxKind.ModuleDeclaration;
    parent: ModuleBody | SourceFile;
    name: ModuleName;
    body?: ModuleBody | JSDocNamespaceDeclaration;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitModuleDeclaration) {
            return visitor.visitModuleDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitModuleDeclaration 方法`)
        }
    }
}
export class NamespaceDeclaration extends ModuleDeclaration {
    name: Identifier;
    body: NamespaceBody;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNamespaceDeclaration) {
            return visitor.visitNamespaceDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNamespaceDeclaration 方法`)
        }
    }
}
export class JSDocNamespaceDeclaration extends ModuleDeclaration {
    name: Identifier;
    body?: JSDocNamespaceBody;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitJSDocNamespaceDeclaration) {
            return visitor.visitJSDocNamespaceDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 JSDocNamespaceDeclaration 方法`)
        }
    }
}
export class ModuleBlock extends Node<ts.ModuleBlock> {
    kind: ts.SyntaxKind.ModuleBlock;
    statements: Statement[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitModuleBlock) {
            return visitor.visitModuleBlock(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitModuleBlock 方法`)
        }
    }
}
export class ImportDeclaration extends Node<ts.ImportDeclaration>{
    kind: ts.SyntaxKind.ImportDeclaration;
    moduleSpecifier: Expression;
    importClause: ImportClause;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportDeclaration) {
            return visitor.visitImportDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportDeclaration 方法`)
        }
    }
}

export class VariableStatement extends Node<ts.VariableStatement>{
    kind: ts.SyntaxKind.VariableStatement;
    declarationList: VariableDeclarationList;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitVariableStatement) {
            return visitor.visitVariableStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitVariableStatement 方法`)
        }
    }

}
export class FunctionDeclaration extends Node<ts.FunctionDeclaration>{
    body: FunctionBody;
    name: Identifier;
    parameters: ParameterDeclaration[];
    typeParameters: TypeParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitFunctionDeclaration) {
            return visitor.visitFunctionDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitFunctionDeclaration 方法`)
        }
    }

}
export class InterfaceDeclaration extends Node<ts.InterfaceDeclaration>{
    members: TypeElement[] = [];
    typeParameters: TypeParameterDeclaration[] = [];
    name: Identifier;
    heritageClauses: HeritageClause[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitInterfaceDeclaration) {
            return visitor.visitInterfaceDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitInterfaceDeclaration 方法`)
        }
    }
}
export class HeritageClause extends Node<ts.HeritageClause>{
    types: ExpressionWithTypeArguments[];
    kind: ts.SyntaxKind.HeritageClause;
    token: ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitHeritageClause) {
            return visitor.visitHeritageClause(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitHeritageClause 方法`)
        }
    }
}
export class EnumDeclaration extends Node<ts.EnumDeclaration>{
    members: EnumMember[] = [];
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitEnumDeclaration) {
            return visitor.visitEnumDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitEnumDeclaration 方法`)
        }
    }
}
export class TypeAliasDeclaration extends Node<ts.TypeAliasDeclaration>{
    name: Identifier;
    type: TypeNode;
    typeParameters: TypeParameterDeclaration[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeAliasDeclaration) {
            return visitor.visitTypeAliasDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeAliasDeclaration 方法`)
        }
    }
}
export class UnionTypeNode extends Node<ts.UnionTypeNode> {
    types: TypeNode[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitUnionTypeNode) {
            return visitor.visitUnionTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitUnionTypeNode 方法`)
        }
    }
}
export class TypeQueryNode extends Node<ts.TypeQueryNode>{
    exprName: EntityName;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeQueryNode) {
            return visitor.visitTypeQueryNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeQueryNode 方法`)
        }
    }
}
export class KeywordTypeNode extends Node<ts.KeywordTypeNode>{
    kind: ts.SyntaxKind.AnyKeyword | ts.SyntaxKind.UnknownKeyword | ts.SyntaxKind.NumberKeyword | ts.SyntaxKind.BigIntKeyword | ts.SyntaxKind.ObjectKeyword | ts.SyntaxKind.BooleanKeyword | ts.SyntaxKind.StringKeyword | ts.SyntaxKind.SymbolKeyword | ts.SyntaxKind.ThisKeyword | ts.SyntaxKind.VoidKeyword | ts.SyntaxKind.UndefinedKeyword | ts.SyntaxKind.NullKeyword | ts.SyntaxKind.NeverKeyword;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitKeywordTypeNode) {
            return visitor.visitKeywordTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitKeywordTypeNode 方法`)
        }
    }
}
export class EnumMember extends Node<ts.EnumMember>{
    name: PropertyName;
    initializer: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitEnumMember) {
            return visitor.visitEnumMember(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitEnumMember 方法`)
        }
    }
}
export type TypeElement = PropertySignature | MethodSignature | IndexSignatureDeclaration | ConstructSignatureDeclaration | CallSignatureDeclaration;

export class PropertySignature extends Node<ts.PropertySignature>{
    name: PropertyName;
    questionToken: ts.QuestionToken;
    type: TypeNode;
    initializer: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPropertySignature) {
            return visitor.visitPropertySignature(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPropertySignature 方法`)
        }
    }
}
export class FunctionTypeNode extends Node<ts.FunctionTypeNode>{
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitFunctionTypeNode) {
            return visitor.visitFunctionTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitFunctionTypeNode 方法`)
        }
    }
}

export class MethodSignature extends Node<ts.MethodSignature>{
    name: PropertyName;
    type: TypeNode;
    typeParameters: TypeParameterDeclaration[] = [];
    parameters: ParameterDeclaration[] = [];
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitMethodSignature) {
            return visitor.visitMethodSignature(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitMethodSignature 方法`)
        }
    }
}

export type BindingName = ObjectBindingPattern | ArrayBindingPattern | Identifier;
// export class BindingName extends Node<ts.BindingName>{
//     visit(visitor: Visitor, context: any) {
//         if (visitor.visitBindingName) {
//             return visitor.visitBindingName(this, context)
//         } else {
//             throw new Error(`${visitor.name} 没有 visitBindingName 方法`)
//         }
//     }
// }
export class ObjectBindingPattern extends Node<ts.ObjectBindingPattern>{
    elements: BindingElement[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitObjectBindingPattern) {
            return visitor.visitObjectBindingPattern(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitObjectBindingPattern 方法`)
        }
    }
}
export class BindingElement extends Node<ts.BindingElement>{
    kind: ts.SyntaxKind.BindingElement;
    propertyName?: PropertyName;
    dotDotDotToken?: ts.DotDotDotToken;
    name: BindingName;
    initializer?: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitBindingElement) {
            return visitor.visitBindingElement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitObjectBindingPattern 方法`)
        }
    }
}
type ArrayBindingElement = BindingElement | OmittedExpression;
export class ArrayBindingPattern extends Node<ts.ArrayBindingPattern>{
    elements: ArrayBindingElement[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitArrayBindingPattern) {
            return visitor.visitArrayBindingPattern(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitArrayBindingPattern 方法`)
        }
    }
}
export class ArrayLiteralExpression extends Node<ts.ArrayLiteralExpression>{
    elements: Expression[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitArrayLiteralExpression) {
            return visitor.visitArrayLiteralExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitArrayLiteralExpression 方法`)
        }
    }
}
export class ReturnStatement extends Node<ts.ReturnStatement>{
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitReturnStatement) {
            return visitor.visitReturnStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitReturnStatement 方法`)
        }
    }
}
export class AsExpression extends Node<ts.AsExpression>{
    type: TypeNode;
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitAsExpression) {
            return visitor.visitAsExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitAsExpression 方法`)
        }
    }
}
export class VariableDeclarationList extends Node<ts.VariableDeclarationList>{
    declarations: VariableDeclaration[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitVariableDeclarationList) {
            return visitor.visitVariableDeclarationList(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitVariableDeclarationList 方法`)
        }
    }
}
export class VariableDeclaration extends Node<ts.VariableDeclaration>{
    name: BindingName;
    exclamationToken: ts.ExclamationToken;
    type: TypeNode;
    initializer: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitVariableDeclaration) {
            return visitor.visitVariableDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitVariableDeclaration 方法`)
        }
    }
}
export class AwaitExpression extends Node<ts.AwaitExpression>{
    kind: ts.SyntaxKind.AwaitExpression;
    expression: UnaryExpression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitAwaitExpression) {
            return visitor.visitAwaitExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitAwaitExpression 方法`)
        }
    }
}
export class YieldExpression extends Node<ts.YieldExpression>{
    kind: ts.SyntaxKind.YieldExpression;
    asteriskToken: AsteriskToken;
    expression: Expression;
    visit(visitor: Visitor, context: any) {

    }
}
export class SyntheticExpression extends Node<ts.SyntheticExpression>{
    kind: ts.SyntaxKind.SyntheticExpression;
    isSpread: boolean;
    type: Type;
    visit(visitor: Visitor, context: any) {

    }
}
export class ArrowFunction extends Node<ts.ArrowFunction>{
    equalsGreaterThanToken: EqualsGreaterThanToken;
    body: ConciseBody;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitArrowFunction) {
            return visitor.visitArrowFunction(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitArrowFunction 方法`)
        }
    }
}
export class ConciseBody extends Node<ts.ConciseBody>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitConciseBody) {
            return visitor.visitConciseBody(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitConciseBody 方法`)
        }
    }
}
export class EqualsGreaterThanToken extends Node<ts.ConciseBody>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitEqualsGreaterThanToken) {
            return visitor.visitEqualsGreaterThanToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitEqualsGreaterThanToken 方法`)
        }
    }
}
export class BooleanLiteral extends Node<ts.BooleanLiteral>{
    kind: ts.SyntaxKind.TrueKeyword | ts.SyntaxKind.FalseKeyword;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitBooleanLiteral) {
            return visitor.visitBooleanLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitBooleanLiteral 方法`)
        }
    }
}
export class UnaryExpression extends Node<ts.UnaryExpression>{
    _unaryExpressionBrand: any;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitUnaryExpression) {
            return visitor.visitUnaryExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitUnaryExpression 方法`)
        }
    }
}
export class ElementAccessExpression extends Node<ts.ElementAccessExpression>{
    expression: LeftHandSideExpression;
    argumentExpression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitElementAccessExpression) {
            return visitor.visitElementAccessExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitElementAccessExpression 方法`)
        }
    }
}
export class ParenthesizedExpression extends Node<ts.ParenthesizedExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitParenthesizedExpression) {
            return visitor.visitParenthesizedExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitParenthesizedExpression 方法`)
        }
    }
}

export class SuperExpression extends Node<ts.SuperExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSuperExpression) {
            return visitor.visitSuperExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSuperExpression 方法`)
        }
    }
}

export class ThisExpression extends Node<ts.ThisExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitThisExpression) {
            return visitor.visitThisExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitThisExpression 方法`)
        }
    }
}
export class PropertyAccessExpression extends Node<ts.PropertyAccessExpression>{
    expression: LeftHandSideExpression;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPropertyAccessExpression) {
            return visitor.visitPropertyAccessExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPropertyAccessExpression 方法`)
        }
    }
}
export class PrefixUnaryExpression extends Node<ts.PrefixUnaryExpression>{
    kind: ts.SyntaxKind.PrefixUnaryExpression;
    operator: ts.PrefixUnaryOperator;
    operand: UnaryExpression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPrefixUnaryExpression) {
            return visitor.visitPrefixUnaryExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPrefixUnaryExpression 方法`)
        }
    }
}

export class NullLiteral extends Node<ts.PrefixUnaryExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNullLiteral) {
            return visitor.visitNullLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNullLiteral 方法`)
        }
    }
}

export class NoSubstitutionTemplateLiteral extends Node<ts.NoSubstitutionTemplateLiteral>{
    text: string;
    isUnterminated?: boolean;
    hasExtendedUnicodeEscape?: boolean;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNoSubstitutionTemplateLiteral) {
            return visitor.visitNoSubstitutionTemplateLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNoSubstitutionTemplateLiteral 方法`)
        }
    }
}

export class TemplateExpression extends Node<ts.TemplateExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTemplateExpression) {
            return visitor.visitTemplateExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTemplateExpression 方法`)
        }
    }
}

export class NewExpression extends Node<ts.NewExpression>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNewExpression) {
            return visitor.visitNewExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNewExpression 方法`)
        }
    }
}

export class IfStatement extends Node<ts.IfStatement>{
    expression: Expression;
    thenStatement: Statement;
    elseStatement: Statement;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIfStatement) {
            return visitor.visitIfStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIfStatement 方法`)
        }
    }
}
export class ForOfStatement extends Node<ts.ForOfStatement>{
    awaitModifier: AwaitKeywordToken;
    initializer: Expression | VariableDeclarationList;
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitForOfStatement) {
            return visitor.visitForOfStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitForOfStatement 方法`)
        }
    }
}
export class ForInitializer extends Node<ts.ForInitializer>{
    initializer: ForInitializer;
    condition: Expression;
    incrementor: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitForInitializer) {
            return visitor.visitForInitializer(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitForInitializer 方法`)
        }
    }
}
export class AwaitKeywordToken extends Node<ts.AwaitKeywordToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitAwaitKeywordToken) {
            return visitor.visitAwaitKeywordToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitAwaitKeywordToken 方法`)
        }
    }
}
export class ForInStatement extends Node<ts.ForInStatement>{
    kind: ts.SyntaxKind.ForInStatement;
    initializer: Expression | VariableDeclarationList;
    expression: Expression;
    statement: Statement;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitForInStatement) {
            return visitor.visitForInStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitForInStatement 方法`)
        }
    }
}
export class SwitchStatement extends Node<ts.SwitchStatement>{
    kind: ts.SyntaxKind.SwitchStatement;
    expression: Expression;
    caseBlock: CaseBlock;
    possiblyExhaustive: boolean;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSwitchStatement) {
            return visitor.visitSwitchStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSwitchStatement 方法`)
        }
    }
}
export class CaseBlock extends Node<ts.CaseBlock>{
    kind: ts.SyntaxKind.CaseBlock;
    parent: SwitchStatement;
    clauses: CaseOrDefaultClause[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitCaseBlock) {
            return visitor.visitCaseBlock(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitCaseBlock 方法`)
        }
    }
}
export type CaseOrDefaultClause = CaseClause | DefaultClause;
export class CaseClause extends Node<ts.CaseClause>{
    kind: ts.SyntaxKind.CaseClause;
    parent: CaseBlock;
    expression: Expression;
    statements: Statement[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitCaseClause) {
            return visitor.visitCaseClause(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitCaseClause 方法`)
        }
    }
}
export class DefaultClause extends Node<ts.DefaultClause>{
    statements: Statement[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitDefaultClause) {
            return visitor.visitDefaultClause(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitDefaultClause 方法`)
        }
    }
}
export class ImportClause extends Node<ts.ImportClause>{
    namedBindings: NamedImportBindings;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportClause) {
            return visitor.visitImportClause(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportClause 方法`)
        }
    }
}
export type NamedImportBindings = NamespaceImport | NamedImports

export class NamespaceImport extends Node<ts.NamespaceImport>{
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNamespaceImport) {
            return visitor.visitNamespaceImport(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNamespaceImport 方法`)
        }
    }
}
export class NamedImports extends Node<ts.NamedImports>{
    elements: ImportSpecifier[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNamedImports) {
            return visitor.visitNamedImports(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNamedImports 方法`)
        }
    }
}
export class ImportSpecifier extends Node<ts.ImportSpecifier>{
    propertyName: Identifier;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportSpecifier) {
            return visitor.visitImportSpecifier(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportSpecifier 方法`)
        }
    }
}
export class LeftHandSideExpression extends Node<ts.LeftHandSideExpression> {
    _leftHandSideExpressionBrand: any;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitLeftHandSideExpression) {
            return visitor.visitLeftHandSideExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitLeftHandSideExpression 方法`)
        }
    }
}

export class ExpressionWithTypeArguments extends Node<ts.ExpressionWithTypeArguments>{
    expression: LeftHandSideExpression;
    typeArguments: TypeNode[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExpressionWithTypeArguments) {
            return visitor.visitExpressionWithTypeArguments(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExpressionWithTypeArguments 方法`)
        }
    }
}

export class JSDocNullableType extends Node<ts.JSDocNullableType>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitJSDocNullableType) {
            return visitor.visitJSDocNullableType(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitJSDocNullableType 方法`)
        }
    }
}
export class ExpressionStatement extends Node<ts.ExpressionStatement>{
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExpressionStatement) {
            return visitor.visitExpressionStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExpressionStatement 方法`)
        }
    }
}

export class BreakStatement extends Node<ts.BreakStatement>{
    label: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitBreakStatement) {
            return visitor.visitBreakStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitBreakStatement 方法`)
        }
    }
}

export class ThrowStatement extends Node<ts.ThrowStatement>{
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitThrowStatement) {
            return visitor.visitThrowStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitThrowStatement 方法`)
        }
    }
}

export class DebuggerStatement extends Node<ts.DebuggerStatement>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitDebuggerStatement) {
            return visitor.visitDebuggerStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitDebuggerStatement 方法`)
        }
    }
}

export class ExportDeclaration extends Node<ts.ExportDeclaration>{
    exportClause: NamedExports;
    moduleSpecifier: Expression;
    name: Identifier | NumericLiteral | StringLiteral;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExportDeclaration) {
            return visitor.visitExportDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExportDeclaration 方法`)
        }
    }
}

export class Symbol {
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSymbol) {
            return visitor.visitSymbol(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSymbol 方法`)
        }
    }
}

export class NamedExports extends Node<ts.NamedExports>{
    elements: ExportSpecifier[];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitNamedExports) {
            return visitor.visitNamedExports(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitNamedExports 方法`)
        }
    }
}

export class ExportSpecifier extends Node<ts.ExportSpecifier>{
    propertyName: Identifier;
    name: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExportSpecifier) {
            return visitor.visitExportSpecifier(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExportSpecifier 方法`)
        }
    }
}

export class ExportAssignment extends Node<ts.ExportAssignment>{
    kind: ts.SyntaxKind.ExportAssignment;
    isExportEquals: boolean;
    expression: Expression;
    name: Identifier | StringLiteral | NumericLiteral;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitExportAssignment) {
            return visitor.visitExportAssignment(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitExportAssignment 方法`)
        }
    }
}
export class ConditionalExpression extends Node<ts.ConditionalExpression>{
    kind: ts.SyntaxKind.ConditionalExpression;
    condition: Expression;
    questionToken: ts.QuestionToken;
    whenTrue: Expression;
    colonToken: ts.ColonToken;
    whenFalse: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitConditionalExpression) {
            return visitor.visitConditionalExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitConditionalExpression 方法`)
        }
    }
}
export class FunctionExpression extends Node<ts.FunctionExpression>{
    kind: ts.SyntaxKind.FunctionExpression;
    name?: Identifier;
    body: FunctionBody;
    visit(visitor: Visitor, context: any) { }
}
export class SpreadElement extends Node<ts.SpreadElement>{
    kind: ts.SyntaxKind.SpreadElement;
    parent: ArrayLiteralExpression | CallExpression | NewExpression;
    expression: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitSpreadElement) {
            return visitor.visitSpreadElement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitSpreadElement 方法`)
        }
    }
}
export class EmptyStatement extends Node<ts.EmptyStatement>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitEmptyStatement) {
            return visitor.visitEmptyStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitEmptyStatement 方法`)
        }
    }
}
export class RegularExpressionLiteral extends Node<ts.RegularExpressionLiteral>{
    text: string;
    isUnterminated?: boolean;
    hasExtendedUnicodeEscape?: boolean;
    kind: ts.SyntaxKind.RegularExpressionLiteral;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitRegularExpressionLiteral) {
            return visitor.visitRegularExpressionLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitRegularExpressionLiteral 方法`)
        }
    }
}
type TemplateLiteral = TemplateExpression | NoSubstitutionTemplateLiteral;
export class TaggedTemplateExpression extends Node<ts.TaggedTemplateExpression>{
    kind: ts.SyntaxKind.TaggedTemplateExpression;
    tag: LeftHandSideExpression;
    typeArguments?: TypeNode[];
    template: TemplateLiteral;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTaggedTemplateExpression) {
            return visitor.visitTaggedTemplateExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTaggedTemplateExpression 方法`)
        }
    }
}

export class TryStatement extends Node<ts.TryStatement>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTryStatement) {
            return visitor.visitTryStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTryStatement 方法`)
        }
    }
}

export class ImportEqualsDeclaration extends Node<ts.ImportEqualsDeclaration>{
    name: Identifier;
    moduleReference: ModuleReference;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportEqualsDeclaration) {
            return visitor.visitImportEqualsDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportEqualsDeclaration 方法`)
        }
    }
}
type ModuleReference = EntityName | ExternalModuleReference;

export class ExternalModuleReference extends Node<ts.ExternalModuleReference>{
    kind: ts.SyntaxKind.ExternalModuleReference;
    parent: ImportEqualsDeclaration;
    expression: Expression;
    visit(visitor: Visitor, context: any) { }
}
export class ContinueStatement extends Node<ts.ContinueStatement>{
    kind: ts.SyntaxKind.ContinueStatement;
    label: Identifier;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitContinueStatement) {
            return visitor.visitContinueStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitContinueStatement 方法`)
        }
    }
}

export class JSDoc extends Node<ts.JSDoc>{
    comment: string;
    tags: JSDocTag[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitJSDoc) {
            return visitor.visitJSDoc(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitJSDoc 方法`)
        }
    }
}
export class JSDocTypeExpression extends Node<ts.JSDocTypeExpression>{
    kind: ts.SyntaxKind.JSDocTypeExpression;
    type: TypeNode;
    visit(visitor: Visitor, context: any) { }
}
export class JSDocPropertyLikeTag extends Node<ts.JSDocPropertyLikeTag>{
    parent: JSDoc;
    name: EntityName;
    typeExpression?: JSDocTypeExpression;
    isNameFirst: boolean;
    isBracketed: boolean;
    visit(visitor: Visitor, context: any) { }
}
export class JSDocTypeLiteral extends Node<ts.JSDocTypeLiteral>{
    kind: ts.SyntaxKind.JSDocTypeLiteral;
    jsDocPropertyTags: JSDocPropertyLikeTag[] = [];
    isArrayType?: boolean;
    visit(visitor: Visitor, context: any) { }
}
export class JSDocTag extends Node<ts.JSDocTag>{
    tagName: Identifier;
    comment: string;
    parent: JSDoc | JSDocTypeLiteral;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitJSDocTag) {
            return visitor.visitJSDocTag(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitJSDocTag 方法`)
        }
    }
}
export class JSDocReturnTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocReturnTag;
    typeExpression?: JSDocTypeExpression;
    visit(visitor: Visitor, context: any) { }
}
export class JSDocUnknownTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocTag;
    visit(visitor: Visitor, context: any) {

    }
}
export class JSDocClassTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocClassTag;
}
export class JSDocEnumTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocEnumTag;
    typeExpression?: JSDocTypeExpression;
}
export class JSDocThisTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocThisTag;
    typeExpression?: JSDocTypeExpression;
}
export class JSDocTemplateTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocTemplateTag;
    constraint: JSDocTypeExpression | undefined;
    typeParameters: TypeParameterDeclaration[];
}

export class JSDocTypeTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocTypeTag;
    typeExpression: JSDocTypeExpression;
}
export class JSDocAugmentsTag extends JSDocTag {
    kind: ts.SyntaxKind.JSDocAugmentsTag;
    visit(visitor: Visitor, context: any) {

    }
}

export class ConstructSignatureDeclaration extends Node<ts.ConstructSignatureDeclaration>{
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[] = [];
    parameters: ParameterDeclaration[] = [];
    type: TypeNode;
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitConstructSignatureDeclaration) {
            return visitor.visitConstructSignatureDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitConstructSignatureDeclaration 方法`)
        }
    }
}

export class CallSignatureDeclaration extends Node<ts.CallSignatureDeclaration>{
    _typeElementBrand: any;
    kind: ts.SyntaxKind.CallSignature;
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[] = [];
    parameters: ParameterDeclaration[] = [];
    type: TypeNode;
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitCallSignatureDeclaration) {
            return visitor.visitCallSignatureDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitCallSignatureDeclaration 方法`)
        }
    }
}
export class IndexSignatureDeclaration extends Node<ts.IndexSignatureDeclaration>{
    name: PropertyName;
    typeParameters: TypeParameterDeclaration[];
    parameters: ParameterDeclaration[];
    type: TypeNode;
    questionToken: ts.QuestionToken;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIndexSignatureDeclaration) {
            return visitor.visitIndexSignatureDeclaration(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIndexSignatureDeclaration 方法`)
        }
    }
}

export class MappedTypeNode extends Node<ts.MappedTypeNode>{
    readonlyToken: ReadonlyToken | PlusToken | MinusToken;
    typeParameter: TypeParameterDeclaration;
    questionToken: ts.QuestionToken | PlusToken | MinusToken;
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitMappedTypeNode) {
            return visitor.visitMappedTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitMappedTypeNode 方法`)
        }
    }
}

export class MinusToken extends Node<ts.ReadonlyToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitMinusToken) {
            return visitor.visitMinusToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitMinusToken 方法`)
        }
    }
}

export class PlusToken extends Node<ts.ReadonlyToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitPlusToken) {
            return visitor.visitPlusToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitPlusToken 方法`)
        }
    }
}

export class ReadonlyToken extends Node<ts.ReadonlyToken>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitReadonlyToken) {
            return visitor.visitReadonlyToken(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitReadonlyToken 方法`)
        }
    }
}

export class IndexedAccessTypeNode extends Node<ts.IndexedAccessTypeNode>{
    objectType: TypeNode;
    indexType: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIndexedAccessTypeNode) {
            return visitor.visitIndexedAccessTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIndexedAccessTypeNode 方法`)
        }
    }
}

export class TypeOperatorNode extends Node<ts.TypeOperatorNode>{
    operator: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.UniqueKeyword | ts.SyntaxKind.ReadonlyKeyword;
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeOperatorNode) {
            return visitor.visitTypeOperatorNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeOperatorNode 方法`)
        }
    }
}

export class BinaryExpression extends Node<ts.BinaryExpression>{
    kind: ts.SyntaxKind.BinaryExpression;
    left: Expression;
    operatorToken: ts.BinaryOperatorToken;
    right: Expression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitBinaryExpression) {
            return visitor.visitBinaryExpression(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitBinaryExpression 方法`)
        }
    }
}
export class AssignmentExpression<TOperator extends ts.AssignmentOperatorToken, Left extends LeftHandSideExpression> extends BinaryExpression {
    left: LeftHandSideExpression;
    operatorToken: TOperator;
    visit(visitor: Visitor, context: any) { }
}
export class ObjectDestructuringAssignment extends Node<ts.ObjectDestructuringAssignment> {
    left: ObjectLiteralExpression;
    visit(visitor: Visitor, context: any) { }
}
export class ArrayDestructuringAssignment extends Node<ts.ArrayDestructuringAssignment> {
    left: ArrayLiteralExpression;
    visit(visitor: Visitor, context: any) { }
}
export class ArrayTypeNode extends Node<ts.ArrayTypeNode>{
    elementType: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitArrayTypeNode) {
            return visitor.visitArrayTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitArrayTypeNode 方法`)
        }
    }
}

export class LiteralTypeNode extends Node<ts.LiteralTypeNode>{
    literal: BooleanLiteral | LiteralExpression | PrefixUnaryExpression;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitLiteralTypeNode) {
            return visitor.visitLiteralTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitLiteralTypeNode 方法`)
        }
    }
}
export type LiteralExpression = NumericLiteral | BigIntLiteral | RegularExpressionLiteral | NoSubstitutionTemplateLiteral;
export class BigIntLiteral extends Node<ts.BigIntLiteral>{
    text: string;
    isUnterminated: boolean;
    hasExtendedUnicodeEscape: boolean;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitBigIntLiteral) {
            return visitor.visitBigIntLiteral(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitBigIntLiteral 方法`)
        }
    }
}

export class TypeLiteralNode extends Node<ts.TypeLiteralNode>{
    members: TypeElement[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypeLiteralNode) {
            return visitor.visitTypeLiteralNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypeLiteralNode 方法`)
        }
    }
}
export class TypePredicateNode extends Node<ts.TypePredicateNode>{
    parameterName: Identifier | ThisTypeNode;
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitTypePredicateNode) {
            return visitor.visitTypePredicateNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitTypePredicateNode 方法`)
        }
    }
}
export class ImportTypeNode extends Node<ts.ImportTypeNode>{
    isTypeOf: boolean;
    argument: TypeNode;
    qualifier: EntityName;
    typeArguments: TypeNode[] = [];
    visit(visitor: Visitor, context: any) {
        if (visitor.visitImportTypeNode) {
            return visitor.visitImportTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitImportTypeNode 方法`)
        }
    }
}
export class ParenthesizedTypeNode extends Node<ts.ParenthesizedTypeNode>{
    type: TypeNode;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitParenthesizedTypeNode) {
            return visitor.visitParenthesizedTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitParenthesizedTypeNode 方法`)
        }
    }
}
export class IntersectionTypeNode extends Node<ts.IntersectionTypeNode>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitIntersectionTypeNode) {
            return visitor.visitIntersectionTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitIntersectionTypeNode 方法`)
        }
    }
}

export class ThisTypeNode extends Node<ts.ThisTypeNode>{
    kind: ts.SyntaxKind.ThisType;
    visit(visitor: Visitor, context: any) {
        if (visitor.visitThisTypeNode) {
            return visitor.visitThisTypeNode(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitThisTypeNode 方法`)
        }
    }
}
export class OtherStatement extends Node<ts.Node>{
    visit(visitor: Visitor, context: any) {
        if (visitor.visitOtherStatement) {
            return visitor.visitOtherStatement(this, context)
        } else {
            throw new Error(`${visitor.name} 没有 visitOtherStatement 方法`)
        }
    }
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