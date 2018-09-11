import Pbf from "pbf";

export interface DataTypesSchema {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: number;
    h: number;
    i: number;
    j: number;
    k: number;
    l: number;
    m: boolean;
    n: string;
    o: Uint8Array;
}

export const DataTypes = {
    decode(buf: Buffer | Uint8Array): DataTypesSchema {
        const pbf = new Pbf(buf);
        return pbf.readFields<DataTypesSchema>((tag: number, obj?: DataTypesSchema, pbf?: Pbf) => {
            if (tag === 1 && obj && pbf) { obj.a = pbf.readDouble(); }
            else if (tag === 2 && obj && pbf) { obj.b = pbf.readFloat(); }
            else if (tag === 3 && obj && pbf) { obj.c = pbf.readVarint(); }
            else if (tag === 4 && obj && pbf) { obj.d = pbf.readVarint(); }
            else if (tag === 5 && obj && pbf) { obj.e = pbf.readSVarint(); }
            else if (tag === 6 && obj && pbf) { obj.f = pbf.readSVarint(); }
            else if (tag === 7 && obj && pbf) { obj.g = pbf.readVarint(); }
            else if (tag === 8 && obj && pbf) { obj.h = pbf.readVarint(); }
            else if (tag === 9 && obj && pbf) { obj.i = pbf.readFixed32(); }
            else if (tag === 10 && obj && pbf) { obj.j = pbf.readFixed64(); }
            else if (tag === 11 && obj && pbf) { obj.k = pbf.readSFixed32(); }
            else if (tag === 12 && obj && pbf) { obj.l = pbf.readSFixed64(); }
            else if (tag === 13 && obj && pbf) { obj.m = pbf.readBoolean(); }
            else if (tag === 14 && obj && pbf) { obj.n = pbf.readString(); }
            else if (tag === 15 && obj && pbf) { obj.o = pbf.readBytes(); }
        }, { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: false, n: "", o: new Uint8Array(0) });
    },

    encode(obj: DataTypesSchema): Uint8Array {
        const pbf = new Pbf();
        if (obj.a) { pbf.writeDoubleField(1, obj.a); }
        if (obj.b) { pbf.writeFloatField(2, obj.b); }
        if (obj.c) { pbf.writeVarintField(3, obj.c); }
        if (obj.d) { pbf.writeVarintField(4, obj.d); }
        if (obj.e) { pbf.writeSVarintField(5, obj.e); }
        if (obj.f) { pbf.writeSVarintField(6, obj.f); }
        if (obj.g) { pbf.writeVarintField(7, obj.g); }
        if (obj.h) { pbf.writeVarintField(8, obj.h); }
        if (obj.i) { pbf.writeFixed32Field(9, obj.i); }
        if (obj.j) { pbf.writeFixed64Field(10, obj.j); }
        if (obj.k) { pbf.writeSFixed32Field(11, obj.k); }
        if (obj.l) { pbf.writeSFixed64Field(12, obj.l); }
        if (obj.m) { pbf.writeBooleanField(13, obj.m); }
        if (obj.n) { pbf.writeStringField(14, obj.n); }
        if (obj.o) { pbf.writeBytesField(15, obj.o); }
        const buffer = pbf.finish();
        return buffer;
    }
};