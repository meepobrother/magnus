"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const visitor_1 = require("./visitor");
exports.ApolloAngularVisitor = visitor_1.ApolloAngularVisitor;
const path_1 = require("path");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.plugin = (schema, documents, config) => {
    const allAst = graphql_1.concatAST(documents.reduce((prev, v) => {
        return [...prev, v.content];
    }, []));
    const operations = allAst.definitions.filter(d => d.kind === graphql_1.Kind.OPERATION_DEFINITION);
    const allFragments = [
        ...allAst.definitions.filter(d => d.kind === graphql_1.Kind.FRAGMENT_DEFINITION).map(fragmentDef => ({
            node: fragmentDef,
            name: fragmentDef.name.value,
            onType: fragmentDef.typeCondition.name.value,
            isExternal: false
        })),
        ...(config.externalFragments || [])
    ];
    const visitor = new visitor_1.ApolloAngularVisitor(allFragments, operations, config);
    const visitorResult = graphql_1.visit(allAst, { leave: visitor });
    return {
        prepend: visitor.getImports(),
        content: [
            visitor.fragments,
            ...visitorResult.definitions.filter(t => typeof t === "string")
        ].join("\n")
    };
};
exports.addToSchema = graphql_tag_1.default `
  directive @NgModule(module: String!) on OBJECT | FIELD
  directive @namedClient(name: String!) on OBJECT | FIELD
`;
exports.validate = async (schema, documents, config, outputFile) => {
    if (path_1.extname(outputFile) !== ".ts") {
        throw new Error(`Plugin "apollo-angular" requires extension to be ".ts"!`);
    }
};
//# sourceMappingURL=index.js.map