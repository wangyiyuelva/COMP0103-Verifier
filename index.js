import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello world!' });
});

app.listen(7001, () => {
  console.log('Server is running');
});