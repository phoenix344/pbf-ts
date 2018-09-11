"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { writeFile } = require('fs');
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
            return 'new Uint8Array(0)';
        default:
            return 'null';
    }
}
exports.getValues = getValues;
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
            return 'Uint8Array';
        default:
            return field.type;
    }
}
exports.getType = getType;
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
exports.getReader = getReader;
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
exports.getWriter = getWriter;
function writeAsync(filename, content) {
    return new Promise((resolve, reject) => {
        writeFile(filename, content, (err) => {
            if (err)
                return reject(err);
            resolve();
        });
    });
}
exports.writeAsync = writeAsync;
//# sourceMappingURL=util.js.map