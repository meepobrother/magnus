"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeVisitor_1 = require("../../visitor3/typeVisitor");
function createTypeNode(node, context) {
    const typeVisitor = new typeVisitor_1.TypeVisitor();
    const typeContext = new typeVisitor_1.TypeContext();
    typeVisitor.typeArguments = context.parent.typeParameters;
    typeVisitor.currentEntity = context.currentEntity;
    const type = typeVisitor.visitTypeNode(node, typeContext);
    return type;
}
exports.createTypeNode = createTypeNode;
function findCurrentEntity(type) {
    if (type.isEntity)
        return type;
    const item = type.typeArguments &&
        type.typeArguments.find((type) => findCurrentEntity(type));
    if (item)
        return item;
}
exports.findCurrentEntity = findCurrentEntity;
function createTypeName(type, currentEntity) {
    if (isSimpleType(type.type))
        return ``;
    if (type.isEntity)
        return currentEntity;
    return `${type.typeArguments
        ? type.typeArguments.map(type => createTypeName(type, currentEntity))
        : ""}${type.type}`;
}
exports.createTypeName = createTypeName;
function isSimpleType(type) {
    switch (type) {
        case "Int":
        case "Boolean":
        case "String":
        case "Empty":
        case "Json":
        case "Error":
            return true;
        default:
            return false;
    }
}
exports.isSimpleType = isSimpleType;
//# sourceMappingURL=index.js.map