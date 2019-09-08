import { ClientSideBaseVisitor, ClientSideBasePluginConfig, LoadedFragment } from "@graphql-codegen/visitor-plugin-common";
import { OperationDefinitionNode } from "graphql";
import { ApolloAngularRawPluginConfig } from "./index";
export interface ApolloAngularPluginConfig extends ClientSideBasePluginConfig {
    ngModule?: string;
    namedClient?: string;
}
export declare class ApolloAngularVisitor extends ClientSideBaseVisitor<ApolloAngularRawPluginConfig, ApolloAngularPluginConfig> {
    private _allOperations;
    constructor(fragments: LoadedFragment[], _allOperations: OperationDefinitionNode[], rawConfig: ApolloAngularRawPluginConfig);
    getImports(): string[];
    private _extractNgModule;
    private _parseNgModule;
    private _operationHasDirective;
    private _removeDirective;
    private _removeDirectives;
    private _extractDirective;
    protected _prepareDocument(documentStr: string): string;
    private _namedClient;
    private _extractNamedClient;
    protected buildOperation(node: OperationDefinitionNode, documentVariableName: string, operationType: string, operationResultType: string, operationVariablesTypes: string): string;
}
