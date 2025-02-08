const express = require('express');
const app = express();

app.use(express.json());

let posts = [
  { id: 1, title: 'Boston', content: 'This is the content of Boston' },
  { id: 2, title: 'Michigan', content: 'This is the content of Michigan' },
  { id: 3, title: 'Orlando', content: 'This is the content of Orlando' }
];

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send({ message: 'Post not found' });
  res.json(post);
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send({ message: 'Title and content are required' });
  }

  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10); 
  const { title, content } = req.body;

  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts[postIndex] = { id: postId, title, content };
  
  res.json(posts[postIndex]);
});

app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10); 

  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' }); 
  }

  posts.splice(postIndex, 1);

  
  res.status(200).json({ message: 'Post deleted successfully' });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});