#!/usr/bin/env node

(async () => {
    const { join } = require('path')
    const { writeSchemaFile } = require('./index');
    const { readAsync } = require('./util');
    let [source, target, ...files] = process.argv.slice(2);

    if (!source || !target || !files || !files.length) {
        console.log('pbfts <source dir> <target dir> <pbf file 1> <pbf file 2> ...');
        console.log('example: pbfts ./src ./lib file1.proto file2.proto');
        return;
    }

    try {
        const content = await Promise.all(files.map(file => readAsync(join(source, file))));
        console.log(content[0].toString());
        await Promise.all(content.map(cnt => writeSchemaFile(cnt, { writeDir: target })));
        console.log('done!');
        process.exit();
    } catch (err) {
        console.error(`(ノಠ益ಠ)ノ彡┻━┻`);
        console.error(err.stack);
        process.exit(1);
    }
})().catch(console.error);
