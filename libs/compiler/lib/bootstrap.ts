import { MagnusConfig } from "@notadd/magnus-core";
import { toJson } from "@notadd/magnus-graphql";
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
import { makeExecutableSchema } from "graphql-tools";
import { buildNgApi } from "./buildApi";
export async function bootstrap(config: MagnusConfig) {
  config.output = config.output || "output";
  config.assets = config.assets || "assets";
  const clientTss = await globby(
    (config.client || []).map(input => join(config.root, input))
  );
  const dist = join(config.root, config.output, config.name);
  const assets = join(config.root, config.assets, config.name);
  ensureDirSync(dist);
  ensureDirSync(assets);
  const sources = config.inputs.map(input => join(config.root, input));
  const srcs = [
    ...sources,
    `!${join(config.root, config.output)}/**/*`,
    `!${join(config.root, config.assets)}/**/*`,
    ...clientTss.map(file => `!${file.replace(".graphql", ".ts")}`)
  ];
  const inputs = await globby(srcs);
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
          writeFileSync(join(assets, `magnus.server-api.graphql`), api);
          await config.broadcast(
            Buffer.from(
              JSON.stringify({
                name: config.name,
                type: "assets",
                debug: config.debug,
                fileName: `magnus.server-api.graphql`,
                content: api,
                host: config.host
              })
            )
          );
          const schema = buildASTSchema(res);
          const introspectionSchema = JSON.stringify(
            introspectionFromSchema(schema),
            null,
            2
          );
          buildNgApi(
            introspectionSchema,
            join(assets, `magnus.server-api.graphql`),
            join(dist, `magnus.service.ts`)
          );
          sendLocalFile(dist, `magnus.service.ts`, config);
        } else {
          writeFileSync(join(assets, `magnus.client-api.graphql`), api);
          await config.broadcast(
            Buffer.from(
              JSON.stringify({
                name: config.name,
                type: "assets",
                debug: config.debug,
                fileName: `magnus.client-api.graphql`,
                content: api,
                host: config.host
              })
            )
          );
          const schema = buildASTSchema(res);
          const introspectionSchema = JSON.stringify(
            introspectionFromSchema(schema),
            null,
            2
          );
          buildNgApi(
            introspectionSchema,
            join(assets, `magnus.client-api.graphql`),
            join(dist, `magnus.service.ts`)
          );
          sendLocalFile(dist, `magnus.service.ts`, config);
        }
      }

      if (isServer) {
        const content = print(res);
        writeFileSync(join(assets, `magnus.server.graphql`), content);
        await config.broadcast(
          Buffer.from(
            JSON.stringify({
              name: config.name,
              type: "assets",
              debug: config.debug,
              fileName: `magnus.server.graphql`,
              content: content,
              host: config.host
            })
          )
        );
      } else {
        if (res.definitions.length > 0) {
          const content = print(res);
          writeFileSync(join(assets, `magnus.graphql`), content);
          await config.broadcast(
            Buffer.from(
              JSON.stringify({
                name: config.name,
                type: "assets",
                debug: config.debug,
                fileName: `magnus.graphql`,
                content: content,
                host: config.host
              })
            )
          );
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
          await config.broadcast(
            Buffer.from(
              JSON.stringify({
                name: config.name,
                type: "assets",
                debug: config.debug,
                fileName: `magnus.proto`,
                content: protoStr,
                host: config.host
              })
            )
          );
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
          await config.broadcast(
            Buffer.from(
              JSON.stringify({
                name: config.name,
                debug: config.debug,
                type: "output",
                fileName: `magnus.server.ts`,
                content,
                host: config.host
              })
            )
          );
        } else {
          writeFileSync(join(dist, `magnus.ts`), content);
          await config.broadcast(
            Buffer.from(
              JSON.stringify({
                name: config.name,
                debug: config.debug,
                type: "output",
                fileName: `magnus.ts`,
                content,
                host: config.host
              })
            )
          );
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
        await config.broadcast(
          Buffer.from(
            JSON.stringify({
              name: config.name,
              type: "output",
              debug: config.debug,
              fileName: `${config.name}.ts`,
              content: index,
              host: config.host
            })
          )
        );
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
      config.broadcast(
        Buffer.from(
          JSON.stringify({
            name: config.name,
            fileName: `ip.txt`,
            type: "assets",
            content: `${config.host}`,
            host: config.host
          })
        )
      );
    }
  }
  if (config.debug) {
    watch(inputs)
      .on("add", (path: string) => {
        if (path.endsWith(".ts")) {
          compile();
          compile(true);
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
        } else {
          const filePath = dirname(path);
          const fileName = path.replace(filePath, "");
          console.log("send local file " + fileName);
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
          console.log("send local file " + fileName);
          sendLocalFile(filePath, fileName, config);
        }
        bootstrapClient(config);
      });
  } else {
    inputs.map(it => {
      if (!it.endsWith(".ts")) {
        const filePath = dirname(it);
        const fileName = it.replace(filePath, "").replace("/", "");
        sendLocalFile(filePath, fileName, config);
        return false;
      }
    });
    compile();
    compile(true);
    bootstrapClient(config);
  }
}

export function sendLocalFile(
  path: string,
  name: string,
  config: MagnusConfig
) {
  if (existsSync(join(path, name))) {
    config.broadcast(
      Buffer.from(
        JSON.stringify({
          name: config.name,
          type: name.endsWith(".ts") ? "output" : "assets",
          fileName: name,
          debug: config.debug,
          content: readFileSync(join(path, name)).toString("utf8"),
          host: config.host
        })
      )
    );
  }
}

export function sendFile(config: MagnusConfig) {
  const dist = join(config.root, config.output);
  const assets = join(config.root, config.assets);
  sendLocalFile(dist, `${config.name}.ts`, config);
  sendLocalFile(dist, "magnus.ts", config);
  sendLocalFile(assets, "magnus.proto", config);
  config.broadcast(
    Buffer.from(
      JSON.stringify({
        name: config.name,
        fileName: `ip.txt`,
        type: "assets",
        content: `${config.host}`,
        host: config.host
      })
    )
  );
}
