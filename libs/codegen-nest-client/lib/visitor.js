"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const auto_bind_1 = tslib_1.__importDefault(require("auto-bind"));
const graphql_1 = require("graphql");
const R_MOD = /module\:\s*"([^"]+)"/; // matches: module: "..."
const R_NAME = /name\:\s*"([^"]+)"/; // matches: name: "..."
function R_DEF(directive) {
    return new RegExp(`\\s+\\@${directive}\\([^)]+\\)`, "gm");
}
class ApolloAngularVisitor extends visitor_plugin_common_1.ClientSideBaseVisitor {
    constructor(fragments, _allOperations, rawConfig) {
        super(fragments, rawConfig, {
            ngModule: rawConfig.ngModule,
            namedClient: rawConfig.namedClient
        });
        this._allOperations = _allOperations;
        auto_bind_1.default(this);
    }
    getImports() {
        const baseImports = super.getImports();
        const hasOperations = this._collectedOperations.length > 0;
        if (!hasOperations) {
            return baseImports;
        }
        const imports = [
            `import { Injectable } from '@nestjs/common';`,
            `import * as Apollo from '@notadd/magnus-nest-runner';`
        ];
        const defs = {};
        this._allOperations
            .filter(op => this._operationHasDirective(op, "NgModule") || !!this.config.ngModule)
            .forEach(op => {
            const def = this._operationHasDirective(op, "NgModule")
                ? this._extractNgModule(op)
                : this._parseNgModule(this.config.ngModule);
            // by setting key as link we easily get rid of duplicated imports
            // every path should be relative to the output file
            defs[def.link] = {
                path: def.path,
                module: def.module
            };
        });
        Object.keys(defs).forEach(key => {
            const def = defs[key];
            // Every Angular Module that I've seen in my entire life use named exports
            imports.push(`import { ${def.module} } from '${def.path}';`);
        });
        return [...baseImports, ...imports];
    }
    _extractNgModule(operation) {
        const [, link] = graphql_1.print(operation).match(R_MOD);
        return this._parseNgModule(link);
    }
    _parseNgModule(link) {
        const [path, module] = link.split("#");
        return {
            path,
            module,
            link
        };
    }
    _operationHasDirective(operation, directive) {
        if (typeof operation === "string") {
            return operation.includes(`@${directive}`);
        }
        let found = false;
        graphql_1.visit(operation, {
            Directive(node) {
                if (node.name.value === directive) {
                    found = true;
                }
            }
        });
        return found;
    }
    _removeDirective(document, directive) {
        if (this._operationHasDirective(document, directive)) {
            return document.replace(R_DEF(directive), "");
        }
        return document;
    }
    _removeDirectives(document, directives) {
        return directives.reduce((doc, directive) => this._removeDirective(doc, directive), document);
    }
    _extractDirective(operation, directive) {
        const directives = graphql_1.print(operation).match(R_DEF(directive));
        if (directives.length > 1) {
            throw new Error(`The ${directive} directive used multiple times in '${operation.name}' operation`);
        }
        return directives[0];
    }
    _prepareDocument(documentStr) {
        return this._removeDirectives(documentStr, ["NgModule", "namedClient"]);
    }
    _namedClient(operation) {
        let name;
        if (this._operationHasDirective(operation, "namedClient")) {
            name = this._extractNamedClient(operation);
        }
        else if (this.config.namedClient) {
            name = this.config.namedClient;
        }
        return name ? `client = '${name}';` : "";
    }
    // tries to find namedClient directive and extract {name}
    _extractNamedClient(operation) {
        const [, name] = this._extractDirective(operation, "namedClient").match(R_NAME);
        return name;
    }
    buildOperation(node, documentVariableName, operationType, operationResultType, operationVariablesTypes) {
        const content = `
  @Injectable()
  export class ${this.convertName(node)}GQL extends Apollo.${operationType}<${operationResultType}, ${operationVariablesTypes}> {
    document = ${documentVariableName};
    ${this._namedClient(node)}
  }`;
        return content;
    }
}
exports.ApolloAngularVisitor = ApolloAngularVisitor;
//# sourceMappingURL=visitor.js.map