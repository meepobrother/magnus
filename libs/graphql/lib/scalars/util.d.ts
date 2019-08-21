import { ValueNode, ObjectValueNode } from 'graphql';
export declare abstract class BaseScalar {
    parseObject(ast: ObjectValueNode, variables: any): any;
    parseLiteral(ast: ValueNode, variables: any): any;
    name: string;
    description: string;
    abstract parseValue(value: any): any;
    abstract serialize(value: any): any;
    toScalar(): {
        name: string;
        description: string;
        parseValue(value: any): any;
        serialize(value: any): any;
        parseLiteral(node: any, vars: any): any;
    };
}
