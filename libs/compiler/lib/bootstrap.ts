import { MagnusConfig } from "@notadd/magnus-core";
import { toJson, parse } from "@notadd/magnus-graphql";
import { ast as grpcAst } from "@notadd/magnus-grpc";
import { bootstrapClient } from "./client";
import * as morph from "ts-morph";
import { join, relative, dirname } from "path";
import {
  writeFileSync,
  ensureDirSync,
  existsSync,
  readFileSync
} from "fs-extra";
import * as ast from "./visitors/visitor";
import { collectionVisitor, CollectionContext } from "./visitors/collection";
import { MangusContextManager, MagnusVisitor } from "./visitors/magnus";
import { AstToGraphqlVisitor } from "./visitors/astToGraphql";
import { AstToProtoVisitor } from "./visitors/astToProto";
import { print, introspectionFromSchema, buildASTSchema } from "graphql";
import { watch } from "chokidar";
import globby = require("globby");
import { GraphqlToTs } from "./visitors/graphqlToTs";
import { camelCase } from "lodash";
import { ApiVisitor } from "./visitors/api";
import { buildNgApi, buildReactApi } from "./buildApi";
import { ApiToProtoVisitor } from "./visitors/apiToProto";
export async function bootstrap(config: MagnusConfig) {
  const target = config.target || "magnus";
  const sources = config.inputs.map(input => join(config.root, input));
  const clientTss = await globby(
    (config.client || []).map(input => join(config.root, input))
  );
  const srcs = [
    ...sources,
    `!${join(config.root, config.output)}/**/*`,
    `!${join(config.root, config.assets)}/**/*`,
    ...clientTss.map(file => `!${file.replace(".graphql", ".ts")}`)
  ];
  const inputs = await globby(srcs);
  if (target === "magnus") {
    config.output = config.output || "output";
    config.assets = config.assets || "assets";
    const dist = join(config.root, config.output, config.name);
    const assets = join(config.root, config.assets, config.name);
    ensureDirSync(dist);
    ensureDirSync(assets);

    async function compile(isServer: boolean = false) {
      const project = new morph.Project();
      project.addSourceFilesFromTsConfig(join(process.cwd(), "tsconfig.json"));
      const languageService = project.getLanguageService();
      // languageService.getDefinitions()
      const manager = new MangusContextManager();
      manager.isServer = isServer;
      const magnus = new MagnusVisitor(manager);
      const collectionContext = new CollectionContext();
      collectionContext.isServer = isServer;
      project.getSourceFiles().map((sourceFile: any) => {
        const fileName = sourceFile.getFilePath();
        if (inputs.includes(fileName)) {
          const node = ast.tsVisitor.visitSourceFile(
            new ast.SourceFile(),
            sourceFile.compilerNode
          );
          node.visit(collectionVisitor, collectionContext);
        }
      });
      // 处理class
      collectionContext.classes
        .map(cls => magnus.visitClassDeclaration(cls, collectionContext))
        .filter(item => !!item);
      const astToGraphqlVisitor = new AstToGraphqlVisitor();
      const documentAst = astToGraphqlVisitor.visitContextManager(
        manager,
        collectionContext
      );
      // 这里生成客户端使用的对应的graphql
      const apiVisitor = new ApiVisitor();
      if (documentAst.definitions.length > 17) {
        documentAst.visit(apiVisitor, {});
        let api = ``;
        if (apiVisitor.query) {
          apiVisitor.query.list.map((li: string) => (api += `${li}\n`));
        }
        if (apiVisitor.mutation) {
          apiVisitor.mutation.list.map((li: string) => (api += `${li}\n`));
        }
        if (apiVisitor.subscription) {
          apiVisitor.subscription.list.map((li: string) => (api += `${li}\n`));
        }
        const res = toJson(documentAst);
        if (api.length > 0) {
          if (isServer) {
            const content = print(res);
            writeFileSync(join(assets, `magnus.server.graphql`), content);
            writeFileSync(join(assets, `magnus.server-api.graphql`), api);
            try {
              const schema = buildASTSchema(res);
              writeFileSync(
                join(assets, "magnus.server-schema.json"),
                JSON.stringify(introspectionFromSchema(schema), null, 2)
              );
            } catch (e) {
              console.log(e.message);
            }
            buildNgApi(
              join(assets, "magnus.server-schema.json"),
              join(assets, `magnus.server-api.graphql`),
              join(
                dist,
                `magnus.server-angular.v${config.version || `1.0.0`}.ts`
              ),
              config.name
            );
            buildReactApi(
              join(assets, "magnus.server-schema.json"),
              join(assets, `magnus.server-api.graphql`),
              join(
                dist,
                `magnus.server-react.v${config.version || `1.0.0`}.tsx`
              ),
              config.name
            );
            // create ast
            const parseGraphqlAst = parse(api);
            const astToProtoVisitor = new AstToProtoVisitor();
            astToProtoVisitor.config = config;
            const proto = parseGraphqlAst.visit(
              astToProtoVisitor,
              collectionContext
            );
            const protoAst = new grpcAst.ParseVisitor();
            const protoStr = proto.visit(protoAst, ``);
            writeFileSync(join(assets, `magnus.proto`), protoStr);
          }
        }
        // 搜集metadata entity数据库 类名 依赖名
        if (isServer) {
          const metadataContent = JSON.stringify(
            astToGraphqlVisitor.tsToGraphqlVisitor.def,
            null,
            2
          );
          writeFileSync(join(assets, `magnus.metadata.json`), metadataContent);
          const serverContent = JSON.stringify(res, null, 2);
          writeFileSync(join(assets, `magnus.server.json`), serverContent);
        } else {
          const content = JSON.stringify(res, null, 2);
          writeFileSync(join(assets, `magnus.json`), content);
        }
        if (!isServer) {
          // proto
          const astToProtoVisitor = new AstToProtoVisitor();
          astToProtoVisitor.config = config;
          const proto = documentAst.visit(astToProtoVisitor, collectionContext);
          const protoAst = new grpcAst.ParseVisitor();
          const protoStr = proto.visit(protoAst, ``);
          if (documentAst.definitions.length > 0 && config.hasGrpc) {
            writeFileSync(join(assets, `magnus.proto`), protoStr);
          }
        }
        const visitor = new GraphqlToTs();
        const sourceFile = astToGraphqlVisitor.documentAst;

        if (sourceFile.definitions.length > 17) {
          const context = `import {
    Double,
    Float,
    Int32,
    Uint32,
    Sint32,
    Fixed32,
    Sfixed32,
    Int64,
    Uint64,
    Sint64,
    Fixed64,
    Sfixed64,
    Bool,
    String,
    Bytes,
    Empty
} from '@notadd/magnus-core';
import { Observable } from 'rxjs';
`;
          const content = sourceFile.visit(visitor, context);
          if (isServer) {
            // declare
            writeFileSync(join(dist, `magnus.server.ts`), content);
          } else {
            writeFileSync(join(dist, `magnus.ts`), content);
          }
        }
        // 生成使用文件
        if (config.hasGrpc) {
          const path2 = join(assets, `magnus.proto`);
          const relativePath = relative(dist, path2);
          const index = `import { Transport } from '@nestjs/microservices';
import { join } from 'path';
export const ${camelCase(config.name)}Options: any = {
    transport: Transport.GRPC,
    options: {
        url: \`\${process.env.${config.hostEnv ||
          "COMMON_HOST"} || '0.0.0.0'}:\${process.env.${config.portEnv ||
            "COMMON_PORT"}||'9001'}\`,
        package: '${config.name || "magnus"}',
        protoPath: join(__dirname, '${relativePath}'),
    },
    name: "${config.name || "magnus"}"
};
`;
          writeFileSync(join(dist, `${config.name}.ts`), index);
        }
        if (isServer) {
          const entities = astToGraphqlVisitor.tsToGraphqlVisitor.entities;
          writeFileSync(
            join(assets, `magnus.entity.json`),
            JSON.stringify(entities, null, 2)
          );
        } else {
          const permissions = astToGraphqlVisitor.tsToGraphqlVisitor.permission;
          if (Object.keys(permissions).length > 0) {
            writeFileSync(
              join(assets, `magnus.permission.json`),
              JSON.stringify(permissions, null, 2)
            );
          }
        }
        writeFileSync(
          join(assets, `ip.txt`),
          `${config.name}前端接口:${config.host}${
            config.port ? `:${config.port}` : ""
          }`
        );
        writeFileSync(
          join(dist, `api-url.v${config.version}.ts`),
          `export const apiConfig = {
  apiUrl: 'http://${config.host}${
            config.port ? `:${config.port}` : ""
          }/graphql',
  name: '${config.name}'
};`
        );
      }
    }
    if (config.debug) {
      watch(inputs)
        .on("add", (path: string) => {
          if (path.endsWith(".ts")) {
            compile();
            compile(true);
            sendFile(config);
          } else {
            const filePath = dirname(path);
            const fileName = path.replace(filePath, "");
            console.log("send local file " + fileName);
            sendLocalFile(filePath, fileName, config);
          }
          bootstrapClient(config);
        })
        .on("change", (path: string) => {
          if (path.endsWith(".ts")) {
            compile();
            compile(true);
            sendFile(config);
          } else {
            const filePath = dirname(path);
            const fileName = path.replace(filePath, "");
            sendLocalFile(filePath, fileName, config);
          }
          bootstrapClient(config);
        })
        .on("unlink", (path: string) => {
          if (path.endsWith(".ts")) {
            compile();
            compile(true);
          } else {
            const filePath = dirname(path);
            const fileName = path.replace(filePath, "");
            sendLocalFile(filePath, fileName, config);
          }
          bootstrapClient(config);
          sendFile(config);
        });
    } else {
      compile();
      compile(true);
      sendFile(config);
      bootstrapClient(config);
    }
  } else {
    inputs.filter(it => {
      if (it.endsWith(".json")) {
        const filePath = dirname(it);
        const fileName = it.replace(filePath, ``);
        sendLocalFile(filePath, fileName, config);
      }
    });
    // 解析navigation
    const file = join(config.root, config.navigation);
    const filePath = dirname(file);
    const fileName = file.replace(filePath, ``);
    sendLocalFile(filePath, fileName, config);
  }
}

export function sendLocalFile(
  path: string,
  name: string,
  config: MagnusConfig
) {
  const filePath = join(path, name);
  if (existsSync(filePath)) {
    const context = readFileSync(join(path, name)).toString("utf8");
    // 广播文件内容
    const isDist = (file: string) =>
      file.endsWith(".ts") || file.endsWith(".tsx");
    config.broadcast(
      Buffer.from(
        JSON.stringify({
          name: config.name,
          type: isDist(name) ? "output" : "assets",
          fileName: name,
          debug: config.debug,
          content: context,
          host: config.host
        })
      )
    );
  }
}

export function sendFile(config: MagnusConfig) {
  const target = config.target || "magnus";
  const dist = join(config.root, config.output, config.name);
  const assets = join(config.root, config.assets, config.name);
  if (target === "magnus") {
    sendLocalFile(dist, `${config.name}.ts`, config);
    sendLocalFile(dist, "magnus.ts", config);
    sendLocalFile(dist, "magnus.server.ts", config);
    sendLocalFile(
      dist,
      `magnus.server-angular.v${config.version || "1.0.0"}.ts`,
      config
    );
    sendLocalFile(
      dist,
      `magnus.server-react.v${config.version || "1.0.0"}.tsx`,
      config
    );
    sendLocalFile(
      dist,
      `magnus.server-api.v${config.version || "1.0.0"}.ts`,
      config
    );
    sendLocalFile(dist, `api-url.v${config.version || "1.0.0"}.ts`, config);
    sendLocalFile(assets, "magnus.proto", config);
    sendLocalFile(assets, "ip.txt", config);
  }
}
