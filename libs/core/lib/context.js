"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const lodash_1 = require("lodash");
const magnus_graphql_2 = require("@notadd/magnus-graphql");
const graphql_tools_1 = require("graphql-tools");
function createFactoryByMap(map, injectDef, entityDef, entities) {
    const factory = {};
    Object.keys(map).map(operationName => {
        const items = map[operationName];
        const obj = {};
        items.forEach(it => {
            const [fieldName, className, tableName, methodName, argsDef] = it;
            obj[fieldName] = (args, selectionSet) => {
                const Type = injectDef[className];
                const controller = new Type(tableName, selectionSet, entityDef, entities);
                return controller[methodName](...argsDef.map(arg => args[arg.name]));
            };
        });
        factory[operationName] = obj;
    });
    return factory;
}
exports.createFactoryByMap = createFactoryByMap;
function createFactory(handlerDef, injectDef, entityDef, entities) {
    const map = createFactoryByMap(handlerDef, injectDef, entityDef, entities);
    return (operation, name, args, selectionSet) => {
        return map[operation][name](args, selectionSet);
    };
}
exports.createFactory = createFactory;
function createResolver(handlerDef, injectDef, entityDef, entities) {
    const map = createFactoryByMap(handlerDef, injectDef, entityDef, entities);
    const resolver = magnus_graphql_2.scalars;
    const client = new magnus_graphql_1.ClientVisitor();
    const parse = new magnus_graphql_1.ParseVisitor();
    Object.keys(map).map((key) => {
        const handler = map[key];
        resolver[lodash_1.upperFirst(key)] = {};
        Object.keys(handler).map(hKey => {
            const item = handler[hKey];
            resolver[lodash_1.upperFirst(key)][hKey] = async (source, args, context, info) => {
                const fieldName = info.fieldName;
                let result;
                await Promise.all(info.fieldNodes.map(async (field) => {
                    let node = new magnus_graphql_1.ast.FieldAst();
                    node = node.visit(parse, field);
                    const field2 = node.visit(client, args);
                    const typeSource = typeof source;
                    const selfhandlerDef = handlerDef[key].find(it => it[3] === fieldName);
                    if (selfhandlerDef && typeSource === "object") {
                        const params = selfhandlerDef[4];
                        const parameters = new Array(params.length);
                        const selection = field2.selectionSet;
                        params.map(par => {
                            const { name, type, index, decorator } = par;
                            if (decorator.includes("Selection")) {
                                parameters[index] = selection;
                            }
                            else if (decorator.includes("Parent")) {
                                parameters[index] = source;
                            }
                            else if (decorator.includes("Relation")) {
                                parameters[index] = entityDef;
                            }
                            else if (decorator.includes("Context")) {
                                parameters[index] = context;
                            }
                            else if (decorator.length === 0) {
                                parameters[index] = args[name];
                            }
                            else {
                                parameters[index] = args[name];
                            }
                        });
                        result = await source[fieldName](...parameters);
                    }
                    else if (typeSource === "undefined") {
                        result = item && item(args, field2.selectionSet);
                    }
                    else {
                        result = source;
                    }
                }));
                return result;
            };
        });
    });
    return resolver;
}
exports.createResolver = createResolver;
function createGraphql(item, operation, selection) {
    let str = ``;
    if (item[4].length > 0) {
        const parameters = item[4].map(it => `${it.name}: $${it.name}`).join(", ");
        str = `${operation} ${item[0]}(${item[4]
            .map(it => `$${it.name}: ${it.type}`)
            .join(", ")}) { ${item[0]}(${parameters}) ${selection} }`;
    }
    else {
        str = `${operation} { ${item[0]} ${selection}}`;
    }
    return str;
}
exports.createGraphql = createGraphql;
function createRunner(map, context, injectDef, entityDef, entities) {
    const resolvers = createResolver(map, injectDef, entityDef, entities);
    const schema = graphql_tools_1.makeExecutableSchema({
        typeDefs: context,
        resolvers
    });
    const rootValue = undefined;
    const contextValue = undefined;
    const operationName = ``;
    const run = (source, variableValues = {}) => {
        return graphql_1.graphql({
            schema,
            source,
            rootValue,
            contextValue,
            variableValues,
            operationName
        }).then(res => {
            if (res.errors) {
                throw new Error(`${res.errors.join("\n")}`);
            }
            return res.data;
        });
    };
    const magnus = run;
    Object.keys(map).map(key => {
        const items = map[key];
        magnus[key] = {};
        items.map(item => {
            magnus[key][item[0]] = async (...variables) => {
                const length = variables.length;
                let graphql = ``;
                if (length > 0) {
                    const selection = variables[length - 1];
                    graphql = createGraphql(item, key, selection);
                }
                else {
                    graphql = createGraphql(item, key, ``);
                }
                const args = item[4];
                const res = {};
                args.map((arg, index) => {
                    res[arg.name] = variables[index];
                });
                return run(graphql, res).then((res) => {
                    if (res.errors)
                        return res;
                    if (res)
                        return res[item[0]];
                });
            };
        });
    });
    return magnus;
}
exports.createRunner = createRunner;
//# sourceMappingURL=context.js.map