const express = require('express');
const taskController = require('../controllers/taskController');  // Corrected the import path
const authMiddleware=require("../middlewares/auth")
const router = express.Router();

// Get all tasks
router.get('/tasks', authMiddleware,taskController.getAllTasks);

// Create a task
router.post('/tasks',authMiddleware, taskController.createTask);

// Update a task
router.put('/tasks/:id',authMiddleware, taskController.updateTask);

// Delete a task
router.delete('/tasks/:id',authMiddleware, taskController.deleteTask);
router.patch("/tasks/:id/toggle", authMiddleware, taskController.toggleTaskCompletion); 

module.exports = router;
