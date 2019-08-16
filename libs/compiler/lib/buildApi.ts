const { generate } = require("@graphql-codegen/cli");
export async function buildNgApi(
  schema: any,
  documents: string,
  output: string
) {
  await generate(
    {
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
    },
    true
  );
}
