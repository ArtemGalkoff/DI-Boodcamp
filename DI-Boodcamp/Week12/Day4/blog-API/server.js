const express = require('express');

const app = express();

const posts = [
    {
      id: 1,
      title: 'Boston',
      content: 'This is the content of Boston '
    },
    {
      id: 2,
      title: 'Michigan',
      content: 'This is the content of Michigan'
    },
    {
      id: 3,
      title: 'Orlando',
      content: 'This is the content of Orlando'
    },
    {
      id: 4,
      title: 'New Orlean',
      content: 'This is the content of New Orlean'
    },
    {
      id: 5,
      title: 'Little Rock',
      content: 'This is the content of Little Rock'
    }
  ];

  app.get('/posts', (req, res) => {
    res.json(posts); 
  });

  app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);  
    const post = posts.find(p => p.id === postId); 
    
    if (post) {
      res.json(post); 
    } else {
      res.status(404).json({ message: 'Post not found' }); 
    }
  });

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3 000');
  });



  const express = require('express');
  
  
  const products = [
    { id: 101, name: "Product 101", price: 100 },
    { id: 201, name: "Product 201", price: 200 },
    { id: 301, name: "Product 301", price: 300 },
  ];
  
  
  app.get('/products', (req, res) => {
    res.json(products); 
  });
  
  app.listen(5010, () => {
    console.log('Server running at http://localhost:5010');
  });