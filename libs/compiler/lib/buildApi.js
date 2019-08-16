"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { generate } = require("@graphql-codegen/cli");
async function buildNgApi(schema, documents, output) {
    console.log({
        documents,
        output,
        schema
    });
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
                    "typescript-apollo-angular",
                    "fragment-matcher"
                ]
            }
        }
    }, true);
}
exports.buildNgApi = buildNgApi;
//# sourceMappingURL=buildApi.js.map