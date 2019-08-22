"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const magnus_grpc_1 = require("@notadd/magnus-grpc");
const client_1 = require("./client");
const morph = tslib_1.__importStar(require("ts-morph"));
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const ast = tslib_1.__importStar(require("./visitors/visitor"));
const collection_1 = require("./visitors/collection");
const magnus_1 = require("./visitors/magnus");
const astToGraphql_1 = require("./visitors/astToGraphql");
const astToProto_1 = require("./visitors/astToProto");
const graphql_1 = require("graphql");
const chokidar_1 = require("chokidar");
const globby = require("globby");
const graphqlToTs_1 = require("./visitors/graphqlToTs");
const lodash_1 = require("lodash");
const api_1 = require("./visitors/api");
const buildApi_1 = require("./buildApi");
async function bootstrap(config) {
    const target = config.target || "magnus";
    const sources = config.inputs.map(input => path_1.join(config.root, input));
    const clientTss = await globby((config.client || []).map(input => path_1.join(config.root, input)));
    const srcs = [
        ...sources,
        `!${path_1.join(config.root, config.output)}/**/*`,
        `!${path_1.join(config.root, config.assets)}/**/*`,
        ...clientTss.map(file => `!${file.replace(".graphql", ".ts")}`)
    ];
    const inputs = await globby(srcs);
    if (target === "magnus") {
        config.output = config.output || "output";
        config.assets = config.assets || "assets";
        const dist = path_1.join(config.root, config.output, config.name);
        const assets = path_1.join(config.root, config.assets, config.name);
        fs_extra_1.ensureDirSync(dist);
        fs_extra_1.ensureDirSync(assets);
        async function compile(isServer = false) {
            const project = new morph.Project();
            project.addSourceFilesFromTsConfig(path_1.join(process.cwd(), "tsconfig.json"));
            const languageService = project.getLanguageService();
            // languageService.getDefinitions()
            const manager = new magnus_1.MangusContextManager();
            manager.isServer = isServer;
            const magnus = new magnus_1.MagnusVisitor(manager);
            const collectionContext = new collection_1.CollectionContext();
            collectionContext.isServer = isServer;
            project.getSourceFiles().map((sourceFile) => {
                const fileName = sourceFile.getFilePath();
                if (inputs.includes(fileName)) {
                    const node = ast.tsVisitor.visitSourceFile(new ast.SourceFile(), sourceFile.compilerNode);
                    node.visit(collection_1.collectionVisitor, collectionContext);
                }
            });
            // 处理class
            collectionContext.classes
                .map(cls => magnus.visitClassDeclaration(cls, collectionContext))
                .filter(item => !!item);
            const astToGraphqlVisitor = new astToGraphql_1.AstToGraphqlVisitor();
            const documentAst = astToGraphqlVisitor.visitContextManager(manager, collectionContext);
            // 这里生成客户端使用的对应的graphql
            const apiVisitor = new api_1.ApiVisitor();
            if (documentAst.definitions.length > 17) {
                documentAst.visit(apiVisitor, {});
                let api = ``;
                if (apiVisitor.query) {
                    apiVisitor.query.list.map((li) => (api += `${li}\n`));
                }
                if (apiVisitor.mutation) {
                    apiVisitor.mutation.list.map((li) => (api += `${li}\n`));
                }
                if (apiVisitor.subscription) {
                    apiVisitor.subscription.list.map((li) => (api += `${li}\n`));
                }
                const res = magnus_graphql_1.toJson(documentAst);
                if (api.length > 0) {
                    if (isServer) {
                        const content = graphql_1.print(res);
                        fs_extra_1.writeFileSync(path_1.join(assets, `magnus.server.graphql`), content);
                        fs_extra_1.writeFileSync(path_1.join(assets, `magnus.server-api.graphql`), api);
                        const schema = graphql_1.buildASTSchema(res);
                        fs_extra_1.writeFileSync(path_1.join(assets, "magnus.server-schema.json"), JSON.stringify(graphql_1.introspectionFromSchema(schema), null, 2));
                        buildApi_1.buildNgApi(path_1.join(assets, "magnus.server-schema.json"), path_1.join(assets, `magnus.server-api.graphql`), path_1.join(dist, `magnus.server-angular.v${config.version || `1.0.0`}.ts`), config.name);
                        buildApi_1.buildReactApi(path_1.join(assets, "magnus.server-schema.json"), path_1.join(assets, `magnus.server-api.graphql`), path_1.join(dist, `magnus.server-react.v${config.version || `1.0.0`}.tsx`), config.name);
                        buildApi_1.buildMagnusApi(path_1.join(assets, "magnus.server-schema.json"), path_1.join(assets, `magnus.server-api.graphql`), path_1.join(dist, `magnus.server-magnus.v${config.version || `1.0.0`}.tsx`), config.name);
                        // create ast
                        const parseGraphqlAst = magnus_graphql_1.parse(api);
                        const astToProtoVisitor = new astToProto_1.AstToProtoVisitor();
                        astToProtoVisitor.config = config;
                        const proto = parseGraphqlAst.visit(astToProtoVisitor, collectionContext);
                        const protoAst = new magnus_grpc_1.ast.ParseVisitor();
                        const protoStr = proto.visit(protoAst, ``);
                        fs_extra_1.writeFileSync(path_1.join(assets, `magnus.server.proto`), protoStr);
                    }
                }
                // 搜集metadata entity数据库 类名 依赖名
                if (isServer) {
                    const metadataContent = JSON.stringify(astToGraphqlVisitor.tsToGraphqlVisitor.def, null, 2);
                    fs_extra_1.writeFileSync(path_1.join(assets, `magnus.metadata.json`), metadataContent);
                    const serverContent = JSON.stringify(res, null, 2);
                    fs_extra_1.writeFileSync(path_1.join(assets, `magnus.server.json`), serverContent);
                }
                else {
                    const content = JSON.stringify(res, null, 2);
                    fs_extra_1.writeFileSync(path_1.join(assets, `magnus.json`), content);
                }
                if (!isServer) {
                    // proto
                    const astToProtoVisitor = new astToProto_1.AstToProtoVisitor();
                    astToProtoVisitor.config = config;
                    const proto = documentAst.visit(astToProtoVisitor, collectionContext);
                    const protoAst = new magnus_grpc_1.ast.ParseVisitor();
                    const protoStr = proto.visit(protoAst, ``);
                    if (documentAst.definitions.length > 0 && config.hasGrpc) {
                        fs_extra_1.writeFileSync(path_1.join(assets, `magnus.proto`), protoStr);
                    }
                }
                const visitor = new graphqlToTs_1.GraphqlToTs();
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
                        fs_extra_1.writeFileSync(path_1.join(dist, `magnus.server.ts`), content);
                    }
                    else {
                        fs_extra_1.writeFileSync(path_1.join(dist, `magnus.ts`), content);
                    }
                }
                // 生成使用文件
                if (config.hasGrpc) {
                    const path2 = path_1.join(assets, `magnus.proto`);
                    const relativePath = path_1.relative(dist, path2);
                    const index = `import { Transport } from '@nestjs/microservices';
import { join } from 'path';
export const ${lodash_1.camelCase(config.name)}Options: any = {
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
                    fs_extra_1.writeFileSync(path_1.join(dist, `${config.name}.ts`), index);
                }
                if (isServer) {
                    const entities = astToGraphqlVisitor.tsToGraphqlVisitor.entities;
                    fs_extra_1.writeFileSync(path_1.join(assets, `magnus.entity.json`), JSON.stringify(entities, null, 2));
                }
                else {
                    const permissions = astToGraphqlVisitor.tsToGraphqlVisitor.permission;
                    if (Object.keys(permissions).length > 0) {
                        fs_extra_1.writeFileSync(path_1.join(assets, `magnus.permission.json`), JSON.stringify(permissions, null, 2));
                    }
                }
                fs_extra_1.writeFileSync(path_1.join(assets, `ip.txt`), `${config.name}前端接口:${config.host}${config.port ? `:${config.port}` : ""}`);
                fs_extra_1.writeFileSync(path_1.join(dist, `api-url.v${config.version}.ts`), `export const apiConfig = {
  apiUrl: 'http://${config.host}${config.port ? `:${config.port}` : ""}/graphql',
  name: '${config.name}'
};`);
            }
        }
        if (config.debug) {
            chokidar_1.watch(inputs)
                .on("add", (path) => {
                if (path.endsWith(".ts")) {
                    compile();
                    compile(true);
                    sendFile(config);
                }
                else {
                    const filePath = path_1.dirname(path);
                    const fileName = path.replace(filePath, "");
                    sendLocalFile(filePath, fileName, config);
                }
                client_1.bootstrapClient(config);
            })
                .on("change", (path) => {
                if (path.endsWith(".ts")) {
                    compile();
                    compile(true);
                    sendFile(config);
                }
                else {
                    const filePath = path_1.dirname(path);
                    const fileName = path.replace(filePath, "");
                    sendLocalFile(filePath, fileName, config);
                }
                client_1.bootstrapClient(config);
            })
                .on("unlink", (path) => {
                if (path.endsWith(".ts")) {
                    compile();
                    compile(true);
                }
                else {
                    const filePath = path_1.dirname(path);
                    const fileName = path.replace(filePath, "");
                    sendLocalFile(filePath, fileName, config);
                }
                client_1.bootstrapClient(config);
                sendFile(config);
            });
        }
        else {
            compile();
            compile(true);
            sendFile(config);
            client_1.bootstrapClient(config);
        }
    }
    else {
        if (config.debug) {
            chokidar_1.watch(inputs)
                .on("add", (path) => {
                const filePath = path_1.dirname(path);
                const fileName = path.replace(filePath, "");
                sendLocalFile(filePath, fileName, config);
            })
                .on("change", (path) => {
                const filePath = path_1.dirname(path);
                const fileName = path.replace(filePath, "");
                sendLocalFile(filePath, fileName, config);
            });
        }
        else {
            inputs.filter(it => {
                if (it.endsWith(".json")) {
                    const filePath = path_1.dirname(it);
                    const fileName = it.replace(filePath, ``);
                    sendLocalFile(filePath, fileName, config);
                }
            });
        }
        // 解析navigation
        const file = path_1.join(config.root, config.navigation);
        const filePath = path_1.dirname(file);
        const fileName = file.replace(filePath, ``);
        sendLocalFile(filePath, fileName, config);
    }
}
exports.bootstrap = bootstrap;
function sendLocalFile(path, name, config) {
    const filePath = path_1.join(path, name);
    if (fs_extra_1.existsSync(filePath)) {
        const context = fs_extra_1.readFileSync(path_1.join(path, name)).toString("utf8");
        // 广播文件内容
        const isDist = (file) => file.endsWith(".ts") || file.endsWith(".tsx");
        config.broadcast(Buffer.from(JSON.stringify({
            name: config.name,
            type: isDist(name) ? "output" : "assets",
            fileName: name,
            debug: config.debug,
            content: context,
            host: config.host
        })));
    }
}
exports.sendLocalFile = sendLocalFile;
function sendFile(config) {
    const target = config.target || "magnus";
    const dist = path_1.join(config.root, config.output, config.name);
    const assets = path_1.join(config.root, config.assets, config.name);
    if (target === "magnus") {
        sendLocalFile(dist, `${config.name}.ts`, config);
        sendLocalFile(dist, "magnus.ts", config);
        sendLocalFile(dist, "magnus.server.ts", config);
        sendLocalFile(dist, `magnus.server-angular.v${config.version || "1.0.0"}.ts`, config);
        sendLocalFile(dist, `magnus.server-react.v${config.version || "1.0.0"}.tsx`, config);
        sendLocalFile(dist, `magnus.server-api.v${config.version || "1.0.0"}.ts`, config);
        sendLocalFile(dist, `api-url.v${config.version || "1.0.0"}.ts`, config);
        sendLocalFile(assets, "magnus.proto", config);
        sendLocalFile(assets, "ip.txt", config);
    }
}
exports.sendFile = sendFile;
//# sourceMappingURL=bootstrap.js.map