const fs = require('fs');

const inputFile = 'output-product.json';
const outputFile = 'retail-catalog.txt';

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  const json = JSON.parse(data);
  const output = json.map(item => JSON.stringify(item)).join('\n');

  fs.writeFile(outputFile, output, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Output file created!');
  });
});
