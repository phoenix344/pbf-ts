const { readFileSync, unlinkSync } = require('fs');
const { createDefinition, writeSchemaFile, writeSchemaFileSync } = require('../index');
const assert = require('assert');

module.exports = [
    (async function testCreateDefinition() {
        const [def] = createDefinition(readFileSync("test/00-datatype.proto"));
        assert.equal(def.filename, "DataTypes.ts", "filename must be equal to the class name");
        assert.equal(def.content, readFileSync(`test/${def.filename}`).toString(), "content must be exact the same");
    })(),
    (async function testWriteSchemaFile() {
        await writeSchemaFile(`
message A {
    required int32 a = 1;
    optional int32 b = 2;
}
message B {
    required string username = 1;
    required bool active = 2;
}
message C {
    required double x = 1;
    optional double y = 2;
}
`, { writeDir: 'test' });

        assert.equal(readFileSync('test/A.ts').toString(), `import Pbf from "pbf";

export interface ASchema {
    a: number;
    b?: number;
}

export const A = {
    decode(buf: Buffer | Uint8Array): ASchema {
        const pbf = new Pbf(buf);
        return pbf.readFields<ASchema>((tag: number, obj?: ASchema, pbf?: Pbf) => {
            if (tag === 1 && obj && pbf) { obj.a = pbf.readVarint(); }
            else if (tag === 2 && obj && pbf) { obj.b = pbf.readVarint(); }
        }, { a: 0, b: 0 });
    },

    encode(obj: ASchema): Uint8Array {
        const pbf = new Pbf();
        if (obj.a) { pbf.writeVarintField(1, obj.a); }
        if (obj.b) { pbf.writeVarintField(2, obj.b); }
        const buffer = pbf.finish();
        return buffer;
    }
};`);

        assert.equal(readFileSync('test/B.ts').toString(), `import Pbf from "pbf";

export interface BSchema {
    username: string;
    active: boolean;
}

export const B = {
    decode(buf: Buffer | Uint8Array): BSchema {
        const pbf = new Pbf(buf);
        return pbf.readFields<BSchema>((tag: number, obj?: BSchema, pbf?: Pbf) => {
            if (tag === 1 && obj && pbf) { obj.username = pbf.readString(); }
            else if (tag === 2 && obj && pbf) { obj.active = pbf.readBoolean(); }
        }, { username: "", active: false });
    },

    encode(obj: BSchema): Uint8Array {
        const pbf = new Pbf();
        if (obj.username) { pbf.writeStringField(1, obj.username); }
        if (obj.active) { pbf.writeBooleanField(2, obj.active); }
        const buffer = pbf.finish();
        return buffer;
    }
};`);

        assert.equal(readFileSync('test/C.ts').toString(), `import Pbf from "pbf";

export interface CSchema {
    x: number;
    y?: number;
}

export const C = {
    decode(buf: Buffer | Uint8Array): CSchema {
        const pbf = new Pbf(buf);
        return pbf.readFields<CSchema>((tag: number, obj?: CSchema, pbf?: Pbf) => {
            if (tag === 1 && obj && pbf) { obj.x = pbf.readDouble(); }
            else if (tag === 2 && obj && pbf) { obj.y = pbf.readDouble(); }
        }, { x: 0, y: 0 });
    },

    encode(obj: CSchema): Uint8Array {
        const pbf = new Pbf();
        if (obj.x) { pbf.writeDoubleField(1, obj.x); }
        if (obj.y) { pbf.writeDoubleField(2, obj.y); }
        const buffer = pbf.finish();
        return buffer;
    }
};`);

        unlinkSync('test/A.ts');
        unlinkSync('test/B.ts');
        unlinkSync('test/C.ts');

    })(),
    (async function testWriteSchemaFileSync() {
        writeSchemaFileSync(`
message D {
    required int32 a = 1;
    optional int32 b = 2;
}
message E {
    required string username = 1;
    required bool active = 2;
}
message F {
    required double x = 1;
    optional double y = 2;
}
`, { writeDir: 'test' });

        assert.equal(readFileSync('test/D.ts').toString(), `import Pbf from "pbf";

export interface DSchema {
    a: number;
    b?: number;
}

export const D = {
    decode(buf: Buffer | Uint8Array): DSchema {
        const pbf = new Pbf(buf);
        return pbf.readFields<DSchema>((tag: number, obj?: DSchema, pbf?: Pbf) => {
            if (tag === 1 && obj && pbf) { obj.a = pbf.readVarint(); }
            else if (tag === 2 && obj && pbf) { obj.b = pbf.readVarint(); }
        }, { a: 0, b: 0 });
    },

    encode(obj: DSchema): Uint8Array {
        const pbf = new Pbf();
        if (obj.a) { pbf.writeVarintField(1, obj.a); }
        if (obj.b) { pbf.writeVarintField(2, obj.b); }
        const buffer = pbf.finish();
        return buffer;
    }
};`);

        assert.equal(readFileSync('test/E.ts').toString(), `import Pbf from "pbf";

export interface ESchema {
    username: string;
    active: boolean;
}

export const E = {
    decode(buf: Buffer | Uint8Array): ESchema {
        const pbf = new Pbf(buf);
        return pbf.readFields<ESchema>((tag: number, obj?: ESchema, pbf?: Pbf) => {
            if (tag === 1 && obj && pbf) { obj.username = pbf.readString(); }
            else if (tag === 2 && obj && pbf) { obj.active = pbf.readBoolean(); }
        }, { username: "", active: false });
    },

    encode(obj: ESchema): Uint8Array {
        const pbf = new Pbf();
        if (obj.username) { pbf.writeStringField(1, obj.username); }
        if (obj.active) { pbf.writeBooleanField(2, obj.active); }
        const buffer = pbf.finish();
        return buffer;
    }
};`);

        assert.equal(readFileSync('test/F.ts').toString(), `import Pbf from "pbf";

export interface FSchema {
    x: number;
    y?: number;
}

export const F = {
    decode(buf: Buffer | Uint8Array): FSchema {
        const pbf = new Pbf(buf);
        return pbf.readFields<FSchema>((tag: number, obj?: FSchema, pbf?: Pbf) => {
            if (tag === 1 && obj && pbf) { obj.x = pbf.readDouble(); }
            else if (tag === 2 && obj && pbf) { obj.y = pbf.readDouble(); }
        }, { x: 0, y: 0 });
    },

    encode(obj: FSchema): Uint8Array {
        const pbf = new Pbf();
        if (obj.x) { pbf.writeDoubleField(1, obj.x); }
        if (obj.y) { pbf.writeDoubleField(2, obj.y); }
        const buffer = pbf.finish();
        return buffer;
    }
};`);

        unlinkSync('test/D.ts');
        unlinkSync('test/E.ts');
        unlinkSync('test/F.ts');

    })()
];
