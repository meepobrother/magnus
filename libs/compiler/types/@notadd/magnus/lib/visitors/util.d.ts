import * as ts from 'typescript';
export declare type KeywordType = 'any' | 'unknown' | 'number' | 'bigint' | 'object' | 'object' | 'boolean' | 'string' | 'symbol' | 'this' | 'void' | 'undefined' | 'null' | 'never';
export declare function createKeywordTypeNode(node: ts.Node): KeywordType;
export declare function isKeywordTypeNode(node: ts.Node): node is ts.KeywordTypeNode;
export declare function isBooleanLiteral(node: ts.Node): node is ts.BooleanLiteral;
export declare function isLiteralExpression(node: ts.Node): node is ts.LiteralExpression;
export declare function isStringLiteral(node: ts.Node): node is ts.StringLiteral;
export declare function isRegularExpressionLiteral(node: ts.Node): node is ts.RegularExpressionLiteral;
export declare function isNoSubstitutionTemplateLiteral(node: ts.Node): node is ts.NoSubstitutionTemplateLiteral;
export declare function isNumericLiteral(node: ts.Node): node is ts.NumericLiteral;
export declare function isBigIntLiteral(node: ts.Node): node is ts.BigIntLiteral;
export declare function isQuestionToken(node: ts.Node): node is ts.QuestionToken;
export declare function isPlusToken(node: ts.Node): node is ts.PlusToken;
export declare function isMinusToken(node: ts.Node): node is ts.MinusToken;
export declare function isReadonlyToken(node: ts.Node): node is ts.ReadonlyToken;
export declare function isThisExpression(node: ts.Node): node is ts.ThisExpression;
export declare function isSuperExpression(node: ts.Node): node is ts.SuperExpression;
export declare function isLeftHandSideExpression(node: ts.Node): node is ts.LeftHandSideExpression;
export declare function isNullLiteral(node: ts.Node): node is ts.NullLiteral;
export declare function isConstructSignatureDeclaration(node: ts.Node): node is ts.ConstructSignatureDeclaration;
export declare class TypeHelper {
    visit(val: ts.Type): {
        isAny: boolean;
        isBigInt: boolean;
        isBigIntLike: boolean;
        isBigIntLiteral: boolean;
        isBoolean: boolean;
        isBooleanLike: boolean;
        isBooleanLiteral: boolean;
        isClass: boolean;
        isClassOrInterface: boolean;
        isConditional: boolean;
        isESSymbol: boolean;
        isESSymbolLike: boolean;
        isEnum: boolean;
        isEnumLike: boolean;
        isEnumLiteral: boolean;
        isIndex: boolean;
        isIndexedAccess: boolean;
        isInstantiable: boolean;
        isInstantiableNonPrimitive: boolean;
        isInstantiablePrimitive: boolean;
        isIntersection: boolean;
        isLiteral: boolean;
        isNarrowable: boolean;
        isNever: boolean;
        isNonPrimitive: boolean;
        isNotUnionOrUnit: boolean;
        isNull: boolean;
        isNumber: boolean;
        isNumberLike: boolean;
        isNumberLiteral: boolean;
        isObject: boolean;
        isPossiblyFalsy: boolean;
        isString: boolean;
        isStringLike: boolean;
        isStringLiteral: boolean;
        isStringOrNumberLiteral: boolean;
        isStructuredOrInstantiable: boolean;
        isSubstitution: boolean;
        isTypeParameter: boolean;
        isTypeVariable: boolean;
        isUndefined: boolean;
        isUnion: boolean;
        isUnionOrIntersection: boolean;
        isUniqueESSymbol: boolean;
        isUnit: boolean;
        isUnknown: boolean;
        isVoid: boolean;
        isVoidLike: boolean;
    };
    isClassDeclaration(val: ts.Node): val is ts.ClassDeclaration;
    isAny(val: ts.Type): boolean;
    isUnknown(val: ts.Type): boolean;
    isLiteral(val: ts.Type): val is ts.LiteralType;
    isVoid(val: ts.Type): boolean;
    isVoidLike(val: ts.Type): boolean;
    isUndefined(val: ts.Type): boolean;
    isNull(val: ts.Type): boolean;
    isNever(val: ts.Type): boolean;
    /**
     * string
     * @param {ts.Type} val
     */
    isStringLiteral(val: ts.Type): val is ts.StringLiteralType;
    isString(val: ts.Type): boolean;
    isStringLike(val: ts.Type): boolean;
    /**
     * number
     * @param {ts.Type} val
     */
    isNumberLiteral(val: ts.Type): val is ts.NumberLiteralType;
    isNumber(val: ts.Type): boolean;
    isNumberLike(val: ts.Type): boolean;
    /**
     * bigint
     * @param {ts.Type} val
     */
    isBigIntLiteral(val: ts.Type): val is ts.BigIntLiteralType;
    isBigInt(val: ts.Type): boolean;
    isBigIntLike(val: ts.Type): boolean;
    /**
     * boolean
     * @param {ts.Type}val
     */
    isBoolean(val: ts.Type): boolean;
    isBooleanLike(val: ts.Type): boolean;
    isBooleanLiteral(val: ts.Type): boolean;
    /**
     * enum
     * @param {ts.Type}val
     */
    isEnum(val: ts.Type): boolean;
    isEnumLike(val: ts.Type): boolean;
    isEnumLiteral(val: ts.Type): boolean;
    isStringOrNumberLiteral(val: ts.Type): boolean;
    /**
     *
     * @param {ts.Type}val
     */
    isClass(val: ts.Type): val is ts.InterfaceType;
    isClassOrInterface(val: ts.Type): val is ts.InterfaceType;
    isTypeParameter(val: ts.Type): val is ts.TypeParameter;
    isUnionOrIntersection(val: ts.Type): val is ts.UnionOrIntersectionType;
    isIntersection(val: ts.Type): val is ts.IntersectionType;
    isUnion(val: ts.Type): val is ts.UnionType;
    isObject(val: ts.Type): boolean;
    isIndex(val: ts.Type): boolean;
    isConditional(val: ts.Type): boolean;
    isSubstitution(val: ts.Type): boolean;
    isIndexedAccess(val: ts.Type): boolean;
    isUnit(val: ts.Type): boolean;
    isNonPrimitive(val: ts.Type): boolean;
    isESSymbolLike(val: ts.Type): boolean;
    isUniqueESSymbol(val: ts.Type): boolean;
    isPossiblyFalsy(val: ts.Type): boolean;
    isStructuredType(val: ts.Type): boolean;
    isTypeVariable(val: ts.Type): boolean;
    isInstantiableNonPrimitive(val: ts.Type): boolean;
    isInstantiablePrimitive(val: ts.Type): boolean;
    isInstantiable(val: ts.Type): boolean;
    isESSymbol(val: ts.Type): boolean;
    isNarrowable(val: ts.Type): boolean;
    isNotUnionOrUnit(val: ts.Type): boolean;
    isStructuredOrInstantiable(val: ts.Type): boolean;
}
export declare const typeHelper: TypeHelper;
