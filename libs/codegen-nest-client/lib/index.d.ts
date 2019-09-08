import { PluginValidateFn, PluginFunction } from "@graphql-codegen/plugin-helpers";
import { RawClientSideBasePluginConfig } from "@graphql-codegen/visitor-plugin-common";
import { ApolloAngularVisitor } from "./visitor";
export interface ApolloAngularRawPluginConfig extends RawClientSideBasePluginConfig {
    /**
     * @name ngModule
     * @type string
     * @description Allows to define `ngModule` as part of the plugin's config so it's globally available.
     *
     * @example graphql.macro
     * ```yml
     * config:
     *   ngModule: ./path/to/module#MyModule
     * ```
     */
    ngModule?: string;
    /**
     * @name namedClient
     * @type string
     * @description Defined the global value of `namedClient`.
     *
     * @example graphql.macro
     * ```yml
     * config:
     *   namedClient: 'customName'
     * ```
     */
    namedClient?: string;
}
export declare const plugin: PluginFunction<ApolloAngularRawPluginConfig>;
export declare const addToSchema: any;
export declare const validate: PluginValidateFn<any>;
export { ApolloAngularVisitor };
