"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { generate } = require("@graphql-codegen/cli");
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
    }, true);
}
exports.buildNgApi = buildNgApi;
//# sourceMappingURL=buildApi.js.map