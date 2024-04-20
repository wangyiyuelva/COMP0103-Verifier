import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

function detectCodeBlocks(content) {
  // Regular expression for finding code blocks
  const regex = /```c\+\+(.*?)```/s;

  let codeBlock = '';

  let match;
  if ((match = regex.exec(content)) !== null) {
    codeBlock = match[1];
  }
  console.log(`codeBlock: ${codeBlock}`);

  return codeBlock;
}

app.post('/submit-code', (req, res) => {
  const content = req.body.code;
  const codeBlock = detectCodeBlocks(content)

  const filename = './mount/target.cpp';
  
  fs.writeFile(filename, codeBlock, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving code');
    }

    console.log(`Code saved to: ${filename}`);
    res.send('Code submitted successfully!');
  });
});


app.listen(7001, () => {
  console.log('Server is running');
});