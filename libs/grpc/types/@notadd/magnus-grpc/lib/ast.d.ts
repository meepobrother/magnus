export declare abstract class Ast {
    abstract visit(visitor: Visitor, context: any): any;
}
declare type Child = Service | Message | Enum | OneOf;
export declare class Root extends Ast {
    packages: Package[];
    visit(visitor: Visitor, context: any): any;
}
export declare class Package extends Ast {
    name: string;
    syntax: string;
    children: Child[];
    visit(visitor: Visitor, context: any): any;
    hasChild(name: string): boolean;
}
export declare class Identifier extends Ast {
    name: string;
    visit(visitor: Visitor, context: any): any;
}
export declare class Enum extends Ast {
    name: string;
    items: EnumItem[];
    visit(visitor: Visitor, context: any): any;
}
export declare class EnumItem extends Ast {
    name: string;
    value: any;
    visit(visitor: Visitor, context: any): any;
}
export declare class Service extends Ast {
    name: string;
    methods: Method[];
    visit(visitor: Visitor, context: any): any;
}
export declare class Method extends Ast {
    name: string;
    decorator: string[];
    parameter: string;
    type: string;
    isStream: boolean;
    visit(visitor: Visitor, context: any): any;
}
export declare class Message extends Ast {
    name: string;
    fields: Field[];
    children: Child[];
    index: number;
    visit(visitor: Visitor, context: any): any;
}
export declare class Field extends Ast {
    type: string;
    name: string;
    index: number;
    decorator: string[];
    visit(visitor: Visitor, context: any): any;
}
export declare class OneOf extends Ast {
    name: string;
    items: Field[];
    visit(visitor: Visitor, context: any): any;
}
export interface Visitor {
    visitIdentifier(node: Identifier, context: any): any;
    visitPackage(node: Package, context: any): any;
    visitRoot(node: Root, context: any): any;
    visitEnum(node: Enum, context: any): any;
    visitEnumItem(node: EnumItem, context: any): any;
    visitService(node: Service, context: any): any;
    visitMethod(node: Method, context: any): any;
    visitMessage(node: Message, context: any): any;
    visitField(node: Field, context: any): any;
    visitOneOf(node: OneOf, context: any): any;
}
export declare class ParseVisitor implements Visitor {
    visitIdentifier(node: Identifier, context: any): string;
    visitPackage(node: Package, context: any): string;
    visitRoot(node: Root, context: any): string;
    visitEnum(node: Enum, context: any): string;
    visitEnumItem(node: EnumItem, context: any): string;
    visitService(node: Service, context: any): string;
    visitMethod(node: Method, context: any): string;
    visitMessage(node: Message, context: any): string;
    visitField(node: Field, context: any): string;
    visitOneOf(node: OneOf, context: any): string;
    createDecorator(args: string[]): string;
}
export {};
