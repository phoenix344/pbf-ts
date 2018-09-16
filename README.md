# pbf-ts
Creates interface schema and encoder/decoder for protobuf.

The CLI is very simple:
```
pbfts [source dir] [target dir] file1.proto file2.proto ...
```

After parsing the protobuf schema the program will create an interface, a encoder and a decoder
for every message schema.

```protobuf
# src/myfile.proto
message Point {
    required uint32 x = 1;
    required uint32 y = 2;
    optional uint32 z = 3;
}
```

It creates a file with the name of the message:
```bash
pbfts ./src ./lib myfile.proto
# => ./lib/Point.ts
```

```typescript
export interface PointSchema {
    x: number;
    y: number;
    z?: number;
}
export const Point = {
    encode(obj: PointSchema): Buffer { ... },
    decode(buf: Buffer | Uint8Array): PointSchema { ... }
};
```

You can also use the writer functions in your own code:
```typescript
import { writeSchemaFile, writeSchemaFileSync } from "@netrunner/pbf-ts";

const pbfData = `
message User {
    required uint32 id = 1;
    required string name = 2;
    required bytes salt = 3;
    optional bytes hash = 4;
}
message Post {
    required uint32 id = 1;
    required uint32 user_id = 2;
    required string title = 3;
    required string description = 4;
}
`;

// synchronous file creation
writeSchemaFileSync(pbfData, {
    // // default options
    // indent: '    ',
    // suffix: 'Schema',
    // lineBreak: '\n',
    // writeDir: './'
});
// => User.ts
// => Post.ts

(async () => {
    // asynchronous file creation
    await writeSchemaFile(pbfData, {
        // // default options
        // indent: '    ',
        // suffix: 'Schema',
        // lineBreak: '\n',
        // writeDir: './'
    });
    // => User.ts
    // => Post.ts
});
```

