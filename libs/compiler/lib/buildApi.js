"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { generate } = require("@graphql-codegen/cli");
async function buildMagnusApi(schema, documents, output, name) {
    await generate({
        overwrite: true,
        schema,
        documents,
        generates: {
            [`${output}`]: {
                plugins: [
                    { add: "/* tslint:disable */" },
                    "typescript",
                    "typescript-operations",
                    {
                        "@notadd/codegen-nest-client": {
                            namedClient: name
                        }
                    },
                    "fragment-matcher"
                ]
            }
        }
    }, true).catch((e) => {
        throw e;
    });
}
exports.buildMagnusApi = buildMagnusApi;
async function buildNgApi(schema, documents, output, name) {
    await generate({
        overwrite: true,
        schema,
        documents,
        generates: {
            [`${output}`]: {
                plugins: [
                    { add: "/* tslint:disable */" },
                    "typescript",
                    "typescript-operations",
                    {
                        "typescript-apollo-angular": {
                            namedClient: name
                        }
                    },
                    "fragment-matcher"
                ]
            }
        }
    }, true).catch((e) => {
        throw e;
    });
}
exports.buildNgApi = buildNgApi;
async function buildReactApi(schema, documents, output, name) {
    await generate({
        overwrite: true,
        schema,
        documents,
        generates: {
            [`${output}`]: {
                plugins: [
                    { add: "/* tslint:disable */" },
                    "typescript",
                    "typescript-operations",
                    {
                        "@graphql-codegen/typescript-react-apollo": {
                            namedClient: name
                        }
                    },
                    "fragment-matcher"
                ]
            }
        }
    }, true).catch((e) => {
        throw e;
    });
}
exports.buildReactApi = buildReactApi;
//# sourceMappingURL=buildApi.js.map