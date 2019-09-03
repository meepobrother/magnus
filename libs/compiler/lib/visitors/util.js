"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
function createKeywordTypeNode(node) {
    switch (node.kind) {
        case ts.SyntaxKind.AnyKeyword:
            return 'any';
        case ts.SyntaxKind.UnknownKeyword:
            return 'unknown';
        case ts.SyntaxKind.NumberKeyword:
            return 'number';
        case ts.SyntaxKind.BigIntKeyword:
            return 'bigint';
        case ts.SyntaxKind.ObjectKeyword:
            return 'object';
        case ts.SyntaxKind.BooleanKeyword:
            return 'boolean';
        case ts.SyntaxKind.StringKeyword:
            return 'string';
        case ts.SyntaxKind.SymbolKeyword:
            return 'symbol';
        case ts.SyntaxKind.ThisKeyword:
            return 'this';
        case ts.SyntaxKind.VoidKeyword:
            return 'void';
        case ts.SyntaxKind.UndefinedKeyword:
            return 'undefined';
        case ts.SyntaxKind.NullKeyword:
            return 'null';
        case ts.SyntaxKind.NeverKeyword:
            return 'never';
        default:
            return 'any';
    }
}
exports.createKeywordTypeNode = createKeywordTypeNode;
function isKeywordTypeNode(node) {
    switch (node.kind) {
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.UnknownKeyword:
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.BigIntKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.SymbolKeyword:
        case ts.SyntaxKind.ThisKeyword:
        case ts.SyntaxKind.VoidKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.NeverKeyword:
            return true;
        default:
            return false;
    }
}
exports.isKeywordTypeNode = isKeywordTypeNode;
function isBooleanLiteral(node) {
    return node.kind === ts.SyntaxKind.FalseKeyword || node.kind === ts.SyntaxKind.TrueKeyword;
}
exports.isBooleanLiteral = isBooleanLiteral;
function isLiteralExpression(node) {
    return isRegularExpressionLiteral(node) || isNoSubstitutionTemplateLiteral(node) || isNumericLiteral(node) || isBigIntLiteral(node) || isStringLiteral(node);
}
exports.isLiteralExpression = isLiteralExpression;
function isStringLiteral(node) {
    return node.kind === ts.SyntaxKind.StringLiteral;
}
exports.isStringLiteral = isStringLiteral;
function isRegularExpressionLiteral(node) {
    return node.kind === ts.SyntaxKind.RegularExpressionLiteral;
}
exports.isRegularExpressionLiteral = isRegularExpressionLiteral;
function isNoSubstitutionTemplateLiteral(node) {
    return node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral;
}
exports.isNoSubstitutionTemplateLiteral = isNoSubstitutionTemplateLiteral;
function isNumericLiteral(node) {
    return node.kind === ts.SyntaxKind.NumericLiteral;
}
exports.isNumericLiteral = isNumericLiteral;
function isBigIntLiteral(node) {
    return node.kind === ts.SyntaxKind.BigIntLiteral;
}
exports.isBigIntLiteral = isBigIntLiteral;
function isQuestionToken(node) {
    return node.kind === ts.SyntaxKind.QuestionToken;
}
exports.isQuestionToken = isQuestionToken;
function isPlusToken(node) {
    return node.kind === ts.SyntaxKind.PlusToken;
}
exports.isPlusToken = isPlusToken;
function isMinusToken(node) {
    return node.kind === ts.SyntaxKind.MinusToken;
}
exports.isMinusToken = isMinusToken;
function isReadonlyToken(node) {
    return node.kind === ts.SyntaxKind.ReadonlyKeyword;
}
exports.isReadonlyToken = isReadonlyToken;
function isThisExpression(node) {
    return node.kind === ts.SyntaxKind.ThisKeyword;
}
exports.isThisExpression = isThisExpression;
function isSuperExpression(node) {
    return node.kind === ts.SyntaxKind.SuperKeyword;
}
exports.isSuperExpression = isSuperExpression;
function isLeftHandSideExpression(node) {
    return [
        ts.SyntaxKind.PropertyAccessExpression
    ].includes(node.kind);
}
exports.isLeftHandSideExpression = isLeftHandSideExpression;
function isNullLiteral(node) {
    return node.kind === ts.SyntaxKind.NullKeyword;
}
exports.isNullLiteral = isNullLiteral;
function isConstructSignatureDeclaration(node) {
    return node.kind === ts.SyntaxKind.ConstructSignature;
}
exports.isConstructSignatureDeclaration = isConstructSignatureDeclaration;
class TypeHelper {
    visit(val) {
        return {
            isAny: this.isAny(val),
            isBigInt: this.isBigInt(val),
            isBigIntLike: this.isBigIntLike(val),
            isBigIntLiteral: this.isBigIntLiteral(val),
            isBoolean: this.isBoolean(val),
            isBooleanLike: this.isBooleanLike(val),
            isBooleanLiteral: this.isBooleanLiteral(val),
            isClass: this.isClass(val),
            isClassOrInterface: this.isClassOrInterface(val),
            isConditional: this.isConditional(val),
            isESSymbol: this.isESSymbol(val),
            isESSymbolLike: this.isESSymbolLike(val),
            isEnum: this.isEnum(val),
            isEnumLike: this.isEnumLike(val),
            isEnumLiteral: this.isEnumLiteral(val),
            isIndex: this.isIndex(val),
            isIndexedAccess: this.isIndexedAccess(val),
            isInstantiable: this.isInstantiable(val),
            isInstantiableNonPrimitive: this.isInstantiableNonPrimitive(val),
            isInstantiablePrimitive: this.isInstantiablePrimitive(val),
            isIntersection: this.isIntersection(val),
            isLiteral: this.isLiteral(val),
            isNarrowable: this.isNarrowable(val),
            isNever: this.isNever(val),
            isNonPrimitive: this.isNonPrimitive(val),
            isNotUnionOrUnit: this.isNotUnionOrUnit(val),
            isNull: this.isNull(val),
            isNumber: this.isNumber(val),
            isNumberLike: this.isNumberLike(val),
            isNumberLiteral: this.isNumberLiteral(val),
            isObject: this.isObject(val),
            isPossiblyFalsy: this.isPossiblyFalsy(val),
            isString: this.isString(val),
            isStringLike: this.isStringLike(val),
            isStringLiteral: this.isStringLiteral(val),
            isStringOrNumberLiteral: this.isStringOrNumberLiteral(val),
            isStructuredOrInstantiable: this.isStructuredOrInstantiable(val),
            isSubstitution: this.isSubstitution(val),
            isTypeParameter: this.isTypeParameter(val),
            isTypeVariable: this.isTypeVariable(val),
            isUndefined: this.isUndefined(val),
            isUnion: this.isUnion(val),
            isUnionOrIntersection: this.isUnionOrIntersection(val),
            isUniqueESSymbol: this.isUniqueESSymbol(val),
            isUnit: this.isUnit(val),
            isUnknown: this.isUnknown(val),
            isVoid: this.isVoid(val),
            isVoidLike: this.isVoidLike(val),
        };
    }
    isAny(val) {
        return val.flags === ts.TypeFlags.Any;
    }
    isUnknown(val) {
        return val.flags === ts.TypeFlags.Unknown;
    }
    isLiteral(val) {
        return val.isLiteral();
    }
    isVoid(val) {
        return val.flags === ts.TypeFlags.Void;
    }
    isVoidLike(val) {
        return val.flags === ts.TypeFlags.VoidLike;
    }
    isUndefined(val) {
        return val.flags === ts.TypeFlags.Undefined;
    }
    isNull(val) {
        return val.flags === ts.TypeFlags.Null;
    }
    isNever(val) {
        return val.flags === ts.TypeFlags.Never;
    }
    /**
     * string
     * @param {ts.Type} val
     */
    isStringLiteral(val) {
        return val.isStringLiteral();
    }
    isString(val) {
        return val.flags === ts.TypeFlags.String;
    }
    isStringLike(val) {
        return val.flags === ts.TypeFlags.StringLike;
    }
    /**
     * number
     * @param {ts.Type} val
     */
    isNumberLiteral(val) {
        return val.isNumberLiteral();
    }
    isNumber(val) {
        return val.flags === ts.TypeFlags.Number;
    }
    isNumberLike(val) {
        return val.flags === ts.TypeFlags.NumberLike;
    }
    /**
     * bigint
     * @param {ts.Type} val
     */
    isBigIntLiteral(val) {
        return val.flags === ts.TypeFlags.BigIntLiteral;
    }
    isBigInt(val) {
        return val.flags === ts.TypeFlags.BigInt;
    }
    isBigIntLike(val) {
        return val.flags === ts.TypeFlags.BigIntLike;
    }
    /**
     * boolean
     * @param {ts.Type}val
     */
    isBoolean(val) {
        return val.flags === ts.TypeFlags.Boolean;
    }
    isBooleanLike(val) {
        return val.flags === ts.TypeFlags.BooleanLike;
    }
    isBooleanLiteral(val) {
        return val.flags === ts.TypeFlags.BooleanLiteral;
    }
    /**
     * enum
     * @param {ts.Type}val
     */
    isEnum(val) {
        return val.flags === ts.TypeFlags.Enum;
    }
    isEnumLike(val) {
        return val.flags === ts.TypeFlags.EnumLike;
    }
    isEnumLiteral(val) {
        return val.flags === ts.TypeFlags.EnumLiteral;
    }
    isStringOrNumberLiteral(val) {
        return val.flags === ts.TypeFlags.StringOrNumberLiteral;
    }
    /**
     *
     * @param {ts.Type}val
     */
    isClass(val) {
        return val.isClass();
    }
    isClassOrInterface(val) {
        return val.isClassOrInterface();
    }
    isTypeParameter(val) {
        return val.isTypeParameter();
    }
    isUnionOrIntersection(val) {
        return val.isUnionOrIntersection();
    }
    isIntersection(val) {
        return val.isIntersection();
    }
    isUnion(val) {
        return val.isUnion();
    }
    isObject(val) {
        return val.flags === ts.TypeFlags.Object;
    }
    isIndex(val) {
        return val.flags === ts.TypeFlags.Index;
    }
    isConditional(val) {
        return val.flags === ts.TypeFlags.Conditional;
    }
    isSubstitution(val) {
        return val.flags === ts.TypeFlags.Substitution;
    }
    isIndexedAccess(val) {
        return val.flags === ts.TypeFlags.IndexedAccess;
    }
    isUnit(val) {
        return val.flags === ts.TypeFlags.Unit;
    }
    isNonPrimitive(val) {
        return val.flags === ts.TypeFlags.NonPrimitive;
    }
    isESSymbolLike(val) {
        return val.flags === ts.TypeFlags.ESSymbolLike;
    }
    isUniqueESSymbol(val) {
        return val.flags === ts.TypeFlags.UniqueESSymbol;
    }
    isPossiblyFalsy(val) {
        return val.flags === ts.TypeFlags.PossiblyFalsy;
    }
    isStructuredType(val) {
        return val.flags === ts.TypeFlags.StructuredType;
    }
    isTypeVariable(val) {
        return val.flags === ts.TypeFlags.TypeVariable;
    }
    isInstantiableNonPrimitive(val) {
        return val.flags === ts.TypeFlags.InstantiableNonPrimitive;
    }
    isInstantiablePrimitive(val) {
        return val.flags === ts.TypeFlags.InstantiablePrimitive;
    }
    isInstantiable(val) {
        return val.flags === ts.TypeFlags.Instantiable;
    }
    isESSymbol(val) {
        return val.flags === ts.TypeFlags.ESSymbol;
    }
    isNarrowable(val) {
        return val.flags === ts.TypeFlags.Narrowable;
    }
    isNotUnionOrUnit(val) {
        return val.flags === ts.TypeFlags.NotUnionOrUnit;
    }
    isStructuredOrInstantiable(val) {
        return val.flags === ts.TypeFlags.StructuredOrInstantiable;
    }
}
exports.TypeHelper = TypeHelper;
exports.typeHelper = new TypeHelper();
//# sourceMappingURL=util.js.map