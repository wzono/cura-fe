const fs = require('fs');
const path = require('path');

module.exports = {
  getJSONData(filePath) {
    const json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    return JSON.parse(json);
  },
};
