export declare type Double = number;
export declare type Float = number;
export declare type Int32 = number;
export declare type Uint32 = number;
export declare type Sint32 = number;
export declare type Fixed32 = number;
export declare type Sfixed32 = number;
export declare type Int64 = number;
export declare type Uint64 = number;
export declare type Sint64 = number;
export declare type Fixed64 = number;
export declare type Sfixed64 = number;
export declare type Bool = boolean;
export declare type String = string;
export declare type Bytes = number[];
export declare type Empty = {};
export declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export declare type Order<T> = {
    [P in keyof T]?: "ASC" | "DESC";
};
export declare type Where<T> = {
    [key: string]: any;
};
