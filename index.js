"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const pbfSchema = require("protobuf-schema");
const { writeFile, writeFileSync } = require('fs');
function getValues(field) {
    switch (field.type) {
        case 'double':
        case 'float':
        case 'int32':
        case 'int64':
        case 'sint32':
        case 'sint64':
        case 'uint32':
        case 'uint64':
        case 'fixed32':
        case 'fixed64':
        case 'sfixed32':
        case 'sfixed64':
            return '0';
        case 'bool':
            return 'false';
        case 'string':
            return '""';
        case 'bytes':
            return 'null';
        default:
            return field.type;
    }
}
function getType(field) {
    switch (field.type) {
        case 'double':
        case 'float':
        case 'int32':
        case 'int64':
        case 'sint32':
        case 'sint64':
        case 'uint32':
        case 'uint64':
        case 'fixed32':
        case 'fixed64':
        case 'sfixed32':
        case 'sfixed64':
            return 'number';
        case 'bool':
            return 'boolean';
        case 'string':
            return 'string';
        case 'bytes':
            return 'Buffer';
        default:
            return field.type;
    }
}
function getReader(field) {
    switch (field.type) {
        case 'double':
            return 'pbf.readDouble()';
        case 'float':
            return 'pbf.readFloat()';
        case 'int32':
            return 'pbf.readVarint()';
        case 'int64':
            return 'pbf.readVarint()';
        case 'sint32':
            return 'pbf.readSVarint()';
        case 'sint64':
            return 'pbf.readSVarint()';
        case 'uint32':
            return 'pbf.readVarint()';
        case 'uint64':
            return 'pbf.readVarint()';
        case 'fixed32':
            return 'pbf.readFixed32()';
        case 'fixed64':
            return 'pbf.readFixed64()';
        case 'sfixed32':
            return 'pbf.readSFixed32()';
        case 'sfixed64':
            return 'pbf.readSFixed64()';
        case 'bool':
            return 'pbf.readBoolean()';
        case 'string':
            return 'pbf.readString()';
        case 'bytes':
            return 'pbf.readBytes()';
        default:
            throw new Error(`type ${field.type} is not supported!`);
    }
}
function getWriter(field) {
    switch (field.type) {
        case 'double':
            return `pbf.writeDoubleField(${field.tag}, obj.${field.name})`;
        case 'float':
            return `pbf.writeFloatField(${field.tag}, obj.${field.name})`;
        case 'int32':
            return `pbf.writeVarintField(${field.tag}, obj.${field.name})`;
        case 'int64':
            return `pbf.writeVarintField(${field.tag}, obj.${field.name})`;
        case 'sint32':
            return `pbf.writeSVarintField(${field.tag}, obj.${field.name})`;
        case 'sint64':
            return `pbf.writeSVarintField(${field.tag}, obj.${field.name})`;
        case 'uint32':
            return `pbf.writeVarintField(${field.tag}, obj.${field.name})`;
        case 'uint64':
            return `pbf.writeVarintField(${field.tag}, obj.${field.name})`;
        case 'fixed32':
            return `pbf.writeFixed32Field(${field.tag}, obj.${field.name})`;
        case 'fixed64':
            return `pbf.writeFixed64Field(${field.tag}, obj.${field.name})`;
        case 'sfixed32':
            return `pbf.writeSFixed32Field(${field.tag}, obj.${field.name})`;
        case 'sfixed64':
            return `pbf.writeSFixed64Field(${field.tag}, obj.${field.name})`;
        case 'bool':
            return `pbf.writeBooleanField(${field.tag}, obj.${field.name})`;
        case 'string':
            return `pbf.writeStringField(${field.tag}, obj.${field.name})`;
        case 'bytes':
            return `pbf.writeBytesField(${field.tag}, obj.${field.name})`;
        default:
            throw new Error(`type ${field.type} is not supported!`);
    }
}
function writeAsync(filename, content) {
    return new Promise((resolve, reject) => {
        writeFile(filename, content, (err) => {
            if (err)
                return reject(err);
            resolve();
        });
    });
}
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
        const write = [options.indent + `static write(obj: ${msg.name}${options.suffix}, pbf: Pbf) {`];
        msg.fields.forEach((f) => {
            iface.push(options.indent + f.name + (f.required ? '' : '?') + ': ' + getType(f) + (f.repeated ? '[]' : '') + ';');
            read.push(f.name + ': ' + getValues(f));
            const rflen = readField.length;
            readField.push(options.indent + (rflen ? 'else if' : 'if') + ` (tag === ${f.tag}) { obj.${f.name} = ${getReader(f)}; }`);
            const wlen = write.length;
            write.push(options.indent + (wlen ? 'else if' : 'if') + ` (tag === ${f.tag}) { ${getWriter(f)}; }`);
        });
        iface.push('}');
        const cls = [
            `export class ${msg.name} {`,
            options.indent + `static read(pbf: Pbf, end?: number) {`,
            options.indent + options.indent + `return pbf.readFields(${msg.name}._readField, { ${read.join(', ')} }, end);`,
            options.indent + '}' + options.lineBreak,
            options.indent + `static _readField(tag: number, obj: ${msg.name}${options.suffix}, pbf: Pbf) {`,
            options.indent + readField.join(options.lineBreak + options.indent),
            options.indent + '}' + options.lineBreak,
            options.indent + `static write(obj: ${msg.name}${options.suffix}, pbf: Pbf) {`,
            options.indent + write.join(options.lineBreak + options.indent),
            options.indent + '}',
            '}'
        ];
        files.push({
            filename: msg.name + '.ts',
            content: iface.join(options.lineBreak) + options.lineBreak + options.lineBreak + cls.join(options.lineBreak)
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
        await defs.map(({ filename, content }) => writeAsync(path_1.join(writeDir, filename), content));
    }
    catch (err) {
        throw err;
    }
}
exports.writeSchemaFile = writeSchemaFile;
const blah = createDefinition(`
message Entry {

    // public key
    required bytes key = 1;

    // signature
    required bytes sig = 2;

    // update time
    required uint64 time = 3;

    // domain name
    required string name = 4;

    // domain target (URI)
    required string target = 5;
}
`);
blah.forEach(({ filename, content }) => {
    console.log(filename);
    console.log(content);
});
//# sourceMappingURL=index.js.map