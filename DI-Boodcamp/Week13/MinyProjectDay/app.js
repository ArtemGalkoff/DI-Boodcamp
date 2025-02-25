const express = require('express');
const taskRoutes = require('./routes');  

const app = express();

app.use(express.json());  
app.use(taskRoutes);  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});