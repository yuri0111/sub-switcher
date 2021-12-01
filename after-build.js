const fs = require('fs');
const path = require("path");

const copyRecursiveSync = function(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};


if (fs.existsSync('dist/manifest.json')) {
    fs.unlinkSync('dist/manifest.json');
}
let manifest = fs.readFileSync('manifest.json').toString();
manifest = manifest.replace('dist/index.js', 'index.js');

fs.writeFileSync('dist/manifest.json', manifest);


if (fs.existsSync('dist/icons')) {
    fs.rmSync('dist/icons', { recursive: true, force: true });
}
copyRecursiveSync('icons', 'dist/icons');

