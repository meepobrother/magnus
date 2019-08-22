const { generate } = require("@graphql-codegen/cli");

export async function buildMagnusApi(
  schema: any,
  documents: string,
  output: string,
  name: string
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
            {
              "@notadd/codegen-nest-client": {
                namedClient: name
              }
            },
            "fragment-matcher"
          ]
        }
      }
    },
    true
  ).catch((e: any) => {
    throw e;
  });
}

export async function buildNgApi(
  schema: any,
  documents: string,
  output: string,
  name: string
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
            {
              "typescript-apollo-angular": {
                namedClient: name
              }
            },
            "fragment-matcher"
          ]
        }
      }
    },
    true
  ).catch((e: any) => {
    throw e;
  });
}

export async function buildReactApi(
  schema: any,
  documents: string,
  output: string,
  name: string
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
            {
              "@graphql-codegen/typescript-react-apollo": {
                namedClient: name
              }
            },
            "fragment-matcher"
          ]
        }
      }
    },
    true
  ).catch((e: any) => {
    throw e;
  });
}
