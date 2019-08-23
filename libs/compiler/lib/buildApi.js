"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { generate } = require("@graphql-codegen/cli");
async function buildNgApi(schema, documents, output, name) {
    try {
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
    catch (e) { }
}
exports.buildNgApi = buildNgApi;
async function buildReactApi(schema, documents, output, name) {
    try {
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
    catch (e) { }
}
exports.buildReactApi = buildReactApi;
//# sourceMappingURL=buildApi.js.map