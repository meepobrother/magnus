import { ast } from '@notadd/magnus-graphql';
export function createStringValue(value: string) {
    const node = new ast.StringValueAst();
    node.value = value;
    return node;
}
export function createName(name: string) {
    const node = new ast.NameAst();
    node.value = name;
    return node;
}
export function createNamedType(name: string) {
    const node = new ast.NamedTypeAst();
    node.name = createName(name);
    return node;
}
export function createNonNullType(type: ast.NamedTypeAst | ast.ListTypeAst) {
    const node = new ast.NonNullTypeAst();
    node.type = type;
    return node;
}
export function createListType(type: ast.TypeAst) {
    const node = new ast.ListTypeAst();
    node.type = type;
    return node;
}
export function createTypeByName(name: string) {
    switch (name) {
        case "bigint":
            return createNamedType('Int');
        case "boolean":
            return createNamedType('Boolean');
        case "number":
            return createNamedType('Int');
        case "string":
            return createNamedType('String');
        case "null":
        case "undefined":
            return createNamedType('Empty');
        case "unknown":
        case "any":
        case "object":
            return createNamedType('Json');
        case "symbol":
        case "never":
        case "this":
        case "void":
            return createNamedType('Error');
        default:
            return createNamedType(name)
    }
}
export function createInputValue(name: string, type: string | ast.TypeAst | ast.NameAst, isNonNull: boolean = false, isList: boolean = false, description: string) {
    const node = new ast.InputValueDefinitionAst();
    node.name = createName(name);
    node.description = createStringValue(description);
    let namedType: ast.TypeAst = type as ast.TypeAst;
    if (typeof type === 'string') {
        namedType = createTypeByName(type)
    } else if (type instanceof ast.NamedTypeAst) {
        namedType = type;
    } else if (type instanceof ast.ListTypeAst) {
        namedType = type;
    } else if (type instanceof ast.NonNullTypeAst) {
        namedType = type;
    } else if ((type as any).kind === 'ArrayTypeNode') {
        namedType = createListType(
            createTypeByName(
                (type as any).elementType
            )
        )
    } else {
        console.log({
            type
        })
    }
    if (isList) {
        namedType = createListType(namedType)
    }
    if (isNonNull) {
        namedType = createNonNullType(namedType);
    }
    node.type = namedType;
    return node;
}