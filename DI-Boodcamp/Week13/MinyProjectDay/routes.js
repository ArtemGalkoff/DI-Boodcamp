const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const tasksFilePath = path.join(__dirname, 'tasks.json');

router.get('/tasks', (req, res) => {
  fs.readFile(tasksFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Ошибка при чтении файла задач.' });
    
    try {
      const tasks = JSON.parse(data);  
      res.json(tasks);  
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обработке данных.' });
    }
  });
});

router.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10); 
  
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ message: 'Ошибка при чтении файла задач.' });
      
      try {
        const tasks = JSON.parse(data);
        const task = tasks.find(t => t.id === taskId); 
  
        if (!task) {
          return res.status(404).json({ message: `Задача с ID ${taskId} не найдена.` });
        }
  
        res.json(task);  
      } catch (error) {
        res.status(500).json({ message: 'Ошибка при обработке данных.' });
      }
    });
  });

  router.post('/tasks', (req, res) => {
    const newTask = req.body;  
  
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ message: 'Ошибка при чтении файла задач.' });
  
      try {
        const tasks = JSON.parse(data);
        newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;  
        tasks.push(newTask);  
  

        fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
          if (err) return res.status(500).json({ message: 'Ошибка при сохранении задачи.' });
          res.status(201).json(newTask);  
        });
      } catch (error) {
        res.status(500).json({ message: 'Ошибка при обработке данных.' });
      }
    });
  });

  router.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);  
    const updatedTask = req.body;  
  
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ message: 'Ошибка при чтении файла задач.' });
  
      try {
        const tasks = JSON.parse(data);
        const taskIndex = tasks.findIndex(t => t.id === taskId);  
  
        if (taskIndex === -1) {
          return res.status(404).json({ message: `Задача с ID ${taskId} не найдена.` });
        }

        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  
        fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
          if (err) return res.status(500).json({ message: 'Ошибка при сохранении задачи.' });
          res.json(tasks[taskIndex]);  
        });
      } catch (error) {
        res.status(500).json({ message: 'Ошибка при обработке данных.' });
      }
    });
  });

  router.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);  
  
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ message: 'Ошибка при чтении файла задач.' });
  
      try {
        const tasks = JSON.parse(data);
        const taskIndex = tasks.findIndex(t => t.id === taskId);  
  
        if (taskIndex === -1) {
          return res.status(404).json({ message: `Задача с ID ${taskId} не найдена.` });
        }
  

        tasks.splice(taskIndex, 1);
  
        fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
          if (err) return res.status(500).json({ message: 'Ошибка при сохранении задач.' });
          res.status(204).send();  
        });
      } catch (error) {
        res.status(500).json({ message: 'Ошибка при обработке данных.' });
      }
    });
  });


  module.exports = router;