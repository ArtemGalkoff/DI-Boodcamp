
const fs = require('fs');

fs.readFile('/files/file-data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  console.log('File content:', data);
});