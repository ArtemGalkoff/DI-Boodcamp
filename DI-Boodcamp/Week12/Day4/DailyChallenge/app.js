const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


const emojis = [
  { emoji: '🙂', name: 'smile' },
  { emoji: '🙃', name: 'upside-down smile' },
  { emoji: '😎', name: 'cool' },
  { emoji: '😂', name: 'laughing' },
  { emoji: '😍', name: 'heart eyes' },
  { emoji: '🥺', name: 'pleading face' },
  { emoji: '🤔', name: 'thinking face' },
  { emoji: '😢', name: 'crying' },
];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/emoji', (req, res) => {
  // Генерируем случайный эмодзи
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  
  let options = [randomEmoji];
  while (options.length < 4) {
    const randomOption = emojis[Math.floor(Math.random() * emojis.length)];
    if (!options.some(option => option.name === randomOption.name)) {
      options.push(randomOption);
    }
  }
  
 
  options = options.sort(() => Math.random() - 0.5);

  res.json({ emoji: randomEmoji.emoji, options: options.map(option => option.name) });
});


let leaderboard = [];
app.post('/submit', (req, res) => {
  const { name, score } = req.body;
  
 
  leaderboard.push({ name, score });
  leaderboard = leaderboard.sort((a, b) => b.score - a.score); 

  
  leaderboard = leaderboard.slice(0, 5);

  res.json(leaderboard);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});