"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
class TextRange {
}
exports.TextRange = TextRange;
class Node {
    constructor() {
        this.decorators = [];
        this.modifiers = [];
        /**
         * 其他
         */
        this.docs = [];
    }
    get isExport() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword));
    }
    get isAbstract() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.AbstractKeyword));
    }
    get isAsync() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword));
    }
    get isConst() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.ConstKeyword));
    }
    get isDeclare() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.DeclareKeyword));
    }
    get isDefault() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword));
    }
    get isPublic() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.PublicKeyword));
    }
    get isPrivate() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.PrivateKeyword));
    }
    get isProtected() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.ProtectedKeyword));
    }
    get isReadonly() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.ReadonlyKeyword));
    }
    get isStatic() {
        return !!(this.modifiers && this.modifiers.find(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword));
    }
}
exports.Node = Node;
class TypeChecker {
    visit(visitor, context) {
        if (visitor.visitTypeChecker) {
            return visitor.visitTypeChecker(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTypeChecker 方法`);
        }
    }
}
exports.TypeChecker = TypeChecker;
class Program {
    visit(visitor, context) {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitProgram 方法`);
        }
    }
}
exports.Program = Program;
class LanguageService {
    visit(visitor, context) {
        if (visitor.visitLanguageService) {
            return visitor.visitLanguageService(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitLanguageService 方法`);
        }
    }
}
exports.LanguageService = LanguageService;
class Diagnostic {
    visit(visitor, context) {
        if (visitor.visitDiagnostic) {
            return visitor.visitDiagnostic(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitDiagnostic 方法`);
        }
    }
}
exports.Diagnostic = Diagnostic;
class Project {
    constructor() {
        this.ambientModules = [];
        this.sourceFiles = [];
        this.preEmitDiagnostics = [];
    }
    visit(visitor, context) {
        if (visitor.visitProject) {
            return visitor.visitProject(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitProject 方法`);
        }
    }
}
exports.Project = Project;
class Type {
    visit(visitor, context) {
        if (visitor.visitType) {
            return visitor.visitType(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitType 方法`);
        }
    }
}
exports.Type = Type;
class SourceFile extends Node {
    constructor() {
        super(...arguments);
        this.resolvedModules = new Map();
    }
    visit(visitor, context) {
        if (visitor.visitSourceFile) {
            return visitor.visitSourceFile(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitSourceFile 方法`);
        }
    }
}
exports.SourceFile = SourceFile;
class ClassLikeDeclarationBase extends Node {
    visit(visitor, context) { }
}
exports.ClassLikeDeclarationBase = ClassLikeDeclarationBase;
class ClassDeclaration extends Node {
    constructor() {
        super(...arguments);
        this.members = [];
        this.typeParameters = [];
        this.heritageClauses = [];
    }
    visit(visitor, context) {
        if (visitor.visitClassDeclaration) {
            return visitor.visitClassDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitClassDeclaration 方法`);
        }
    }
    getDecorator(name) {
        return (visitor) => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                }
                else if (item.arguments.length === 0) {
                    return undefined;
                }
                else {
                    return item.arguments;
                }
            }
            return null;
        };
    }
}
exports.ClassDeclaration = ClassDeclaration;
/**
 * 无用的
 */
class ClassElement extends Node {
    visit(visitor, context) {
        if (visitor.visitClassElement) {
            return visitor.visitClassElement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitClassElement 方法`);
        }
    }
}
exports.ClassElement = ClassElement;
class PropertyDeclaration extends ClassElement {
    visit(visitor, context) {
        if (visitor.visitPropertyDeclaration) {
            return visitor.visitPropertyDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitPropertyDeclaration 方法`);
        }
    }
    getDecorator(name) {
        return (visitor) => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                }
                else if (item.arguments.length === 0) {
                    return undefined;
                }
                else {
                    return item.arguments;
                }
            }
            return null;
        };
    }
}
exports.PropertyDeclaration = PropertyDeclaration;
class Identifier extends Node {
    visit(visitor, context) {
        if (visitor.visitIdentifier) {
            return visitor.visitIdentifier(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitIdentifier 方法`);
        }
    }
}
exports.Identifier = Identifier;
class TypeParameterDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitTypeParameterDeclaration) {
            return visitor.visitTypeParameterDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTypeParameterDeclaration 方法`);
        }
    }
}
exports.TypeParameterDeclaration = TypeParameterDeclaration;
class Decorator extends Node {
    visit(visitor, context) {
        if (visitor.visitDecorator) {
            return visitor.visitDecorator(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitDecorator 方法`);
        }
    }
}
exports.Decorator = Decorator;
class ShorthandPropertyAssignment extends Node {
    visit(visitor, context) {
        if (visitor.visitShorthandPropertyAssignment) {
            return visitor.visitShorthandPropertyAssignment(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitShorthandPropertyAssignment 方法`);
        }
    }
}
exports.ShorthandPropertyAssignment = ShorthandPropertyAssignment;
class SpreadAssignment extends Node {
    visit(visitor, context) {
        if (visitor.visitSpreadAssignment) {
            return visitor.visitSpreadAssignment(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitSpreadAssignment 方法`);
        }
    }
}
exports.SpreadAssignment = SpreadAssignment;
class PropertyAssignment extends Node {
    visit(visitor, context) {
        if (visitor.visitPropertyAssignment) {
            return visitor.visitPropertyAssignment(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitPropertyAssignment 方法`);
        }
    }
}
exports.PropertyAssignment = PropertyAssignment;
class SetAccessorDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitSetAccessorDeclaration) {
            return visitor.visitSetAccessorDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitSetAccessorDeclaration 方法`);
        }
    }
    getDecorator(name) {
        return (visitor) => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                }
                else if (item.arguments.length === 0) {
                    return undefined;
                }
                else {
                    return item.arguments;
                }
            }
            return null;
        };
    }
}
exports.SetAccessorDeclaration = SetAccessorDeclaration;
class GetAccessorDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitGetAccessorDeclaration) {
            return visitor.visitGetAccessorDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitGetAccessorDeclaration 方法`);
        }
    }
    getDecorator(name) {
        return (visitor) => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                }
                else if (item.arguments.length === 0) {
                    return undefined;
                }
                else {
                    return item.arguments;
                }
            }
            return null;
        };
    }
}
exports.GetAccessorDeclaration = GetAccessorDeclaration;
class CallExpression extends Node {
    constructor() {
        super(...arguments);
        this.typeArguments = [];
        this.arguments = [];
    }
    visit(visitor, context) {
        if (visitor.visitCallExpression) {
            return visitor.visitCallExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitCallExpression 方法`);
        }
    }
}
exports.CallExpression = CallExpression;
class ObjectLiteralExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitObjectLiteralExpression) {
            return visitor.visitObjectLiteralExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitObjectLiteralExpression 方法`);
        }
    }
}
exports.ObjectLiteralExpression = ObjectLiteralExpression;
class OtherExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitOtherExpression) {
            return visitor.visitOtherExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitOtherExpression 方法`);
        }
    }
}
exports.OtherExpression = OtherExpression;
class OmittedExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitOmittedExpression) {
            return visitor.visitOmittedExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitOmittedExpression 方法`);
        }
    }
}
exports.OmittedExpression = OmittedExpression;
class MethodDeclaration extends Node {
    constructor() {
        super(...arguments);
        this.parameters = [];
        this.typeParameters = [];
    }
    visit(visitor, context) {
        if (visitor.visitMethodDeclaration) {
            return visitor.visitMethodDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitMethodDeclaration 方法`);
        }
    }
    getDecorator(name) {
        return (visitor) => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                }
                else if (item.arguments.length === 0) {
                    return undefined;
                }
                else {
                    return item.arguments;
                }
            }
            return null;
        };
    }
}
exports.MethodDeclaration = MethodDeclaration;
class TypeReferenceNode extends Node {
    constructor() {
        super(...arguments);
        this.typeArguments = [];
    }
    visit(visitor, context) {
        if (visitor.visitTypeReferenceNode) {
            return visitor.visitTypeReferenceNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTypeReferenceNode 方法`);
        }
    }
}
exports.TypeReferenceNode = TypeReferenceNode;
class QualifiedName extends Node {
    visit(visitor, context) {
        if (visitor.visitQualifiedName) {
            return visitor.visitQualifiedName(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitQualifiedName 方法`);
        }
    }
}
exports.QualifiedName = QualifiedName;
class StringLiteral extends Node {
    visit(visitor, context) {
        if (visitor.visitStringLiteral) {
            return visitor.visitStringLiteral(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitStringLiteral 方法`);
        }
    }
    create() {
        return this.text;
    }
}
exports.StringLiteral = StringLiteral;
class NumericLiteral extends Node {
    visit(visitor, context) {
        if (visitor.visitNumericLiteral) {
            return visitor.visitNumericLiteral(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitNumericLiteral 方法`);
        }
    }
}
exports.NumericLiteral = NumericLiteral;
class ComputedPropertyName extends Node {
    visit(visitor, context) {
        if (visitor.visitComputedPropertyName) {
            return visitor.visitComputedPropertyName(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitComputedPropertyName 方法`);
        }
    }
}
exports.ComputedPropertyName = ComputedPropertyName;
class SemicolonClassElement extends Node {
    visit(visitor, context) {
        if (visitor.visitSemicolonClassElement) {
            return visitor.visitSemicolonClassElement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitSemicolonClassElement 方法`);
        }
    }
}
exports.SemicolonClassElement = SemicolonClassElement;
class ConstructorDeclaration extends Node {
    constructor() {
        super(...arguments);
        this.parameters = [];
        this.typeParameters = [];
    }
    visit(visitor, context) {
        if (visitor.visitConstructorDeclaration) {
            return visitor.visitConstructorDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitConstructorDeclaration 方法`);
        }
    }
}
exports.ConstructorDeclaration = ConstructorDeclaration;
class AsteriskToken extends Node {
    visit(visitor, context) {
        if (visitor.visitAsteriskToken) {
            return visitor.visitAsteriskToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitAsteriskToken 方法`);
        }
    }
}
exports.AsteriskToken = AsteriskToken;
class Modifier extends Node {
    visit(visitor, context) {
        if (visitor.visitModifier) {
            return visitor.visitModifier(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitModifier 方法`);
        }
    }
}
exports.Modifier = Modifier;
class FunctionBody extends Node {
    visit(visitor, context) {
        if (visitor.visitFunctionBody) {
            return visitor.visitFunctionBody(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitFunctionBody 方法`);
        }
    }
}
exports.FunctionBody = FunctionBody;
class ParameterDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitParameterDeclaration) {
            return visitor.visitParameterDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitParameterDeclaration 方法`);
        }
    }
    getDecorator(name) {
        return (visitor) => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const item = decorators.find(dec => dec.name === name);
            if (item) {
                if (item.arguments.length === 1) {
                    return item.arguments[0];
                }
                else if (item.arguments.length === 0) {
                    return undefined;
                }
                else {
                    return item.arguments;
                }
            }
            return null;
        };
    }
}
exports.ParameterDeclaration = ParameterDeclaration;
class TupleTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitTupleTypeNode) {
            return visitor.visitTupleTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTupleTypeNode 方法`);
        }
    }
}
exports.TupleTypeNode = TupleTypeNode;
class ModuleDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitModuleDeclaration) {
            return visitor.visitModuleDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitModuleDeclaration 方法`);
        }
    }
}
exports.ModuleDeclaration = ModuleDeclaration;
class NamespaceDeclaration extends ModuleDeclaration {
    visit(visitor, context) {
        if (visitor.visitNamespaceDeclaration) {
            return visitor.visitNamespaceDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitNamespaceDeclaration 方法`);
        }
    }
}
exports.NamespaceDeclaration = NamespaceDeclaration;
class JSDocNamespaceDeclaration extends ModuleDeclaration {
    visit(visitor, context) {
        if (visitor.visitJSDocNamespaceDeclaration) {
            return visitor.visitJSDocNamespaceDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 JSDocNamespaceDeclaration 方法`);
        }
    }
}
exports.JSDocNamespaceDeclaration = JSDocNamespaceDeclaration;
class ModuleBlock extends Node {
    constructor() {
        super(...arguments);
        this.statements = [];
    }
    visit(visitor, context) {
        if (visitor.visitModuleBlock) {
            return visitor.visitModuleBlock(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitModuleBlock 方法`);
        }
    }
}
exports.ModuleBlock = ModuleBlock;
class ImportDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitImportDeclaration) {
            return visitor.visitImportDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitImportDeclaration 方法`);
        }
    }
}
exports.ImportDeclaration = ImportDeclaration;
class VariableStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitVariableStatement) {
            return visitor.visitVariableStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitVariableStatement 方法`);
        }
    }
}
exports.VariableStatement = VariableStatement;
class FunctionDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitFunctionDeclaration) {
            return visitor.visitFunctionDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitFunctionDeclaration 方法`);
        }
    }
}
exports.FunctionDeclaration = FunctionDeclaration;
class InterfaceDeclaration extends Node {
    constructor() {
        super(...arguments);
        this.members = [];
        this.typeParameters = [];
        this.heritageClauses = [];
    }
    visit(visitor, context) {
        if (visitor.visitInterfaceDeclaration) {
            return visitor.visitInterfaceDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitInterfaceDeclaration 方法`);
        }
    }
}
exports.InterfaceDeclaration = InterfaceDeclaration;
class HeritageClause extends Node {
    visit(visitor, context) {
        if (visitor.visitHeritageClause) {
            return visitor.visitHeritageClause(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitHeritageClause 方法`);
        }
    }
}
exports.HeritageClause = HeritageClause;
class EnumDeclaration extends Node {
    constructor() {
        super(...arguments);
        this.members = [];
    }
    visit(visitor, context) {
        if (visitor.visitEnumDeclaration) {
            return visitor.visitEnumDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitEnumDeclaration 方法`);
        }
    }
}
exports.EnumDeclaration = EnumDeclaration;
class TypeAliasDeclaration extends Node {
    constructor() {
        super(...arguments);
        this.typeParameters = [];
    }
    visit(visitor, context) {
        if (visitor.visitTypeAliasDeclaration) {
            return visitor.visitTypeAliasDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTypeAliasDeclaration 方法`);
        }
    }
}
exports.TypeAliasDeclaration = TypeAliasDeclaration;
class UnionTypeNode extends Node {
    constructor() {
        super(...arguments);
        this.types = [];
    }
    visit(visitor, context) {
        if (visitor.visitUnionTypeNode) {
            return visitor.visitUnionTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitUnionTypeNode 方法`);
        }
    }
}
exports.UnionTypeNode = UnionTypeNode;
class TypeQueryNode extends Node {
    visit(visitor, context) {
        if (visitor.visitTypeQueryNode) {
            return visitor.visitTypeQueryNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTypeQueryNode 方法`);
        }
    }
}
exports.TypeQueryNode = TypeQueryNode;
class KeywordTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitKeywordTypeNode) {
            return visitor.visitKeywordTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitKeywordTypeNode 方法`);
        }
    }
}
exports.KeywordTypeNode = KeywordTypeNode;
class EnumMember extends Node {
    visit(visitor, context) {
        if (visitor.visitEnumMember) {
            return visitor.visitEnumMember(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitEnumMember 方法`);
        }
    }
}
exports.EnumMember = EnumMember;
class PropertySignature extends Node {
    visit(visitor, context) {
        if (visitor.visitPropertySignature) {
            return visitor.visitPropertySignature(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitPropertySignature 方法`);
        }
    }
}
exports.PropertySignature = PropertySignature;
class FunctionTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitFunctionTypeNode) {
            return visitor.visitFunctionTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitFunctionTypeNode 方法`);
        }
    }
}
exports.FunctionTypeNode = FunctionTypeNode;
class MethodSignature extends Node {
    constructor() {
        super(...arguments);
        this.typeParameters = [];
        this.parameters = [];
    }
    visit(visitor, context) {
        if (visitor.visitMethodSignature) {
            return visitor.visitMethodSignature(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitMethodSignature 方法`);
        }
    }
}
exports.MethodSignature = MethodSignature;
// export class BindingName extends Node<ts.BindingName>{
//     visit(visitor: Visitor, context: any) {
//         if (visitor.visitBindingName) {
//             return visitor.visitBindingName(this, context)
//         } else {
//             throw new Error(`${visitor.name} 没有 visitBindingName 方法`)
//         }
//     }
// }
class ObjectBindingPattern extends Node {
    constructor() {
        super(...arguments);
        this.elements = [];
    }
    visit(visitor, context) {
        if (visitor.visitObjectBindingPattern) {
            return visitor.visitObjectBindingPattern(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitObjectBindingPattern 方法`);
        }
    }
}
exports.ObjectBindingPattern = ObjectBindingPattern;
class BindingElement extends Node {
    visit(visitor, context) {
        if (visitor.visitBindingElement) {
            return visitor.visitBindingElement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitObjectBindingPattern 方法`);
        }
    }
}
exports.BindingElement = BindingElement;
class ArrayBindingPattern extends Node {
    constructor() {
        super(...arguments);
        this.elements = [];
    }
    visit(visitor, context) {
        if (visitor.visitArrayBindingPattern) {
            return visitor.visitArrayBindingPattern(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitArrayBindingPattern 方法`);
        }
    }
}
exports.ArrayBindingPattern = ArrayBindingPattern;
class ArrayLiteralExpression extends Node {
    constructor() {
        super(...arguments);
        this.elements = [];
    }
    visit(visitor, context) {
        if (visitor.visitArrayLiteralExpression) {
            return visitor.visitArrayLiteralExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitArrayLiteralExpression 方法`);
        }
    }
}
exports.ArrayLiteralExpression = ArrayLiteralExpression;
class ReturnStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitReturnStatement) {
            return visitor.visitReturnStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitReturnStatement 方法`);
        }
    }
}
exports.ReturnStatement = ReturnStatement;
class AsExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitAsExpression) {
            return visitor.visitAsExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitAsExpression 方法`);
        }
    }
}
exports.AsExpression = AsExpression;
class VariableDeclarationList extends Node {
    visit(visitor, context) {
        if (visitor.visitVariableDeclarationList) {
            return visitor.visitVariableDeclarationList(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitVariableDeclarationList 方法`);
        }
    }
}
exports.VariableDeclarationList = VariableDeclarationList;
class VariableDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitVariableDeclaration) {
            return visitor.visitVariableDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitVariableDeclaration 方法`);
        }
    }
}
exports.VariableDeclaration = VariableDeclaration;
class AwaitExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitAwaitExpression) {
            return visitor.visitAwaitExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitAwaitExpression 方法`);
        }
    }
}
exports.AwaitExpression = AwaitExpression;
class YieldExpression extends Node {
    visit(visitor, context) {
    }
}
exports.YieldExpression = YieldExpression;
class SyntheticExpression extends Node {
    visit(visitor, context) {
    }
}
exports.SyntheticExpression = SyntheticExpression;
class ArrowFunction extends Node {
    visit(visitor, context) {
        if (visitor.visitArrowFunction) {
            return visitor.visitArrowFunction(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitArrowFunction 方法`);
        }
    }
}
exports.ArrowFunction = ArrowFunction;
class ConciseBody extends Node {
    visit(visitor, context) {
        if (visitor.visitConciseBody) {
            return visitor.visitConciseBody(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitConciseBody 方法`);
        }
    }
}
exports.ConciseBody = ConciseBody;
class EqualsGreaterThanToken extends Node {
    visit(visitor, context) {
        if (visitor.visitEqualsGreaterThanToken) {
            return visitor.visitEqualsGreaterThanToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitEqualsGreaterThanToken 方法`);
        }
    }
}
exports.EqualsGreaterThanToken = EqualsGreaterThanToken;
class BooleanLiteral extends Node {
    visit(visitor, context) {
        if (visitor.visitBooleanLiteral) {
            return visitor.visitBooleanLiteral(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitBooleanLiteral 方法`);
        }
    }
}
exports.BooleanLiteral = BooleanLiteral;
class UnaryExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitUnaryExpression) {
            return visitor.visitUnaryExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitUnaryExpression 方法`);
        }
    }
}
exports.UnaryExpression = UnaryExpression;
class ElementAccessExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitElementAccessExpression) {
            return visitor.visitElementAccessExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitElementAccessExpression 方法`);
        }
    }
}
exports.ElementAccessExpression = ElementAccessExpression;
class ParenthesizedExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitParenthesizedExpression) {
            return visitor.visitParenthesizedExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitParenthesizedExpression 方法`);
        }
    }
}
exports.ParenthesizedExpression = ParenthesizedExpression;
class SuperExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitSuperExpression) {
            return visitor.visitSuperExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitSuperExpression 方法`);
        }
    }
}
exports.SuperExpression = SuperExpression;
class ThisExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitThisExpression) {
            return visitor.visitThisExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitThisExpression 方法`);
        }
    }
}
exports.ThisExpression = ThisExpression;
class PropertyAccessExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitPropertyAccessExpression) {
            return visitor.visitPropertyAccessExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitPropertyAccessExpression 方法`);
        }
    }
}
exports.PropertyAccessExpression = PropertyAccessExpression;
class PrefixUnaryExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitPrefixUnaryExpression) {
            return visitor.visitPrefixUnaryExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitPrefixUnaryExpression 方法`);
        }
    }
}
exports.PrefixUnaryExpression = PrefixUnaryExpression;
class NullLiteral extends Node {
    visit(visitor, context) {
        if (visitor.visitNullLiteral) {
            return visitor.visitNullLiteral(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitNullLiteral 方法`);
        }
    }
}
exports.NullLiteral = NullLiteral;
class NoSubstitutionTemplateLiteral extends Node {
    visit(visitor, context) {
        if (visitor.visitNoSubstitutionTemplateLiteral) {
            return visitor.visitNoSubstitutionTemplateLiteral(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitNoSubstitutionTemplateLiteral 方法`);
        }
    }
}
exports.NoSubstitutionTemplateLiteral = NoSubstitutionTemplateLiteral;
class TemplateExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitTemplateExpression) {
            return visitor.visitTemplateExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTemplateExpression 方法`);
        }
    }
}
exports.TemplateExpression = TemplateExpression;
class NewExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitNewExpression) {
            return visitor.visitNewExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitNewExpression 方法`);
        }
    }
}
exports.NewExpression = NewExpression;
class IfStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitIfStatement) {
            return visitor.visitIfStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitIfStatement 方法`);
        }
    }
}
exports.IfStatement = IfStatement;
class ForOfStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitForOfStatement) {
            return visitor.visitForOfStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitForOfStatement 方法`);
        }
    }
}
exports.ForOfStatement = ForOfStatement;
class ForInitializer extends Node {
    visit(visitor, context) {
        if (visitor.visitForInitializer) {
            return visitor.visitForInitializer(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitForInitializer 方法`);
        }
    }
}
exports.ForInitializer = ForInitializer;
class AwaitKeywordToken extends Node {
    visit(visitor, context) {
        if (visitor.visitAwaitKeywordToken) {
            return visitor.visitAwaitKeywordToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitAwaitKeywordToken 方法`);
        }
    }
}
exports.AwaitKeywordToken = AwaitKeywordToken;
class ForInStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitForInStatement) {
            return visitor.visitForInStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitForInStatement 方法`);
        }
    }
}
exports.ForInStatement = ForInStatement;
class SwitchStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitSwitchStatement) {
            return visitor.visitSwitchStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitSwitchStatement 方法`);
        }
    }
}
exports.SwitchStatement = SwitchStatement;
class CaseBlock extends Node {
    visit(visitor, context) {
        if (visitor.visitCaseBlock) {
            return visitor.visitCaseBlock(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitCaseBlock 方法`);
        }
    }
}
exports.CaseBlock = CaseBlock;
class CaseClause extends Node {
    visit(visitor, context) {
        if (visitor.visitCaseClause) {
            return visitor.visitCaseClause(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitCaseClause 方法`);
        }
    }
}
exports.CaseClause = CaseClause;
class DefaultClause extends Node {
    visit(visitor, context) {
        if (visitor.visitDefaultClause) {
            return visitor.visitDefaultClause(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitDefaultClause 方法`);
        }
    }
}
exports.DefaultClause = DefaultClause;
class ImportClause extends Node {
    visit(visitor, context) {
        if (visitor.visitImportClause) {
            return visitor.visitImportClause(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitImportClause 方法`);
        }
    }
}
exports.ImportClause = ImportClause;
class NamespaceImport extends Node {
    visit(visitor, context) {
        if (visitor.visitNamespaceImport) {
            return visitor.visitNamespaceImport(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitNamespaceImport 方法`);
        }
    }
}
exports.NamespaceImport = NamespaceImport;
class NamedImports extends Node {
    constructor() {
        super(...arguments);
        this.elements = [];
    }
    visit(visitor, context) {
        if (visitor.visitNamedImports) {
            return visitor.visitNamedImports(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitNamedImports 方法`);
        }
    }
}
exports.NamedImports = NamedImports;
class ImportSpecifier extends Node {
    visit(visitor, context) {
        if (visitor.visitImportSpecifier) {
            return visitor.visitImportSpecifier(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitImportSpecifier 方法`);
        }
    }
}
exports.ImportSpecifier = ImportSpecifier;
class LeftHandSideExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitLeftHandSideExpression) {
            return visitor.visitLeftHandSideExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitLeftHandSideExpression 方法`);
        }
    }
}
exports.LeftHandSideExpression = LeftHandSideExpression;
class ExpressionWithTypeArguments extends Node {
    constructor() {
        super(...arguments);
        this.typeArguments = [];
    }
    visit(visitor, context) {
        if (visitor.visitExpressionWithTypeArguments) {
            return visitor.visitExpressionWithTypeArguments(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitExpressionWithTypeArguments 方法`);
        }
    }
}
exports.ExpressionWithTypeArguments = ExpressionWithTypeArguments;
class JSDocNullableType extends Node {
    visit(visitor, context) {
        if (visitor.visitJSDocNullableType) {
            return visitor.visitJSDocNullableType(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitJSDocNullableType 方法`);
        }
    }
}
exports.JSDocNullableType = JSDocNullableType;
class ExpressionStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitExpressionStatement) {
            return visitor.visitExpressionStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitExpressionStatement 方法`);
        }
    }
}
exports.ExpressionStatement = ExpressionStatement;
class BreakStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitBreakStatement) {
            return visitor.visitBreakStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitBreakStatement 方法`);
        }
    }
}
exports.BreakStatement = BreakStatement;
class ThrowStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitThrowStatement) {
            return visitor.visitThrowStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitThrowStatement 方法`);
        }
    }
}
exports.ThrowStatement = ThrowStatement;
class DebuggerStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitDebuggerStatement) {
            return visitor.visitDebuggerStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitDebuggerStatement 方法`);
        }
    }
}
exports.DebuggerStatement = DebuggerStatement;
class ExportDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitExportDeclaration) {
            return visitor.visitExportDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitExportDeclaration 方法`);
        }
    }
}
exports.ExportDeclaration = ExportDeclaration;
class Symbol {
    visit(visitor, context) {
        if (visitor.visitSymbol) {
            return visitor.visitSymbol(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitSymbol 方法`);
        }
    }
}
exports.Symbol = Symbol;
class NamedExports extends Node {
    visit(visitor, context) {
        if (visitor.visitNamedExports) {
            return visitor.visitNamedExports(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitNamedExports 方法`);
        }
    }
}
exports.NamedExports = NamedExports;
class ExportSpecifier extends Node {
    visit(visitor, context) {
        if (visitor.visitExportSpecifier) {
            return visitor.visitExportSpecifier(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitExportSpecifier 方法`);
        }
    }
}
exports.ExportSpecifier = ExportSpecifier;
class ExportAssignment extends Node {
    visit(visitor, context) {
        if (visitor.visitExportAssignment) {
            return visitor.visitExportAssignment(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitExportAssignment 方法`);
        }
    }
}
exports.ExportAssignment = ExportAssignment;
class ConditionalExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitConditionalExpression) {
            return visitor.visitConditionalExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitConditionalExpression 方法`);
        }
    }
}
exports.ConditionalExpression = ConditionalExpression;
class FunctionExpression extends Node {
    visit(visitor, context) { }
}
exports.FunctionExpression = FunctionExpression;
class SpreadElement extends Node {
    visit(visitor, context) {
        if (visitor.visitSpreadElement) {
            return visitor.visitSpreadElement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitSpreadElement 方法`);
        }
    }
}
exports.SpreadElement = SpreadElement;
class EmptyStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitEmptyStatement) {
            return visitor.visitEmptyStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitEmptyStatement 方法`);
        }
    }
}
exports.EmptyStatement = EmptyStatement;
class RegularExpressionLiteral extends Node {
    visit(visitor, context) {
        if (visitor.visitRegularExpressionLiteral) {
            return visitor.visitRegularExpressionLiteral(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitRegularExpressionLiteral 方法`);
        }
    }
}
exports.RegularExpressionLiteral = RegularExpressionLiteral;
class TaggedTemplateExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitTaggedTemplateExpression) {
            return visitor.visitTaggedTemplateExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTaggedTemplateExpression 方法`);
        }
    }
}
exports.TaggedTemplateExpression = TaggedTemplateExpression;
class TryStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitTryStatement) {
            return visitor.visitTryStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTryStatement 方法`);
        }
    }
}
exports.TryStatement = TryStatement;
class ImportEqualsDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitImportEqualsDeclaration) {
            return visitor.visitImportEqualsDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitImportEqualsDeclaration 方法`);
        }
    }
}
exports.ImportEqualsDeclaration = ImportEqualsDeclaration;
class ExternalModuleReference extends Node {
    visit(visitor, context) { }
}
exports.ExternalModuleReference = ExternalModuleReference;
class ContinueStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitContinueStatement) {
            return visitor.visitContinueStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitContinueStatement 方法`);
        }
    }
}
exports.ContinueStatement = ContinueStatement;
class JSDoc extends Node {
    constructor() {
        super(...arguments);
        this.tags = [];
    }
    visit(visitor, context) {
        if (visitor.visitJSDoc) {
            return visitor.visitJSDoc(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitJSDoc 方法`);
        }
    }
}
exports.JSDoc = JSDoc;
class JSDocTypeExpression extends Node {
    visit(visitor, context) { }
}
exports.JSDocTypeExpression = JSDocTypeExpression;
class JSDocPropertyLikeTag extends Node {
    visit(visitor, context) { }
}
exports.JSDocPropertyLikeTag = JSDocPropertyLikeTag;
class JSDocTypeLiteral extends Node {
    constructor() {
        super(...arguments);
        this.jsDocPropertyTags = [];
    }
    visit(visitor, context) { }
}
exports.JSDocTypeLiteral = JSDocTypeLiteral;
class JSDocTag extends Node {
    visit(visitor, context) {
        if (visitor.visitJSDocTag) {
            return visitor.visitJSDocTag(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitJSDocTag 方法`);
        }
    }
}
exports.JSDocTag = JSDocTag;
class JSDocReturnTag extends JSDocTag {
    visit(visitor, context) { }
}
exports.JSDocReturnTag = JSDocReturnTag;
class JSDocUnknownTag extends JSDocTag {
    visit(visitor, context) {
    }
}
exports.JSDocUnknownTag = JSDocUnknownTag;
class JSDocClassTag extends JSDocTag {
}
exports.JSDocClassTag = JSDocClassTag;
class JSDocEnumTag extends JSDocTag {
}
exports.JSDocEnumTag = JSDocEnumTag;
class JSDocThisTag extends JSDocTag {
}
exports.JSDocThisTag = JSDocThisTag;
class JSDocTemplateTag extends JSDocTag {
}
exports.JSDocTemplateTag = JSDocTemplateTag;
class JSDocTypeTag extends JSDocTag {
}
exports.JSDocTypeTag = JSDocTypeTag;
class JSDocAugmentsTag extends JSDocTag {
    visit(visitor, context) {
    }
}
exports.JSDocAugmentsTag = JSDocAugmentsTag;
class ConstructSignatureDeclaration extends Node {
    constructor() {
        super(...arguments);
        this.typeParameters = [];
        this.parameters = [];
    }
    visit(visitor, context) {
        if (visitor.visitConstructSignatureDeclaration) {
            return visitor.visitConstructSignatureDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitConstructSignatureDeclaration 方法`);
        }
    }
}
exports.ConstructSignatureDeclaration = ConstructSignatureDeclaration;
class CallSignatureDeclaration extends Node {
    constructor() {
        super(...arguments);
        this.typeParameters = [];
        this.parameters = [];
    }
    visit(visitor, context) {
        if (visitor.visitCallSignatureDeclaration) {
            return visitor.visitCallSignatureDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitCallSignatureDeclaration 方法`);
        }
    }
}
exports.CallSignatureDeclaration = CallSignatureDeclaration;
class IndexSignatureDeclaration extends Node {
    visit(visitor, context) {
        if (visitor.visitIndexSignatureDeclaration) {
            return visitor.visitIndexSignatureDeclaration(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitIndexSignatureDeclaration 方法`);
        }
    }
}
exports.IndexSignatureDeclaration = IndexSignatureDeclaration;
class MappedTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitMappedTypeNode) {
            return visitor.visitMappedTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitMappedTypeNode 方法`);
        }
    }
}
exports.MappedTypeNode = MappedTypeNode;
class MinusToken extends Node {
    visit(visitor, context) {
        if (visitor.visitMinusToken) {
            return visitor.visitMinusToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitMinusToken 方法`);
        }
    }
}
exports.MinusToken = MinusToken;
class PlusToken extends Node {
    visit(visitor, context) {
        if (visitor.visitPlusToken) {
            return visitor.visitPlusToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitPlusToken 方法`);
        }
    }
}
exports.PlusToken = PlusToken;
class ReadonlyToken extends Node {
    visit(visitor, context) {
        if (visitor.visitReadonlyToken) {
            return visitor.visitReadonlyToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitReadonlyToken 方法`);
        }
    }
}
exports.ReadonlyToken = ReadonlyToken;
class IndexedAccessTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitIndexedAccessTypeNode) {
            return visitor.visitIndexedAccessTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitIndexedAccessTypeNode 方法`);
        }
    }
}
exports.IndexedAccessTypeNode = IndexedAccessTypeNode;
class TypeOperatorNode extends Node {
    visit(visitor, context) {
        if (visitor.visitTypeOperatorNode) {
            return visitor.visitTypeOperatorNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTypeOperatorNode 方法`);
        }
    }
}
exports.TypeOperatorNode = TypeOperatorNode;
class BinaryExpression extends Node {
    visit(visitor, context) {
        if (visitor.visitBinaryExpression) {
            return visitor.visitBinaryExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitBinaryExpression 方法`);
        }
    }
}
exports.BinaryExpression = BinaryExpression;
class AssignmentExpression extends BinaryExpression {
    visit(visitor, context) { }
}
exports.AssignmentExpression = AssignmentExpression;
class ObjectDestructuringAssignment extends Node {
    visit(visitor, context) { }
}
exports.ObjectDestructuringAssignment = ObjectDestructuringAssignment;
class ArrayDestructuringAssignment extends Node {
    visit(visitor, context) { }
}
exports.ArrayDestructuringAssignment = ArrayDestructuringAssignment;
class ArrayTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitArrayTypeNode) {
            return visitor.visitArrayTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitArrayTypeNode 方法`);
        }
    }
}
exports.ArrayTypeNode = ArrayTypeNode;
class LiteralTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitLiteralTypeNode) {
            return visitor.visitLiteralTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitLiteralTypeNode 方法`);
        }
    }
}
exports.LiteralTypeNode = LiteralTypeNode;
class BigIntLiteral extends Node {
    visit(visitor, context) {
        if (visitor.visitBigIntLiteral) {
            return visitor.visitBigIntLiteral(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitBigIntLiteral 方法`);
        }
    }
}
exports.BigIntLiteral = BigIntLiteral;
class TypeLiteralNode extends Node {
    constructor() {
        super(...arguments);
        this.members = [];
    }
    visit(visitor, context) {
        if (visitor.visitTypeLiteralNode) {
            return visitor.visitTypeLiteralNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTypeLiteralNode 方法`);
        }
    }
}
exports.TypeLiteralNode = TypeLiteralNode;
class TypePredicateNode extends Node {
    visit(visitor, context) {
        if (visitor.visitTypePredicateNode) {
            return visitor.visitTypePredicateNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitTypePredicateNode 方法`);
        }
    }
}
exports.TypePredicateNode = TypePredicateNode;
class ImportTypeNode extends Node {
    constructor() {
        super(...arguments);
        this.typeArguments = [];
    }
    visit(visitor, context) {
        if (visitor.visitImportTypeNode) {
            return visitor.visitImportTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitImportTypeNode 方法`);
        }
    }
}
exports.ImportTypeNode = ImportTypeNode;
class ParenthesizedTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitParenthesizedTypeNode) {
            return visitor.visitParenthesizedTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitParenthesizedTypeNode 方法`);
        }
    }
}
exports.ParenthesizedTypeNode = ParenthesizedTypeNode;
class IntersectionTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitIntersectionTypeNode) {
            return visitor.visitIntersectionTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitIntersectionTypeNode 方法`);
        }
    }
}
exports.IntersectionTypeNode = IntersectionTypeNode;
class ThisTypeNode extends Node {
    visit(visitor, context) {
        if (visitor.visitThisTypeNode) {
            return visitor.visitThisTypeNode(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitThisTypeNode 方法`);
        }
    }
}
exports.ThisTypeNode = ThisTypeNode;
class OtherStatement extends Node {
    visit(visitor, context) {
        if (visitor.visitOtherStatement) {
            return visitor.visitOtherStatement(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitOtherStatement 方法`);
        }
    }
}
exports.OtherStatement = OtherStatement;
//# sourceMappingURL=index.js.map