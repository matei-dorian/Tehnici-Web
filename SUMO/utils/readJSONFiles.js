const fs = require('fs');

const readJSONFile = (fileName) => {
  const rawData = fs.readFileSync(fileName);
  const parsedData = JSON.parse(rawData);

  return parsedData;
}

module.exports = readJSONFile; /// din lab 12