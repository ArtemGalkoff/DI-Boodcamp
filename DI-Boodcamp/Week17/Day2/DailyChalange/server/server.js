const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello From Express" });
});

app.post('/api/world', (req, res) => {
  const { value } = req.body;
  console.log('Received POST request with value: ', value); 
  res.json({ message: `I received your POST request. This is what you sent me: ${value}` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});