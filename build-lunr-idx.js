/* eslint-disable no-invalid-this */

const lunr = require('lunr');
const fs = require('fs');
const http = require('follow-redirects').http;

http.get('http://api.smartcasa.org/paragraphs', res => {
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', chunk => {
    rawData += chunk;
  });
  res.on('end', () => {
    const paragraphs = JSON.parse(rawData);
    const idx = lunr(function() {
      this.ref('id');
      this.field('paragraphText');
      for (const paragraph of paragraphs.data) {
        this.add(paragraph);
      }
    });
    fs.writeFile('./lunr-index.json', JSON.stringify(idx), () => {
      console.log('done');
    });
  });
});
