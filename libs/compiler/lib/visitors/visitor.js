"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
// import * as morph from 'ts-morph';
const util = tslib_1.__importStar(require("./util"));
const path_1 = require("path");
class Node {
    constructor() {
        this.decorators = [];
        this.modifiers = [];
        this.docs = [];
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
class ObjectLiteralElementLike extends Node {
    visit(visitor, context) {
        if (visitor.visitObjectLiteralElementLike) {
            return visitor.visitObjectLiteralElementLike(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitObjectLiteralElementLike 方法`);
        }
    }
}
exports.ObjectLiteralElementLike = ObjectLiteralElementLike;
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
// export class TypeNode extends Node<ts.TypeNode>{
//     visit(visitor: Visitor, context: any) {
//         if (visitor.visitTypeNode) {
//             return visitor.visitTypeNode(this, context)
//         } else {
//             throw new Error(`${visitor.name} 没有 visitTypeNode 方法`)
//         }
//     }
// }
class QuestionToken extends Node {
    visit(visitor, context) {
        if (visitor.visitQuestionToken) {
            return visitor.visitQuestionToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitQuestionToken 方法`);
        }
    }
}
exports.QuestionToken = QuestionToken;
class ExclamationToken extends Node {
    visit(visitor, context) {
        if (visitor.visitExclamationToken) {
            return visitor.visitExclamationToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitExclamationToken 方法`);
        }
    }
}
exports.ExclamationToken = ExclamationToken;
class Expression extends Node {
    visit(visitor, context) {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitExpression 方法`);
        }
    }
}
exports.Expression = Expression;
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
class EntityName extends Node {
    visit(visitor, context) {
        if (visitor.visitEntityName) {
            return visitor.visitEntityName(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitEntityName 方法`);
        }
    }
}
exports.EntityName = EntityName;
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
    getDecorators() {
        return (visitor) => {
            const decorators = this.decorators.map(dec => dec.visit(visitor, {}));
            const ress = decorators.map(dec => dec.name);
            if (ress.length >= 1)
                return ress[0];
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
class DotDotDotToken extends Node {
    visit(visitor, context) {
        if (visitor.visitDotDotDotToken) {
            return visitor.visitDotDotDotToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitDotDotDotToken 方法`);
        }
    }
}
exports.DotDotDotToken = DotDotDotToken;
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
class ArrayBindingPattern extends Node {
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
class CaseOrDefaultClause extends Node {
    visit(visitor, context) {
        if (visitor.visitCaseOrDefaultClause) {
            return visitor.visitCaseOrDefaultClause(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitCaseOrDefaultClause 方法`);
        }
    }
}
exports.CaseOrDefaultClause = CaseOrDefaultClause;
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
// export class NamedImportBindings extends Node<ts.NamedImportBindings>{
//     visit(visitor: Visitor, context: any) {
//         if (visitor.visitNamedImportBindings) {
//             return visitor.visitNamedImportBindings(this, context)
//         } else {
//             throw new Error(`${visitor.name} 没有 visitNamedImportBindings 方法`)
//         }
//     }
// }
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
class ModuleReference extends Node {
    visit(visitor, context) {
        if (visitor.visitModuleReference) {
            return visitor.visitModuleReference(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitModuleReference 方法`);
        }
    }
}
exports.ModuleReference = ModuleReference;
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
class BinaryOperatorToken extends Node {
    visit(visitor, context) {
        if (visitor.visitBinaryOperatorToken) {
            return visitor.visitBinaryOperatorToken(this, context);
        }
        else {
            throw new Error(`${visitor.name} 没有 visitBinaryOperatorToken 方法`);
        }
    }
}
exports.BinaryOperatorToken = BinaryOperatorToken;
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
class TsVisitor {
    constructor() {
        this.name = `TsVisitor`;
    }
    visitBigIntLiteral(node, context) {
        node.text = context.text;
        node.hasExtendedUnicodeEscape = !!context.hasExtendedUnicodeEscape;
        node.isUnterminated = !!context.isUnterminated;
        return node;
    }
    visitLiteralExpression(node, context) {
        if (util.isBigIntLiteral(context)) {
            return this.visitBigIntLiteral(new BigIntLiteral(), context);
        }
        else if (util.isStringLiteral(context)) {
            return this.visitStringLiteral(new StringLiteral(), context);
        }
        else if (util.isNumericLiteral(context)) {
            return this.visitNumericLiteral(new NumericLiteral(), context);
        }
        else if (util.isNoSubstitutionTemplateLiteral(context)) {
            return this.visitNoSubstitutionTemplateLiteral(new NoSubstitutionTemplateLiteral(), context);
        }
        else if (util.isRegularExpressionLiteral(context)) {
            return this.visitRegularExpressionLiteral(new RegularExpressionLiteral(), context);
        }
        else {
            return this.visitNullLiteral(new NullLiteral(), context);
        }
    }
    visitConciseBody(node, context) {
        return node;
    }
    visitEqualsGreaterThanToken(node, context) {
        return node;
    }
    visitDiagnostic(node, context) {
        return node;
    }
    visitLanguageService(node, context) {
        return node;
    }
    visitProgram(node, context) {
        return node;
    }
    visitTypeChecker(node, context) {
        return node;
    }
    visit(node, context) {
        return node.visit(this, context);
    }
    // visitProject(node: Project, context: morph.Project) {
    //     node.languageService = this.visitLanguageService(new LanguageService(), context.getLanguageService().compilerObject as any);
    //     node.ambientModules = context.getAmbientModules().map(ambient => this.visitSymbol(new Symbol(), ambient));
    //     node.sourceFiles = context.getSourceFiles().map(sourceFile => this.visitSourceFile(new SourceFile(), sourceFile.compilerNode as any));
    //     node.preEmitDiagnostics = context.getPreEmitDiagnostics().map(diag => this.visitDiagnostic(new Diagnostic(), diag.compilerObject as any));
    //     node.program = this.visitProgram(new Program(), context.getProgram().compilerObject as any);
    //     node.typeChecker = this.visitTypeChecker(new TypeChecker(), context.getTypeChecker().compilerObject as any)
    //     return node;
    // }
    visitType(node, context) {
        return node;
    }
    visitSymbol(node, context) {
        return node;
    }
    visitExportSpecifier(node, context) {
        if (context.propertyName) {
            node.propertyName = this.visitIdentifier(new Identifier(), context.propertyName);
        }
        node.name = this.visitIdentifier(new Identifier(), context.name);
        return node;
    }
    visitNamedExports(node, context) {
        node.node = context;
        node.elements = context.elements.map(ele => this.visitExportSpecifier(new ExportSpecifier(), ele));
        return node;
    }
    visitThisTypeNode(node, context) {
        return node;
    }
    visitBinaryOperatorToken(node, context) {
        return node;
    }
    visitMinusToken(node, context) {
        return node;
    }
    visitPlusToken(node, context) {
        return node;
    }
    visitReadonlyToken(node, context) {
        return node;
    }
    visitContinueStatement(node, context) {
        node.node = context;
        if (context.label) {
            node.label = this.visitIdentifier(new Identifier(), context.label);
        }
        return node;
    }
    visitCaseBlock(node, context) {
        node.node = context;
        node.clauses = context.clauses.map(cla => this.visitCaseOrDefaultClause(new CaseOrDefaultClause(), cla));
        return node;
    }
    visitCaseOrDefaultClause(node, context) {
        node.node = context;
        if (ts.isCaseClause(context)) {
            return this.visitCaseClause(new CaseClause(), context);
        }
        else {
            return this.visitDefaultClause(new DefaultClause(), context);
        }
    }
    visitCaseClause(node, context) {
        node.node = context;
        node.expression = this.visitExpression(new Expression(), context.expression);
        node.statements = context.statements.map(stat => this.visitStatement(undefined, stat));
        return node;
    }
    visitDefaultClause(node, context) {
        node.node = context;
        node.statements = context.statements.map(stat => this.visitStatement(undefined, stat));
        return node;
    }
    visitForInitializer(node, context) {
        node.node = context;
        if (ts.isVariableDeclarationList(context)) {
            return this.visitVariableDeclarationList(new VariableDeclarationList(), context);
        }
        else {
            return this.visitExpression(new Expression(), context);
        }
    }
    visitAwaitKeywordToken(node, context) {
        node.node = context;
        return node;
    }
    /**
     * 扫描source file
     * @param {SourceFile} node
     * @param {ts.SourceFile} context
     */
    visitSourceFile(node, context) {
        this.sourceFile = context;
        node.fileName = context.fileName;
        node.hasNoDefaultLib = context.hasNoDefaultLib;
        node.isDeclarationFile = context.isDeclarationFile;
        node.languageVariant = context.languageVariant;
        node.languageVersion = context.languageVersion;
        if (context.moduleName) {
            node.moduleName = context.moduleName;
        }
        ;
        node.node = context;
        node.statements = context.statements.map(state => {
            const ast = this.visitStatement(undefined, state);
            ast.parent = node;
            ast.from = node.fileName;
            if (ast instanceof ImportDeclaration) {
                const fromPath = ast.moduleSpecifier.text;
                if (typeof fromPath === 'string') {
                    if (fromPath.startsWith('./')) {
                        ast.sourcePath = path_1.join(ast.from, fromPath);
                    }
                    else if (fromPath.startsWith('/')) {
                        ast.sourcePath = fromPath;
                    }
                    else {
                        try {
                            ast.sourcePath = require.resolve(fromPath);
                        }
                        catch (e) {
                            ast.sourcePath = ``;
                        }
                    }
                }
            }
            return ast;
        });
        node.text = context.text;
        return node;
    }
    /**
     * 生成statement
     * @param {Statement} node
     * @param {ts.Statement} context
     */
    visitStatement(node, context) {
        if (ts.isClassDeclaration(context)) {
            return this.visitClassDeclaration(new ClassDeclaration(), context);
        }
        else if (ts.isImportDeclaration(context)) {
            return this.visitImportDeclaration(new ImportDeclaration(), context);
        }
        else if (ts.isVariableStatement(context)) {
            return this.visitVariableStatement(new VariableStatement(), context);
        }
        else if (ts.isFunctionDeclaration(context)) {
            return this.visitFunctionDeclaration(new FunctionDeclaration(), context);
        }
        else if (ts.isInterfaceDeclaration(context)) {
            return this.visitInterfaceDeclaration(new InterfaceDeclaration(), context);
        }
        else if (ts.isEnumDeclaration(context)) {
            return this.visitEnumDeclaration(new EnumDeclaration(), context);
        }
        else if (ts.isTypeAliasDeclaration(context)) {
            return this.visitTypeAliasDeclaration(new TypeAliasDeclaration(), context);
        }
        else if (ts.isReturnStatement(context)) {
            return this.visitReturnStatement(new ReturnStatement(), context);
        }
        else if (ts.isIfStatement(context)) {
            return this.visitIfStatement(new IfStatement(), context);
        }
        else if (ts.isSwitchStatement(context)) {
            return this.visitSwitchStatement(new SwitchStatement(), context);
        }
        else if (ts.isForOfStatement(context)) {
            return this.visitForOfStatement(new ForOfStatement(), context);
        }
        else if (ts.isForInStatement(context)) {
            return this.visitForInStatement(new ForInStatement(), context);
        }
        else if (ts.isBlock(context)) {
            return this.visitFunctionBody(new FunctionBody(), context);
        }
        else if (ts.isExpressionStatement(context)) {
            return this.visitExpressionStatement(new ExpressionStatement(), context);
        }
        else if (ts.isBreakStatement(context)) {
            return this.visitBreakStatement(new BreakStatement(), context);
        }
        else if (ts.isThrowStatement(context)) {
            return this.visitThrowStatement(new ThrowStatement(), context);
        }
        else if (ts.isDebuggerStatement(context)) {
            return this.visitDebuggerStatement(new DebuggerStatement(), context);
        }
        else if (ts.isExportDeclaration(context)) {
            return this.visitExportDeclaration(new ExportDeclaration(), context);
        }
        else if (ts.isExportAssignment(context)) {
            return this.visitExportAssignment(new ExportAssignment(), context);
        }
        else if (ts.isEmptyStatement(context)) {
            return this.visitEmptyStatement(new EmptyStatement(), context);
        }
        else if (ts.isConditionalExpression(context)) {
            return this.visitConditionalExpression(new ConditionalExpression(), context);
        }
        else if (ts.isRegularExpressionLiteral(context)) {
            return this.visitRegularExpressionLiteral(new RegularExpressionLiteral(), context);
        }
        else if (ts.isTaggedTemplateExpression(context)) {
            return this.visitTaggedTemplateExpression(new TaggedTemplateExpression(), context);
        }
        else if (ts.isTryStatement(context)) {
            return this.visitTryStatement(new TryStatement(), context);
        }
        else if (ts.isImportEqualsDeclaration(context)) {
            return this.visitImportEqualsDeclaration(new ImportEqualsDeclaration(), context);
        }
        else {
            return this.visitOtherStatement(new OtherStatement(), context);
            // console.log(`visitStatement Error! ${context.kind}`)
        }
    }
    visitOtherStatement(node, context) {
        return node;
    }
    visitImportEqualsDeclaration(node, context) {
        node.moduleReference = this.visitModuleReference(new ModuleReference(), context.moduleReference);
        if (context.name) {
            node.name = this.visitIdentifier(new Identifier(), context.name);
        }
        return node;
    }
    visitModuleReference(node, context) {
        return node;
    }
    visitTryStatement(node, context) {
        return node;
    }
    visitTaggedTemplateExpression(node, context) {
        return node;
    }
    visitRegularExpressionLiteral(node, context) {
        return node;
    }
    visitConditionalExpression(node, context) {
        return node;
    }
    visitEmptyStatement(node, context) {
        return node;
    }
    visitExportAssignment(node, context) {
        return node;
    }
    visitExportDeclaration(node, context) {
        node.node = context;
        if (context.exportClause) {
            node.exportClause = this.visitNamedExports(new NamedExports(), context.exportClause);
        }
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(mod => this.visitModifier(new Modifier(), mod));
        }
        if (context.jsDoc) {
            node.docs = context.jsDoc.map((doc) => this.visitJSDoc(new JSDoc(), doc));
        }
        if (context.name) {
            if (ts.isIdentifier(context.name)) {
                node.name = this.visitIdentifier(new Identifier(), context.name);
            }
            else if (ts.isStringLiteral(context.name)) {
                node.name = this.visitStringLiteral(new StringLiteral(), context.name);
            }
            else if (ts.isNumericLiteral(context.name)) {
                node.name = this.visitNumericLiteral(new NumericLiteral(), context.name);
            }
        }
        if (context.moduleSpecifier) {
            node.moduleSpecifier = this.visitExpression(new Expression(), context.moduleSpecifier);
        }
        return node;
    }
    visitThrowStatement(node, context) {
        return node;
    }
    visitDebuggerStatement(node, context) {
        return node;
    }
    visitBreakStatement(node, context) {
        node.node = context;
        if (context.label) {
            node.label = this.visitIdentifier(new Identifier(), context.label);
        }
        return node;
    }
    visitExpressionStatement(node, context) {
        node.node = context;
        node.expression = this.visitExpression(new Expression(), context.expression);
        return node;
    }
    visitForInStatement(node, context) {
        node.node = context;
        node.initializer = this.visitForInitializer(new ForInitializer(), context.initializer);
        node.expression = this.visitExpression(new Expression(), context.expression);
        return node;
    }
    visitForOfStatement(node, context) {
        node.node = context;
        if (context.awaitModifier) {
            node.awaitModifier = this.visitAwaitKeywordToken(new AwaitKeywordToken(), context.awaitModifier);
        }
        node.initializer = this.visitForInitializer(new ForInitializer(), context.initializer);
        node.expression = this.visitExpression(new Expression(), context.expression);
        return node;
    }
    visitSwitchStatement(node, context) {
        node.node = context;
        node.expression = this.visitExpression(new Expression(), context.expression);
        node.caseBlock = this.visitCaseBlock(new CaseBlock(), context.caseBlock);
        node.possiblyExhaustive = !!context.possiblyExhaustive;
        return node;
    }
    visitIfStatement(node, context) {
        node.node = context;
        node.expression = this.visitExpression(new Expression(), context.expression);
        node.thenStatement = this.visitStatement(undefined, context.thenStatement);
        if (context.elseStatement) {
            node.elseStatement = this.visitStatement(undefined, context.elseStatement);
        }
        return node;
    }
    visitReturnStatement(node, context) {
        node.node = context;
        if (context.expression) {
            node.expression = this.visitExpression(new Expression(), context.expression);
        }
        return node;
    }
    /**
     * type Demo = string|number;
     * @param {TypeAliasDeclaration} node
     * @param {ts.TypeAliasDeclaration} context
     */
    visitTypeAliasDeclaration(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.modifiers = this.createModifiers(node, context.modifiers);
        node.name = this.visitIdentifier(new Identifier(), context.name);
        node.type = this.visitTypeNode(undefined, context.type);
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type));
        }
        return node;
    }
    /**
     * enum Demo{
     *  Title,
     *  Name
     * }
     * @param {EnumDeclaration} node
     * @param {ts.EnumDeclaration} context
     */
    visitEnumDeclaration(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.members = context.members.map(member => this.visitEnumMember(new EnumMember(), member));
        node.name = this.visitIdentifier(new Identifier(), context.name);
        node.docs = this.createJsDocs(context.jsDoc);
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(mod => this.visitModifier(new Modifier(), mod));
        }
        return node;
    }
    visitJSDoc(node, context) {
        node.node = context;
        if (ts.isJSDoc(context)) {
            if (context.comment) {
                node.comment = context.comment;
            }
            if (context.tags) {
                node.tags = context.tags.map(tag => this.visitJSDocTag(new JSDocTag(), tag));
            }
        }
        else {
            console.log(`visitJSDoc error! ${context.kind}`);
        }
        return node;
    }
    visitJSDocTag(node, context) {
        node.node = context;
        if (context.comment) {
            node.comment = context.comment;
        }
        node.tagName = this.visitIdentifier(new Identifier(), context.tagName);
        return node;
    }
    /**
     * enum member
     * @param {EnumMember} node
     * @param {ts.EnumMember} context
     */
    visitEnumMember(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.initializer) {
            node.initializer = this.visitExpression(new Expression(), context.initializer);
        }
        return node;
    }
    /**
     * interface
     * @param {InterfaceDeclaration}node
     * @param {ts.InterfaceDeclaration}context
     */
    visitInterfaceDeclaration(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.members = context.members.map(member => this.visitTypeElement(undefined, member));
        node.name = this.visitIdentifier(new Identifier(), context.name);
        node.modifiers = this.createModifiers(node, context.modifiers);
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type));
        }
        if (context.heritageClauses) {
            node.heritageClauses = context.heritageClauses.map(heri => this.visitHeritageClause(new HeritageClause(), heri));
        }
        return node;
    }
    visitHeritageClause(node, context) {
        node.node = context;
        if (context.token === ts.SyntaxKind.ExtendsKeyword) {
            node.token = 'extends';
        }
        if (context.token === ts.SyntaxKind.ImplementsKeyword) {
            node.token = 'implements';
        }
        node.types = context.types.map(type => this.visitExpressionWithTypeArguments(new ExpressionWithTypeArguments(), type));
        return node;
    }
    visitExpressionWithTypeArguments(node, context) {
        node.node = context;
        node.expression = this.visitLeftHandSideExpression(new LeftHandSideExpression(), context.expression);
        if (context.typeArguments) {
            node.typeArguments = context.typeArguments.map(type => this.visitTypeNode(undefined, type));
        }
        return node;
    }
    /**
     * type element
     * @param node
     * @param context
     */
    visitTypeElement(node, context) {
        if (ts.isPropertySignature(context)) {
            return this.visitPropertySignature(new PropertySignature(), context);
        }
        else if (ts.isMethodSignature(context)) {
            return this.visitMethodSignature(new MethodSignature(), context);
        }
        else if (ts.isIndexSignatureDeclaration(context)) {
            return this.visitIndexSignatureDeclaration(new IndexSignatureDeclaration(), context);
        }
        else if (util.isConstructSignatureDeclaration(context)) {
            return this.visitConstructSignatureDeclaration(new ConstructSignatureDeclaration(), context);
        }
        else if (ts.isCallSignatureDeclaration(context)) {
            return this.visitCallSignatureDeclaration(new CallSignatureDeclaration(), context);
        }
        else {
            console.log(`visitTypeElement Error! ${context.kind}`);
        }
        return node;
    }
    visitCallSignatureDeclaration(node, context) {
        return node;
    }
    visitConstructSignatureDeclaration(node, context) {
        return node;
    }
    visitIndexSignatureDeclaration(node, context) {
        if (context.name) {
            node.name = this.visitPropertyName(undefined, context.name);
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(t => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), t));
        }
        if (context.parameters) {
            node.parameters = context.parameters.map((p, index) => {
                const res = this.visitParameterDeclaration(new ParameterDeclaration(), p);
                res.index = index;
                return res;
            });
        }
        return node;
    }
    /**
     * interface method
     * @param node
     * @param context
     */
    visitMethodSignature(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type));
        }
        if (context.parameters) {
            node.parameters = context.parameters.map((par, index) => {
                const res = this.visitParameterDeclaration(new ParameterDeclaration(), par);
                res.index = index;
                return res;
            });
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        return node;
    }
    /**
     * interface property
     * @param node
     * @param context
     */
    visitPropertySignature(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        if (context.name) {
            node.name = this.visitPropertyName(undefined, context.name);
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.initializer) {
            node.initializer = this.visitExpression(new Expression(), context.initializer);
        }
        return node;
    }
    visitFunctionDeclaration(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body);
        }
        if (context.name) {
            node.name = this.visitIdentifier(new Identifier(), context.name);
        }
        context.parameters = context.parameters || [];
        node.parameters = context.parameters.map((par, index) => {
            const res = this.visitParameterDeclaration(new ParameterDeclaration(), par);
            res.index = index;
            return res;
        });
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), par));
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        return node;
    }
    visitVariableStatement(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.declarationList = this.visitVariableDeclarationList(new VariableDeclarationList(), context.declarationList);
        return node;
    }
    visitVariableDeclarationList(node, context) {
        node.node = context;
        node.declarations = context.declarations.map(dec => this.visitVariableDeclaration(new VariableDeclaration(), dec));
        return node;
    }
    visitVariableDeclaration(node, context) {
        node.node = context;
        node.name = this.visitBindingName(undefined, context.name);
        if (context.exclamationToken) {
            node.exclamationToken = this.visitExclamationToken(new ExclamationToken(), context.exclamationToken);
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.initializer) {
            node.initializer = this.visitExpression(new Expression(), context.initializer);
        }
        return node;
    }
    visitImportDeclaration(node, context) {
        node.node = context;
        node.moduleSpecifier = this.visitExpression(new Expression(), context.moduleSpecifier);
        if (context.importClause) {
            node.importClause = this.visitImportClause(new ImportClause(), context.importClause);
        }
        return node;
    }
    visitImportClause(node, context) {
        node.node = context;
        if (context.name) {
            node.name = this.visitIdentifier(new Identifier(), context.name);
        }
        if (context.namedBindings) {
            node.namedBindings = this.visitNamedImportBindings(undefined, context.namedBindings);
        }
        return node;
    }
    visitNamedImportBindings(node, context) {
        if (ts.isNamespaceImport(context)) {
            return this.visitNamespaceImport(new NamespaceImport(), context);
        }
        else {
            return this.visitNamedImports(new NamedImports(), context);
        }
    }
    visitNamespaceImport(node, context) {
        node.node = context;
        node.name = this.visitIdentifier(new Identifier(), context.name);
        return node;
    }
    visitNamedImports(node, context) {
        node.node = context;
        node.elements = context.elements.map(ele => this.visitImportSpecifier(new ImportSpecifier(), ele));
        return node;
    }
    visitImportSpecifier(node, context) {
        node.node = context;
        if (context.propertyName) {
            node.propertyName = this.visitIdentifier(new Identifier(), context.propertyName);
        }
        node.name = this.visitIdentifier(new Identifier(), context.name);
        return node;
    }
    createJsDocs(docs) {
        if (docs) {
            return docs.map(doc => this.visitJSDoc(new JSDoc(), doc));
        }
        return [];
    }
    /**
     * 扫描class declaration
     * @param {ClassDeclaration} node
     * @param {ts.ClassDeclaration} context
     */
    visitClassDeclaration(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.decorators = this.createDecorators(context, node);
        node.members = context.members.map(member => {
            const ast = this.visitClassElement(new ClassElement(), member);
            ast.parent = node;
            return ast;
        });
        if (context.name) {
            node.name = this.visitIdentifier(new Identifier(), context.name);
            node.name.parent = node;
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => {
                const ast = this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type);
                ast.parent = node;
                return ast;
            });
        }
        if (context.heritageClauses) {
            node.heritageClauses = context.heritageClauses.map(heri => this.visitHeritageClause(new HeritageClause(), heri));
        }
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(mod => this.visitModifier(new Modifier(), mod));
        }
        return node;
    }
    /**
     * 创建type
     * @param {TypeParameterDeclaration} node
     * @param {ts.TypeParameterDeclaration} context
     */
    visitTypeParameterDeclaration(node, context) {
        node.node = context;
        node.name = this.visitIdentifier(new Identifier(), context.name);
        if (context.constraint) {
            node.constraint = this.visitTypeNode(undefined, context.constraint);
        }
        if (context.default) {
            node.default = this.visitTypeNode(undefined, context.default);
        }
        return node;
    }
    /**
     * 遍历identifier
     * @param {Identifier} node
     * @param {ts.Identifier} context
     */
    visitIdentifier(node, context) {
        node.node = context;
        node.escapedText = context.escapedText;
        node.text = context.text;
        node.from = ``;
        return node;
    }
    /**
     * 遍历类成员
     * @param {ClassElement} node
     * @param {ts.ClassElement} context
     */
    visitClassElement(node, context) {
        node.node = context;
        if (ts.isPropertyDeclaration(context)) {
            return this.visitPropertyDeclaration(new PropertyDeclaration(), context);
        }
        else if (ts.isMethodDeclaration(context)) {
            return this.visitMethodDeclaration(new MethodDeclaration(), context);
        }
        else if (ts.isSemicolonClassElement(context)) {
            return this.visitSemicolonClassElement(new SemicolonClassElement(), context);
        }
        else if (ts.isConstructorDeclaration(context)) {
            return this.visitConstructorDeclaration(new ConstructorDeclaration(), context);
        }
        else if (ts.isGetAccessorDeclaration(context)) {
            return this.visitGetAccessorDeclaration(new GetAccessorDeclaration(), context);
        }
        else if (ts.isSetAccessorDeclaration(context)) {
            return this.visitSetAccessorDeclaration(new SetAccessorDeclaration(), context);
        }
        else if (ts.isDecorator(context)) {
            return this.visitDecorator(new Decorator(), context);
        }
        else {
            console.log(`visitClassElement Error! ${context.kind}`);
        }
        return node;
    }
    visitConstructorDeclaration(node, context) {
        if (context.name) {
            node.name = this.visitPropertyName(undefined, context.name);
        }
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body);
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        if (context.parameters) {
            node.parameters = context.parameters.map((par, index) => {
                const res = this.visitParameterDeclaration(new ParameterDeclaration(), par);
                res.index = index;
                return res;
            });
        }
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(mod => this.visitModifier(new Modifier(), mod));
        }
        if (context.decorators) {
            node.decorators = context.decorators.map(dec => this.visitDecorator(new Decorator(), dec));
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(t => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), t));
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        return node;
    }
    /**
     * todo
     * @param node
     * @param context
     */
    visitSemicolonClassElement(node, context) {
        node.node = context;
        return node;
    }
    /**
     * 创建modifiers
     * @param parent
     * @param modifiers
     */
    createModifiers(parent, modifiers) {
        if (modifiers) {
            return modifiers.map(modifier => {
                const ast = this.visitModifier(new Modifier(), modifier);
                ast.parent = parent;
                return ast;
            });
        }
        return [];
    }
    createJsDoc(comment) {
        const ast = new JSDoc();
        ast.comment = comment;
        return ast;
    }
    /**
     * 遍历方法
     * @param node
     * @param context
     */
    visitMethodDeclaration(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.decorators = this.createDecorators(context, node);
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body);
        }
        node.modifiers = this.createModifiers(node, context.modifiers);
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.parameters) {
            node.parameters = context.parameters.map((par, index) => {
                const res = this.visitParameterDeclaration(new ParameterDeclaration(), par);
                res.index = index;
                return res;
            });
            if (node.docs.length > 0) {
                const doc = node.docs[0];
                const tags = doc.tags.filter(tag => tag.tagName.text === 'param');
                if (tags.length > 0) {
                    node.parameters = node.parameters.map((par, index) => {
                        if (tags.length > index) {
                            const doc = this.createJsDoc(tags[index].comment);
                            par.docs.push(doc);
                        }
                        return par;
                    });
                }
            }
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), par));
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        return node;
    }
    visitParameterDeclaration(node, context) {
        node.node = context;
        node.decorators = this.createDecorators(context, node);
        node.docs = this.createJsDocs(context.jsDoc);
        if (context.dotDotDotToken) {
            node.dotDotDotToken = this.visitDotDotDotToken(new DotDotDotToken(), context.dotDotDotToken);
        }
        node.modifiers = this.createModifiers(node, context.modifiers);
        node.name = this.visitBindingName(undefined, context.name);
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken, context.questionToken);
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.initializer) {
            node.initializer = this.visitExpression(new Expression(), context.initializer);
        }
        return node;
    }
    visitBindingName(node, context) {
        if (ts.isObjectBindingPattern(context)) {
            return this.visitObjectBindingPattern(new ObjectBindingPattern(), context);
        }
        else if (ts.isArrayBindingPattern(context)) {
            return this.visitArrayBindingPattern(new ArrayBindingPattern(), context);
        }
        else {
            return this.visitIdentifier(new Identifier(), context);
        }
    }
    visitArrayBindingPattern(node, context) {
        node.node = context;
        return node;
    }
    visitObjectBindingPattern(node, context) {
        node.node = context;
        return node;
    }
    /**
     * ...[],{}
     * @param node
     * @param context
     */
    visitDotDotDotToken(node, context) {
        node.node = context;
        return node;
    }
    visitFunctionBody(node, context) {
        node.node = context;
        node.statements = context.statements.map(state => this.visitStatement(undefined, state));
        return node;
    }
    /**
     * 完善类属性
     * @param {PropertyDeclaration} node
     * @param {ts.PropertyDeclaration} context
     */
    visitPropertyDeclaration(node, context) {
        node.node = context;
        node.decorators = this.createDecorators(context, node);
        node.docs = this.createJsDocs(context.jsDoc);
        if (context.name) {
            node.name = this.visitPropertyName(undefined, context.name);
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        if (context.exclamationToken) {
            node.exclamationToken = this.visitExclamationToken(new ExclamationToken(), context.exclamationToken);
        }
        if (context.initializer) {
            node.initializer = this.visitExpression(new Expression(), context.initializer);
        }
        if (context.modifiers) {
            node.modifiers = context.modifiers.map(modifier => {
                const ast = this.visitModifier(new Modifier(), modifier);
                ast.parent = node;
                return ast;
            });
        }
        return node;
    }
    /**
     * 完善 Modifier
     * @param {Modifier} node
     * @param {ts.Modifier} context
     */
    visitModifier(node, context) {
        node.node = context;
        if (context.kind === ts.SyntaxKind.PublicKeyword) {
            node.name = 'public';
        }
        else if (context.kind === ts.SyntaxKind.AbstractKeyword) {
            node.name = 'abstract';
        }
        else if (context.kind === ts.SyntaxKind.AsyncKeyword) {
            node.name = 'async';
        }
        else if (context.kind === ts.SyntaxKind.ConstKeyword) {
            node.name = 'const';
        }
        else if (context.kind === ts.SyntaxKind.DeclareKeyword) {
            node.name = 'declare';
        }
        else if (context.kind === ts.SyntaxKind.DefaultKeyword) {
            node.name = 'default';
        }
        else if (context.kind === ts.SyntaxKind.ExportKeyword) {
            node.name = 'export';
        }
        else if (context.kind === ts.SyntaxKind.PrivateKeyword) {
            node.name = 'private';
        }
        else if (context.kind === ts.SyntaxKind.ProtectedKeyword) {
            node.name = 'protected';
        }
        else if (context.kind === ts.SyntaxKind.ReadonlyKeyword) {
            node.name = 'readonly';
        }
        else if (context.kind === ts.SyntaxKind.StaticKeyword) {
            node.name = 'static';
        }
        return node;
    }
    visitExpression(node, context) {
        node.node = context;
        if (ts.isStringLiteral(context)) {
            return this.visitStringLiteral(new StringLiteral(), context);
        }
        else if (ts.isNumericLiteral(context)) {
            return this.visitNumericLiteral(new NumericLiteral(), context);
        }
        else if (ts.isObjectLiteralExpression(context)) {
            return this.visitObjectLiteralExpression(new ObjectLiteralExpression(), context);
        }
        else if (ts.isArrayLiteralExpression(context)) {
            return this.visitArrayLiteralExpression(new ArrayLiteralExpression(), context);
        }
        else if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new Identifier(), context);
        }
        else if (ts.isAsExpression(context)) {
            return this.visitAsExpression(new AsExpression(), context);
        }
        else if (ts.isAwaitExpression(context)) {
            return this.visitAwaitExpression(new AwaitExpression(), context);
        }
        else if (ts.isArrowFunction(context)) {
            return this.visitArrowFunction(new ArrowFunction(), context);
        }
        else if (util.isBooleanLiteral(context)) {
            return this.visitBooleanLiteral(new BooleanLiteral(), context);
        }
        else if (ts.isCallExpression(context)) {
            return this.visitCallExpression(new CallExpression(), context);
        }
        else if (ts.isBinaryExpression(context)) {
            return this.visitBinaryExpression(new BinaryExpression(), context);
        }
        else if (ts.isElementAccessExpression(context)) {
            return this.visitElementAccessExpression(new ElementAccessExpression(), context);
        }
        else if (ts.isPropertyAccessExpression(context)) {
            return this.visitPropertyAccessExpression(new PropertyAccessExpression(), context);
        }
        else if (ts.isPrefixUnaryExpression(context)) {
            return this.visitPrefixUnaryExpression(new PrefixUnaryExpression(), context);
        }
        else if (ts.isTemplateExpression(context)) {
            return this.visitTemplateExpression(new TemplateExpression(), context);
        }
        else if (ts.isNewExpression(context)) {
            return this.visitNewExpression(new NewExpression(), context);
        }
        else if (util.isThisExpression(context)) {
            return this.visitThisExpression(new ThisExpression(), context);
        }
        else if (util.isNullLiteral(context)) {
            return this.visitNullLiteral(new NullLiteral(), context);
        }
        else if (ts.isNoSubstitutionTemplateLiteral(context)) {
            return this.visitNoSubstitutionTemplateLiteral(new NoSubstitutionTemplateLiteral(), context);
        }
        else if (ts.isConditionalExpression(context)) {
            return this.visitConditionalExpression(new ConditionalExpression(), context);
        }
        else if (ts.isSpreadElement(context)) {
            return this.visitSpreadElement(new SpreadElement(), context);
        }
        else if (ts.isTaggedTemplateExpression(context)) {
            return this.visitTaggedTemplateExpression(new TaggedTemplateExpression(), context);
        }
        else if (ts.isRegularExpressionLiteral(context)) {
            return this.visitRegularExpressionLiteral(new RegularExpressionLiteral(), context);
        }
        else if (ts.isParenthesizedExpression(context)) {
            return this.visitParenthesizedExpression(new ParenthesizedExpression(), context);
        }
        else {
            console.log(`visitExpression Error! ${context.kind}`);
        }
        return node;
    }
    visitSpreadElement(node, context) {
        return node;
    }
    visitNoSubstitutionTemplateLiteral(node, context) {
        node.text = context.text;
        node.hasExtendedUnicodeEscape = !!context.hasExtendedUnicodeEscape;
        node.isUnterminated = !!context.isUnterminated;
        return node;
    }
    visitNullLiteral(node, context) {
        return node;
    }
    visitPrefixUnaryExpression(node, context) {
        return node;
    }
    visitTemplateExpression(node, context) {
        return node;
    }
    visitNewExpression(node, context) {
        return node;
    }
    visitElementAccessExpression(node, context) {
        return node;
    }
    visitBinaryExpression(node, context) {
        return node;
    }
    visitBooleanLiteral(node, context) {
        node.node = context;
        if (context.kind === ts.SyntaxKind.TrueKeyword) {
            node.value = true;
        }
        else {
            node.value = false;
        }
        return node;
    }
    visitArrowFunction(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        return node;
    }
    visitAwaitExpression(node, context) {
        node.node = context;
        node.expression = this.visitUnaryExpression(new UnaryExpression(), context.expression);
        return node;
    }
    visitUnaryExpression(node, context) {
        node.node = context;
        if (ts.isCallExpression(context)) {
            return this.visitCallExpression(new CallExpression(), context);
        }
        else {
            console.log(`visitUnaryExpression error!! ${context.kind}`);
        }
        return node;
    }
    visitAsExpression(node, context) {
        node.node = context;
        node.type = this.visitTypeNode(undefined, context.type);
        node.expression = this.visitExpression(new Expression(), context.expression);
        return node;
    }
    visitArrayLiteralExpression(node, context) {
        node.node = context;
        node.elements = context.elements.map(ele => this.visitExpression(new Expression(), ele));
        return node;
    }
    visitExclamationToken(node, context) {
        node.node = context;
        return node;
    }
    visitQuestionToken(node, context) {
        node.node = context;
        return node;
    }
    /**
     * type node start
     */
    visitTypeNode(node, context) {
        if (ts.isTypeReferenceNode(context)) {
            return this.visitTypeReferenceNode(new TypeReferenceNode(), context);
        }
        else if (ts.isTupleTypeNode(context)) {
            return this.visitTupleTypeNode(new TupleTypeNode(), context);
        }
        else if (ts.isUnionTypeNode(context)) {
            return this.visitUnionTypeNode(new UnionTypeNode(), context);
        }
        else if (util.isKeywordTypeNode(context)) {
            return this.visitKeywordTypeNode(new KeywordTypeNode(), context);
        }
        else if (ts.isFunctionTypeNode(context)) {
            return this.visitFunctionTypeNode(new FunctionTypeNode(), context);
        }
        else if (ts.isMappedTypeNode(context)) {
            return this.visitMappedTypeNode(new MappedTypeNode(), context);
        }
        else if (ts.isIndexedAccessTypeNode(context)) {
            return this.visitIndexedAccessTypeNode(new IndexedAccessTypeNode(), context);
        }
        else if (ts.isTypeOperatorNode(context)) {
            return this.visitTypeOperatorNode(new TypeOperatorNode(), context);
        }
        else if (ts.isTypeLiteralNode(context)) {
            return this.visitTypeLiteralNode(new TypeLiteralNode(), context);
        }
        else if (ts.isArrayTypeNode(context)) {
            return this.visitArrayTypeNode(new ArrayTypeNode(), context);
        }
        else if (ts.isLiteralTypeNode(context)) {
            return this.visitLiteralTypeNode(new LiteralTypeNode(), context);
        }
        else if (ts.isTypePredicateNode(context)) {
            return this.visitTypePredicateNode(new TypePredicateNode(), context);
        }
        else if (ts.isImportTypeNode(context)) {
            return this.visitImportTypeNode(new ImportTypeNode(), context);
        }
        else if (ts.isParenthesizedTypeNode(context)) {
            return this.visitParenthesizedTypeNode(new ParenthesizedTypeNode(), context);
        }
        else if (ts.isIntersectionTypeNode(context)) {
            return this.visitIntersectionTypeNode(new IntersectionTypeNode(), context);
        }
        else if (ts.isExpressionWithTypeArguments(context)) {
            return this.visitExpressionWithTypeArguments(new ExpressionWithTypeArguments(), context);
        }
        else if (ts.isJSDocNullableType(context)) {
            return this.visitJSDocNullableType(new JSDocNullableType(), context);
        }
        else {
            throw new Error(`visitTypeNode Error! ${context.kind}`);
        }
    }
    visitJSDocNullableType(node, context) {
        return node;
    }
    visitIntersectionTypeNode(node, context) {
        return node;
    }
    visitParenthesizedTypeNode(node, context) {
        return node;
    }
    visitImportTypeNode(node, context) {
        if (context.typeArguments) {
            node.typeArguments = context.typeArguments.map(t => this.visitTypeNode(undefined, t));
        }
        node.isTypeOf = !!context.isTypeOf;
        node.argument = this.visitTypeNode(undefined, context.argument);
        if (context.qualifier) {
            node.qualifier = this.visitEntityName(new EntityName(), context.qualifier);
        }
        return node;
    }
    visitTypePredicateNode(node, context) {
        if (ts.isIdentifier(context.parameterName)) {
            node.parameterName = this.visitIdentifier(new Identifier(), context.parameterName);
        }
        else {
            node.parameterName = this.visitThisTypeNode(new ThisTypeNode(), context.parameterName);
        }
        node.type = this.visitTypeNode(undefined, context.type);
        return node;
    }
    visitLiteralTypeNode(node, context) {
        if (util.isBooleanLiteral(context.literal)) {
            node.literal = this.visitBooleanLiteral(new BooleanLiteral(), context.literal);
        }
        else if (util.isLiteralExpression(context.literal)) {
            node.literal = this.visitLiteralExpression(undefined, context.literal);
        }
        else {
            node.literal = this.visitPrefixUnaryExpression(new PrefixUnaryExpression(), context.literal);
        }
        return node;
    }
    visitArrayTypeNode(node, context) {
        node.elementType = this.visitTypeNode(undefined, context.elementType);
        return node;
    }
    visitTypeLiteralNode(node, context) {
        node.members = context.members.map(member => this.visitTypeElement(undefined, member));
        return node;
    }
    visitTypeOperatorNode(node, context) {
        node.type = this.visitTypeNode(undefined, context.type);
        node.operator = context.operator;
        return node;
    }
    visitIndexedAccessTypeNode(node, context) {
        node.indexType = this.visitTypeNode(undefined, context.indexType);
        node.objectType = this.visitTypeNode(undefined, context.objectType);
        return node;
    }
    visitMappedTypeNode(node, context) {
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        if (context.questionToken) {
            if (util.isQuestionToken(context.questionToken)) {
                node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
            }
            else if (util.isPlusToken(context.questionToken)) {
                node.questionToken = this.visitPlusToken(new PlusToken(), context.questionToken);
            }
            else if (util.isMinusToken(context.questionToken)) {
                node.questionToken = this.visitMinusToken(new MinusToken(), context.questionToken);
            }
        }
        if (context.readonlyToken) {
            if (util.isReadonlyToken(context.readonlyToken)) {
                node.readonlyToken = this.visitReadonlyToken(new ReadonlyToken(), context.readonlyToken);
            }
            else if (util.isPlusToken(context.readonlyToken)) {
                node.readonlyToken = this.visitPlusToken(new PlusToken(), context.readonlyToken);
            }
            else if (util.isMinusToken(context.readonlyToken)) {
                node.readonlyToken = this.visitMinusToken(new MinusToken(), context.readonlyToken);
            }
        }
        if (context.typeParameter) {
            node.typeParameter = this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), context.typeParameter);
        }
        return node;
    }
    /**
     * [number,string]
     * @param node
     * @param context
     */
    visitTupleTypeNode(node, context) {
        node.node = context;
        node.elementTypes = context.elementTypes.map(ele => this.visitTypeNode(undefined, ele));
        return node;
    }
    visitTypeReferenceNode(node, context) {
        node.node = context;
        if (context.typeArguments) {
            node.typeArguments = context.typeArguments.map(type => this.visitTypeNode(undefined, type));
        }
        node.typeName = this.visitEntityName(new EntityName(), context.typeName);
        return node;
    }
    /**
     * getInfo: <T>()=>Promise<T>
     * @param node
     * @param context
     */
    visitFunctionTypeNode(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par));
        node.type = this.visitTypeNode(undefined, context.type);
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), type));
        }
        return node;
    }
    /**
     * number string ...
     * @param node
     * @param context
     */
    visitKeywordTypeNode(node, context) {
        node.node = context;
        node.name = util.createKeywordTypeNode(context);
        return node;
    }
    /**
     * union
     * @param node
     * @param context
     */
    visitUnionTypeNode(node, context) {
        node.node = context;
        node.types = context.types.map(type => this.visitTypeNode(undefined, type));
        return node;
    }
    /**
     * type node end
     */
    visitEntityName(node, context) {
        node.node = context;
        if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new Identifier(), context);
        }
        else {
            return this.visitQualifiedName(new QualifiedName(), context);
        }
    }
    visitQualifiedName(node, context) {
        node.node = context;
        return node;
    }
    visitPropertyName(node, context) {
        if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new Identifier(), context);
        }
        else if (ts.isStringLiteral(context)) {
            return this.visitStringLiteral(new StringLiteral(), context);
        }
        else if (ts.isNumericLiteral(context)) {
            return this.visitNumericLiteral(new NumericLiteral(), context);
        }
        else {
            return this.visitComputedPropertyName(new ComputedPropertyName(), context);
        }
    }
    visitComputedPropertyName(node, context) {
        node.node = context;
        return node;
    }
    visitNumericLiteral(node, context) {
        node.node = context;
        node.text = context.text;
        node.isUnterminated = !!context.isUnterminated;
        node.hasExtendedUnicodeEscape = !!context.hasExtendedUnicodeEscape;
        return node;
    }
    visitStringLiteral(node, context) {
        node.node = context;
        node.text = context.text;
        return node;
    }
    createDecorators(context, parent) {
        if (context.decorators) {
            return context.decorators.map(dec => {
                const ast = this.visitDecorator(new Decorator(), dec);
                ast.parent = parent;
                return ast;
            });
        }
        return [];
    }
    visitDecorator(node, context) {
        node.node = context;
        node.expression = this.visitLeftHandSideExpression(new LeftHandSideExpression(), context.expression);
        return node;
    }
    visitLeftHandSideExpression(node, context) {
        try {
            node.node = context;
            if (ts.isNumericLiteral(context)) {
                return this.visitNumericLiteral(new NumericLiteral(), context);
            }
            else if (ts.isObjectLiteralExpression(context)) {
                return this.visitObjectLiteralExpression(new ObjectLiteralExpression(), context);
            }
            else if (ts.isCallExpression(context)) {
                return this.visitCallExpression(new CallExpression(), context);
            }
            else if (ts.isIdentifier(context)) {
                return this.visitIdentifier(new Identifier(), context);
            }
            else if (ts.isPropertyAccessExpression(context)) {
                return this.visitPropertyAccessExpression(new PropertyAccessExpression(), context);
            }
            else if (util.isThisExpression(context)) {
                return this.visitThisExpression(new ThisExpression(), context);
            }
            else if (ts.isParenthesizedExpression(context)) {
                return this.visitParenthesizedExpression(new ParenthesizedExpression(), context);
            }
            else if (ts.isNewExpression(context)) {
                return this.visitNewExpression(new NewExpression(), context);
            }
            else if (ts.isElementAccessExpression(context)) {
                return this.visitElementAccessExpression(new ElementAccessExpression(), context);
            }
            else if (util.isSuperExpression(context)) {
                return this.visitSuperExpression(new SuperExpression(), context);
            }
            else {
                console.log(`visitLeftHandSideExpression ${context.kind}`);
            }
            return node;
        }
        catch (e) {
            throw e;
        }
    }
    visitSuperExpression(node, context) {
        return node;
    }
    visitParenthesizedExpression(node, context) {
        return node;
    }
    visitThisExpression(node, context) {
        return node;
    }
    visitPropertyAccessExpression(node, context) {
        node.node = context;
        if (context.expression) {
            node.expression = this.visitLeftHandSideExpression(new LeftHandSideExpression(), context.expression);
        }
        node.name = this.visitIdentifier(new Identifier(), context.name);
        return node;
    }
    visitCallExpression(node, context) {
        node.node = context;
        if (context.expression) {
            node.expression = this.visitLeftHandSideExpression(new LeftHandSideExpression(), context.expression);
        }
        node.arguments = context.arguments.map(arg => this.visitExpression(new Expression(), arg));
        if (context.typeArguments) {
            node.typeArguments = context.typeArguments.map(arg => this.visitTypeNode(undefined, arg));
        }
        return node;
    }
    visitObjectLiteralExpression(node, context) {
        node.node = context;
        node.properties = context.properties.map(pro => this.visitObjectLiteralElementLike(new ObjectLiteralElementLike(), pro));
        return node;
    }
    visitObjectLiteralElementLike(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        if (ts.isPropertyAssignment(context)) {
            return this.visitPropertyAssignment(new PropertyAssignment(), context);
        }
        if (ts.isShorthandPropertyAssignment(context)) {
            return this.visitShorthandPropertyAssignment(new ShorthandPropertyAssignment(), context);
        }
        if (ts.isSpreadAssignment(context)) {
            return this.visitSpreadAssignment(new SpreadAssignment(), context);
        }
        if (ts.isMethodDeclaration(context)) {
            return this.visitMethodDeclaration(new MethodDeclaration(), context);
        }
        if (ts.isGetAccessorDeclaration(context)) {
            return this.visitGetAccessorDeclaration(new GetAccessorDeclaration(), context);
        }
        if (ts.isSetAccessorDeclaration(context)) {
            return this.visitSetAccessorDeclaration(new SetAccessorDeclaration(), context);
        }
        return node;
    }
    visitShorthandPropertyAssignment(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        return node;
    }
    visitSpreadAssignment(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        return node;
    }
    visitPropertyAssignment(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        node.initializer = this.visitExpression(new Expression(), context.initializer);
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        return node;
    }
    visitSetAccessorDeclaration(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        if (context.decorators) {
            node.decorators = context.decorators.map(dec => this.visitDecorator(new Decorator(), dec));
        }
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body);
        }
        if (context.parameters) {
            node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par));
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), par));
        }
        if (context.asteriskToken) {
            node.asteriskToken = this.visitAsteriskToken(new AsteriskToken(), context.asteriskToken);
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        return node;
    }
    visitGetAccessorDeclaration(node, context) {
        node.node = context;
        node.docs = this.createJsDocs(context.jsDoc);
        if (context.decorators) {
            node.decorators = context.decorators.map(dec => this.visitDecorator(new Decorator(), dec));
        }
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.body) {
            node.body = this.visitFunctionBody(new FunctionBody(), context.body);
        }
        if (context.parameters) {
            node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ParameterDeclaration(), par));
        }
        if (context.typeParameters) {
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new TypeParameterDeclaration(), par));
        }
        if (context.asteriskToken) {
            node.asteriskToken = this.visitAsteriskToken(new AsteriskToken(), context.asteriskToken);
        }
        if (context.questionToken) {
            node.questionToken = this.visitQuestionToken(new QuestionToken(), context.questionToken);
        }
        if (context.type) {
            node.type = this.visitTypeNode(undefined, context.type);
        }
        return node;
    }
    visitAsteriskToken(node, context) {
        return node;
    }
}
exports.TsVisitor = TsVisitor;
exports.tsVisitor = new TsVisitor();
//# sourceMappingURL=visitor.js.map