const express = require('express');
const { fetchPosts } = require('./dataService');

const app = express();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/api/posts', async (req, res) => {
    try {
      const posts = await fetchPosts();

      if (posts) {
        console.log('Well done');
        res.json(posts); 
      } else {
        res.status(500).json({ message: 'Not done' });
      }
    } catch (error) {
      // Обрабатываем ошибки
      console.error('Error:', error);
      res.status(500).json({ message: 'Error' });
    }
  });