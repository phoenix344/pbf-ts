/// <reference types="node" />
export interface SchemaOptions {
    indent?: string;
    suffix?: string;
    lineBreak?: string;
    writeDir?: string;
}
export interface TypescriptFile {
    filename: string;
    content: string;
}
export declare function createDefinition(schema: string | Buffer, opts?: SchemaOptions): TypescriptFile[];
export declare function writeSchemaFileSync(schema: string | Buffer, opts?: SchemaOptions): void;
export declare function writeSchemaFile(schema: string | Buffer, opts?: SchemaOptions): Promise<void>;
//# sourceMappingURL=index.d.ts.map