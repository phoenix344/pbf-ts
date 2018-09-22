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
            if (obj) {
                if (tag === 1 && 'undefined' !== typeof obj.a && pbf) { obj.a = pbf.readDouble(); }
                else if (tag === 2 && 'undefined' !== typeof obj.b && pbf) { obj.b = pbf.readFloat(); }
                else if (tag === 3 && 'undefined' !== typeof obj.c && pbf) { obj.c = pbf.readVarint(); }
                else if (tag === 4 && 'undefined' !== typeof obj.d && pbf) { obj.d = pbf.readVarint(); }
                else if (tag === 5 && 'undefined' !== typeof obj.e && pbf) { obj.e = pbf.readSVarint(); }
                else if (tag === 6 && 'undefined' !== typeof obj.f && pbf) { obj.f = pbf.readSVarint(); }
                else if (tag === 7 && 'undefined' !== typeof obj.g && pbf) { obj.g = pbf.readVarint(); }
                else if (tag === 8 && 'undefined' !== typeof obj.h && pbf) { obj.h = pbf.readVarint(); }
                else if (tag === 9 && 'undefined' !== typeof obj.i && pbf) { obj.i = pbf.readFixed32(); }
                else if (tag === 10 && 'undefined' !== typeof obj.j && pbf) { obj.j = pbf.readFixed64(); }
                else if (tag === 11 && 'undefined' !== typeof obj.k && pbf) { obj.k = pbf.readSFixed32(); }
                else if (tag === 12 && 'undefined' !== typeof obj.l && pbf) { obj.l = pbf.readSFixed64(); }
                else if (tag === 13 && 'undefined' !== typeof obj.m && pbf) { obj.m = pbf.readBoolean(); }
                else if (tag === 14 && 'undefined' !== typeof obj.n && pbf) { obj.n = pbf.readString(); }
                else if (tag === 15 && 'undefined' !== typeof obj.o && pbf) { obj.o = pbf.readBytes(); }
            }
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
        return Buffer.from(buffer);
    }
};