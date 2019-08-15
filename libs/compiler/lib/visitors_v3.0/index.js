"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const fs = tslib_1.__importStar(require("fs"));
const path_1 = require("path");
/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileNames, options) {
    // Build a program using the set of root file names in fileNames
    const program = ts.createProgram(fileNames, options);
    // Get the checker, we will use it to find more about classes
    const checker = program.getTypeChecker();
    const output = [];
    // Visit every sourceFile in the program
    for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
            // Walk the tree to search for classes
            ts.forEachChild(sourceFile, visit);
        }
    }
    // print out the doc
    fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));
    return;
    /** visit nodes finding exported classes */
    function visit(node) {
        // Only consider exported nodes
        if (!isNodeExported(node)) {
            return;
        }
        if (ts.isClassDeclaration(node) && node.name) {
            // This is a top level class, get its symbol
            const symbol = checker.getSymbolAtLocation(node.name);
            if (symbol) {
                output.push(serializeClass(symbol));
            }
            // No need to walk any further, class expressions/inner declarations
            // cannot be exported
        }
        else if (ts.isModuleDeclaration(node)) {
            // This is a namespace, visit its children
            ts.forEachChild(node, visit);
        }
    }
    /** Serialize a symbol into a json object */
    function serializeSymbol(symbol) {
        return {
            name: symbol.getName(),
            documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
            type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)),
            properties: []
        };
    }
    /** Serialize a class symbol information */
    function serializeClass(symbol) {
        const details = serializeSymbol(symbol);
        // Get the construct signatures
        const constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
        details.constructors = constructorType
            .getConstructSignatures()
            .map(serializeSignature);
        if (symbol.members)
            symbol.members.forEach(element => {
                const name = element.getName();
                const typeNode = checker.getTypeOfSymbolAtLocation(element, element.valueDeclaration);
                const callSignatures = typeNode.getCallSignatures();
                const type = checker.typeToString(typeNode);
                debugger;
                if (Array.isArray(details.properties))
                    details.properties.push(element);
            });
        return details;
    }
    /** Serialize a signature (call or construct) */
    function serializeSignature(signature) {
        return {
            parameters: signature.parameters.map(serializeSymbol),
            returnType: checker.typeToString(signature.getReturnType()),
            documentation: ts.displayPartsToString(signature.getDocumentationComment(checker))
        };
    }
    /** True if this is visible outside this file, false otherwise */
    function isNodeExported(node) {
        return ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !==
            0 ||
            (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile));
    }
}
generateDocumentation([path_1.join(__dirname, "1.ts"), path_1.join(__dirname, "2.ts")], {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
});
//# sourceMappingURL=index.js.map