/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const filePaths = process.argv.slice(2);
if (!filePaths.length) {
  console.error('At least one filename must be specified');
  process.exit(1);
}

const fullPaths = filePaths.map((filePath) => path.join(process.cwd(), filePath));
console.log(`Waiting for ${fullPaths.join(', ')}...`);

(function filesExist(files) {
  const remaining = files.filter((file) => !fs.existsSync(file));
  if (!remaining.length) {
    process.exit(0);
  }
  setTimeout(() => filesExist(remaining), 500);
})(fullPaths);
