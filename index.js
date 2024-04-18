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

app.post('/submit-code', (req, res) => {
  const code = req.body.code;
  const filename = './mount/target.cpp';

  fs.writeFile(filename, code, (err) => {
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