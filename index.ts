import { join } from "path";
import {
    getValues,
    getType,
    getReader,
    getWriter,
    writeAsync
} from "./util";

const pbfSchema = require("protobuf-schema");
const { writeFileSync } = require('fs');

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

export function createDefinition(schema: string | Buffer, opts: SchemaOptions = {}): TypescriptFile[] {
    const options: any = {
        indent: '    ',
        suffix: 'Schema',
        lineBreak: '\n',
        ...(opts || {})
    };

    const sch = pbfSchema.parse(schema);
    const files: TypescriptFile[] = [];
    sch.messages.forEach((msg: any) => {
        const iface = [
            `export interface ${msg.name}${options.suffix} {`,
        ];
        
        const read: string[] = [];
        const readField: string[] = [];
        const write: string[] = [];

        msg.fields.forEach((f: any) => {
            iface.push(options.indent + f.name + (f.required ? '' : '?') + ': ' + getType(f) + (f.repeated ? '[]' : '') + ';');
            read.push(f.name + ': ' + getValues(f));

            const rflen = readField.length
            readField.push(options.indent + (rflen ? 'else if' : 'if') + ` (tag === ${f.tag} && 'undefined' !== typeof obj.${f.name} && pbf) { obj.${f.name} = ${getReader(f)}; }`);

            write.push(options.indent + `if (obj.${f.name}) { ${getWriter(f)}; }`);
        });

        iface.push('}');

        const cls = [
            `export const ${msg.name} = {`,
            options.indent + `decode(buf: Buffer | Uint8Array): ${msg.name}${options.suffix} {`,
            options.indent + options.indent + `const pbf = new Pbf(buf);`,
            options.indent + options.indent + `return pbf.readFields<${msg.name}${options.suffix}>((tag: number, obj?: ${msg.name}${options.suffix}, pbf?: Pbf) => {`,
            options.indent + options.indent + readField.join(options.lineBreak + options.indent + options.indent),
            options.indent + options.indent + `}, { ${read.join(', ')} });`,
            options.indent + '},' + options.lineBreak,

            options.indent + `encode(obj: ${msg.name}${options.suffix}): Uint8Array {`,
            options.indent + options.indent + 'const pbf = new Pbf();',
            options.indent + write.join(options.lineBreak + options.indent),
            options.indent + options.indent + 'const buffer = pbf.finish();',
            options.indent + options.indent + 'return Buffer.from(buffer);',
            options.indent + '}',
            '};'
        ];

        files.push({
            filename: msg.name + '.ts',
            content:
                'import Pbf from "pbf";' + options.lineBreak + options.lineBreak +
                iface.join(options.lineBreak) +
                options.lineBreak + options.lineBreak +
                cls.join(options.lineBreak)
        });
    });

    return files;
}

export function writeSchemaFileSync(schema: string | Buffer, opts: SchemaOptions = {}): void {
    const defs = createDefinition(schema, opts);
    const writeDir = opts.writeDir ? opts.writeDir : '';
    for (const { filename, content } of defs) {
        writeFileSync(join(writeDir, filename), content);
    }
}

export async function writeSchemaFile(schema: string | Buffer, opts: SchemaOptions = {}): Promise<void> {
    const defs = createDefinition(schema, opts);
    const writeDir = opts.writeDir ? opts.writeDir : '';
    try {
        const promises = defs.map<Promise<void>>(({ filename, content }) => writeAsync(join(writeDir, filename), content));
        await Promise.all(promises);
    } catch (err) {
        throw err;
    }
}
