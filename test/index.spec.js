const { readFileSync } = require('fs');
const { createDefinition } = require('../index');
const assert = require('assert');

module.exports = [
    (async function testCreateDefinition() {
        const [def] = createDefinition(readFileSync("test/00-datatype.proto"));
        assert.equal(def.filename, "DataTypes.ts", "filename must be equal to the class name");
        assert.equal(def.content, readFileSync(`test/${def.filename}`).toString(), "content must be exact the same");
    })()
]
