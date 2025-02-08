
const fs = require('fs');

function readFile(filePath, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(`Error reading: ${err.message}`);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFile(filePath, content, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, encoding, (err) => {
      if (err) {
        reject(`Error: ${err.message}`);
      } else {
        resolve('Cool');
      }
    });
  });
}

module.exports = {
  readFile,
  writeFile
};
