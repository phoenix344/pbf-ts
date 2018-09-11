const {
    getValues,
    getType,
    getReader,
    getWriter,
    writeAsync
} = require("../util");
const assert = require("assert");
const { readFileSync, existsSync, unlinkSync } = require('fs');

module.exports = [
    (async function testGetValues() {
        assert.equal(getValues({ type: "double" }), "0", "double must be 0");
        assert.equal(getValues({ type: "float" }), "0", "float must be 0");
        assert.equal(getValues({ type: "int32" }), "0", "int32 must be 0");
        assert.equal(getValues({ type: "int64" }), "0", "int64 must be 0");
        assert.equal(getValues({ type: "sint32" }), "0", "sint32 must be 0");
        assert.equal(getValues({ type: "sint64" }), "0", "sint64 must be 0");
        assert.equal(getValues({ type: "uint32" }), "0", "uint32 must be 0");
        assert.equal(getValues({ type: "uint64" }), "0", "uint64 must be 0");
        assert.equal(getValues({ type: "fixed32" }), "0", "fixed32 must be 0");
        assert.equal(getValues({ type: "fixed64" }), "0", "fixed64 must be 0");
        assert.equal(getValues({ type: "sfixed32" }), "0", "sfixed32 must be 0");
        assert.equal(getValues({ type: "sfixed64" }), "0", "sfixed64 must be 0");
        assert.equal(getValues({ type: "bool" }), "false", "bool must be FALSE");
        assert.equal(getValues({ type: "string" }), "\"\"", "string must be empty string");
        assert.equal(getValues({ type: "bytes" }), "new Uint8Array(0)", "bytes must be empty uint8 array");
    })(),
    (async function testGetType() {
        assert.equal(getType({ type: "double" }), "number", "double type must be translated into number");
        assert.equal(getType({ type: "float" }), "number", "float type must be translated into number");
        assert.equal(getType({ type: "int32" }), "number", "int32 type must be translated into number");
        assert.equal(getType({ type: "int64" }), "number", "int64 type must be translated into number");
        assert.equal(getType({ type: "sint32" }), "number", "sint32 type must be translated into number");
        assert.equal(getType({ type: "sint64" }), "number", "sint64 type must be translated into number");
        assert.equal(getType({ type: "uint32" }), "number", "uint32 type must be translated into number");
        assert.equal(getType({ type: "uint64" }), "number", "uint64 type must be translated into number");
        assert.equal(getType({ type: "fixed32" }), "number", "fixed32 type must be translated into number");
        assert.equal(getType({ type: "fixed64" }), "number", "fixed64 type must be translated into number");
        assert.equal(getType({ type: "sfixed32" }), "number", "sfixed32 type must be translated into number");
        assert.equal(getType({ type: "sfixed64" }), "number", "sfixed64 type must be translated into number");
        assert.equal(getType({ type: "bool" }), "boolean", "bool type must be translated into boolean");
        assert.equal(getType({ type: "string" }), "string", "string type must be translated into string");
        assert.equal(getType({ type: "bytes" }), "Uint8Array", "bytes type must be translated into Uint8Array");
    })(),
    (async function testGetReader() {
        assert.equal(getReader({ type: "double" }), "pbf.readDouble()", "double type must be read as number");
        assert.equal(getReader({ type: "float" }), "pbf.readFloat()", "float type must be read as number");
        assert.equal(getReader({ type: "int32" }), "pbf.readVarint()", "int32 type must be read as number");
        assert.equal(getReader({ type: "int64" }), "pbf.readVarint()", "int64 type must be read as number");
        assert.equal(getReader({ type: "sint32" }), "pbf.readSVarint()", "sint32 type must be read as number");
        assert.equal(getReader({ type: "sint64" }), "pbf.readSVarint()", "sint64 type must be read as number");
        assert.equal(getReader({ type: "uint32" }), "pbf.readVarint()", "uint32 type must be read as number");
        assert.equal(getReader({ type: "uint64" }), "pbf.readVarint()", "uint64 type must be read as number");
        assert.equal(getReader({ type: "fixed32" }), "pbf.readFixed32()", "fixed32 type must be read as number");
        assert.equal(getReader({ type: "fixed64" }), "pbf.readFixed64()", "fixed64 type must be read as number");
        assert.equal(getReader({ type: "sfixed32" }), "pbf.readSFixed32()", "sfixed32 type must be read as number");
        assert.equal(getReader({ type: "sfixed64" }), "pbf.readSFixed64()", "sfixed64 type must be read as number");
        assert.equal(getReader({ type: "bool" }), "pbf.readBoolean()", "bool type must be read as boolean");
        assert.equal(getReader({ type: "string" }), "pbf.readString()", "string type must be read as string");
        assert.equal(getReader({ type: "bytes" }), "pbf.readBytes()", "bytes type must be read as Uint8Array");
    })(),
    (async function testGetWriter() {
        assert.equal(getWriter({ tag: 1, name: "field", type: "double" }), "pbf.writeDoubleField(1, obj.field)", "double type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "float" }), "pbf.writeFloatField(1, obj.field)", "float type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "int32" }), "pbf.writeVarintField(1, obj.field)", "int32 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "int64" }), "pbf.writeVarintField(1, obj.field)", "int64 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "sint32" }), "pbf.writeSVarintField(1, obj.field)", "sint32 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "sint64" }), "pbf.writeSVarintField(1, obj.field)", "sint64 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "uint32" }), "pbf.writeVarintField(1, obj.field)", "uint32 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "uint64" }), "pbf.writeVarintField(1, obj.field)", "uint64 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "fixed32" }), "pbf.writeFixed32Field(1, obj.field)", "fixed32 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "fixed64" }), "pbf.writeFixed64Field(1, obj.field)", "fixed64 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "sfixed32" }), "pbf.writeSFixed32Field(1, obj.field)", "sfixed32 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "sfixed64" }), "pbf.writeSFixed64Field(1, obj.field)", "sfixed64 type must be written into number");
        assert.equal(getWriter({ tag: 1, name: "field", type: "bool" }), "pbf.writeBooleanField(1, obj.field)", "bool type must be written into boolean");
        assert.equal(getWriter({ tag: 1, name: "field", type: "string" }), "pbf.writeStringField(1, obj.field)", "string type must be written into string");
        assert.equal(getWriter({ tag: 1, name: "field", type: "bytes" }), "pbf.writeBytesField(1, obj.field)", "bytes type must be written into Uint8Array");
    })(),
    (async function testWriteAsync() {
        await writeAsync('test/tmp.txt', "hello, world!");
        assert.ok(existsSync('test/tmp.txt'));
        assert.equal(readFileSync('test/tmp.txt').toString(), 'hello, world!');
        unlinkSync('test/tmp.txt');
    })()
];