/// <reference types="node" />
export declare function getValues(field: {
    type: string;
}): string;
export declare function getType(field: {
    type: string;
}): string;
export declare function getReader(field: {
    type: string;
}): string;
export declare function getWriter(field: {
    tag: number;
    name: string;
    type: string;
}): string;
export declare function writeAsync(filename: string, content: string): Promise<void>;
export declare function readAsync(filename: string): Promise<Buffer>;
//# sourceMappingURL=util.d.ts.map