const axios = require('axios');

// Create a function to fetch posts
const fetchPosts = async () => {
  try {
    // Make a GET request to the JSONPlaceholder API to fetch all posts
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    
    // If the request is successful, return the fetched posts
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error fetching posts:', error);
    return null;
  }
};


module.exports = { fetchPosts };