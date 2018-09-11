const { unlinkSync, existsSync } = require('fs');
const { execSync } = require('child_process');
const assert = require('assert');

module.exports = [
    (async function testCLI() {
        execSync('./cli.js ./test/source ./test/target 01-cli.proto');
        assert.ok(existsSync('./test/target/X.ts'));
        unlinkSync('./test/target/X.ts');
    })()
];