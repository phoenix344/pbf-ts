#!/usr/bin/env node
const { readFile } = require('fs');
const { writeSchemaFile } = require('./index');
const files = process.argv.slice(2);

if (!files.length) {
    console.log('pbf-ts file1.proto file2.proto ...');
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
    const content = await files.map(file => readFileAsync(file));
    await content.map(cnt => writeSchemaFile(cnt));
});

console.log('done!');