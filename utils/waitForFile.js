/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const filePath = process.argv.slice(2)[0];
if (!filePath) {
  console.error('Filename must be specified');
  process.exit(1);
}

(function fileExists() {
  if (fs.existsSync(path.join(process.cwd(), filePath))) {
    process.exit(0);
  }
  setTimeout(fileExists, 500);
}());
