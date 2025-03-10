import React, { useState, useEffect } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    fetch('./posts.json')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error loading posts:', error));
  }, []);

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;