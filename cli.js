#!/usr/bin/env node
const { readFile } = require('fs');
const { join } = require('path')
const { writeSchemaFile } = require('./index');
let [source, target, ...files] = process.argv.slice(2);

if (!source || !target || !files || !files.length) {
    console.log('pbfts <source dir> <target dir> <pbf file 1> <pbf file 2> ...');
    console.log('example: pbfts ./src ./lib file1.proto file2.proto');
    return;
}

function readFileAsync(filename) {
    return new Promise((resolve, reject) => {
        readFile(filename, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

(async () => {
    const content = await files.map(file => readFileAsync(join(source, file)));
    await content.map(cnt => writeSchemaFile(cnt));
});

console.log('done!');