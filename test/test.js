const cluster = require('cluster');

if (cluster.isMaster) {
    const { readdirSync } = require('fs');
    const files = readdirSync(__dirname).filter(file => file.slice(file.lastIndexOf('.spec.js')) === '.spec.js');
    for (const file of files) {
        cluster.fork({ testFile: file });
    }
} else {
    const { join } = require('path');
    process.on('unhandledRejection', (err, p) => {
        console.error(`(ノಠ益ಠ)ノ彡┻━┻ ${process.env.testFile}`);
        console.error(err.stack);
        process.exit(1);
    });

    Promise.all(require(join(__dirname, process.env.testFile))).then(() => {
        console.log(`ヾ(⌐■_■)ノ♪ ${process.env.testFile}`);
        process.exit();
    });
}
