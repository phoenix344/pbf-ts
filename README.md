# pbf-ts
Creates interface schema and encoder/decoder for protobuf. This is a WIP project and only fits my needs.
You can use, copy and modify it as you want.

The CLI is very simple:
```
pbfts [source dir] [target dir] file1 file2 ...
```

Create typescript files from TS/JS:
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

