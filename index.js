"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const util_1 = require("./util");
const pbfSchema = require("protobuf-schema");
const { writeFileSync } = require('fs');
function createDefinition(schema, opts = {}) {
    const options = Object.assign({ indent: '    ', suffix: 'Schema', lineBreak: '\n' }, (opts || {}));
    const sch = pbfSchema.parse(schema);
    const files = [];
    sch.messages.forEach((msg) => {
        const iface = [
            `export interface ${msg.name}${options.suffix} {`,
        ];
        const read = [];
        const readField = [];
        const write = [];
        msg.fields.forEach((f) => {
            iface.push(options.indent + f.name + (f.required ? '' : '?') + ': ' + util_1.getType(f) + (f.repeated ? '[]' : '') + ';');
            read.push(f.name + ': ' + util_1.getValues(f));
            const rflen = readField.length;
            readField.push(options.indent + (rflen ? 'else if' : 'if') + ` (tag === ${f.tag} && obj && pbf) { obj.${f.name} = ${util_1.getReader(f)}; }`);
            write.push(options.indent + `if (obj.${f.name}) { ${util_1.getWriter(f)}; }`);
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
            options.indent + options.indent + 'return buffer;',
            options.indent + '}',
            '};'
        ];
        files.push({
            filename: msg.name + '.ts',
            content: 'import Pbf from "pbf";' + options.lineBreak + options.lineBreak +
                iface.join(options.lineBreak) +
                options.lineBreak + options.lineBreak +
                cls.join(options.lineBreak)
        });
    });
    return files;
}
exports.createDefinition = createDefinition;
function writeSchemaFileSync(schema, opts = {}) {
    const defs = createDefinition(schema, opts);
    const writeDir = opts.writeDir ? opts.writeDir : '';
    defs.forEach(({ filename, content }) => {
        writeFileSync(path_1.join(writeDir, filename), content);
    });
}
exports.writeSchemaFileSync = writeSchemaFileSync;
async function writeSchemaFile(schema, opts = {}) {
    const defs = createDefinition(schema, opts);
    const writeDir = opts.writeDir ? opts.writeDir : '';
    try {
        await defs.map(({ filename, content }) => util_1.writeAsync(path_1.join(writeDir, filename), content));
    }
    catch (err) {
        throw err;
    }
}
exports.writeSchemaFile = writeSchemaFile;
//# sourceMappingURL=index.js.map