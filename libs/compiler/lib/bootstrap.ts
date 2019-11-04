import { MagnusConfig } from "@notadd/magnus-core";
import { toJson } from "@notadd/magnus-graphql";
import * as morph from "ts-morph";
import { join, relative } from "path";
import {
    writeFileSync,
    ensureDirSync
} from "fs-extra";
import * as ast from "./visitors/visitor";
import { collectionVisitor, CollectionContext } from "./visitors/collection";
import { MangusContextManager, MagnusVisitor } from "./visitors/magnus";
import { AstToGraphqlVisitor } from "./visitors/astToGraphql";
import { print, introspectionFromSchema, buildASTSchema } from "graphql";
import { watch } from "chokidar";
import globby = require("globby");
import { GraphqlToTs } from "./visitors/graphqlToTs";
import { camelCase } from "lodash";
import { ApiVisitor } from "./visitors/api";
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
        // const dist = join(config.root, config.output, config.name);
        const assets = join(config.root, config.assets, config.name);
        // ensureDirSync(dist);
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
            const documentAstJson = toJson(documentAst);
            const content = print(documentAstJson);
            // 搜集metadata entity数据库 类名 依赖名
            writeFileSync(join(assets, `magnus.server.graphql`), content);
            const metadataContent = JSON.stringify(
                astToGraphqlVisitor.tsToGraphqlVisitor.def,
                null,
                2
            );
            writeFileSync(join(assets, `magnus.metadata.json`), metadataContent);
            const serverContent = JSON.stringify(documentAstJson, null, 2);
            writeFileSync(join(assets, `magnus.server.json`), serverContent);
            // 这里生成客户端使用的对应的graphql
            const apiVisitor = new ApiVisitor();
            if (documentAst.definitions.length > 17) {
                documentAst.visit(apiVisitor, {});
                const res = toJson(documentAst);
                const content = print(res);
                writeFileSync(join(assets, `magnus.server.graphql`), content);
                const metadataContent = JSON.stringify(
                    astToGraphqlVisitor.tsToGraphqlVisitor.def,
                    null,
                    2
                );
                writeFileSync(join(assets, `magnus.metadata.json`), metadataContent);
                const serverContent = JSON.stringify(res, null, 2);
                writeFileSync(join(assets, `magnus.server.json`), serverContent);
                const entities = astToGraphqlVisitor.tsToGraphqlVisitor.entities;
                writeFileSync(
                    join(assets, `magnus.entity.json`),
                    JSON.stringify(entities, null, 2)
                );
            }
        }
        if (config.debug) {
            watch(inputs)
                .on("add", (path: string) => {
                    if (path.endsWith(".ts")) {
                        compile(true);
                    }
                })
                .on("change", (path: string) => {
                    if (path.endsWith(".ts")) {
                        compile(true);
                    }
                })
                .on("unlink", (path: string) => {
                    if (path.endsWith(".ts")) {
                        compile(true);
                    }
                });
        } else {
            compile(true);
        }
    }
}
