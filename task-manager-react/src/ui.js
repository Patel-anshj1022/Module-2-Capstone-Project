import React, { useState, useEffect } from 'react';
import { createTask } from './task';
import { saveTasks, loadTasks } from './storage';
import { fetchTasks, addTask as apiAddTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from './api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeTasks = async () => {
      setLoading(true);
      try {
        // Try to load from API first
        const apiTasks = await fetchTasks();
        setTasks(apiTasks);
      } catch (apiError) {
        setError(apiError.message);
        // Fallback to local storage
        const localTasks = loadTasks();
        setTasks(localTasks);
      } finally {
        setLoading(false);
      }
    };

    initializeTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = async () => {
    if (!inputValue.trim()) return;

    const newTask = createTask(inputValue);
    setInputValue('');

    try {
      const apiTask = await apiAddTask(newTask);
      setTasks(prev => [...prev, apiTask]);
    } catch (err) {
      setError(err.message);
      setTasks(prev => [...prev, newTask]);
    }
  };

  const handleToggleComplete = async (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? task.toggleComplete() : task
      )
    );

    try {
      const taskToUpdate = tasks.find(t => t.id === id);
      if (taskToUpdate) {
        await apiUpdateTask(id, { completed: !taskToUpdate.completed });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));

    try {
      await apiDeleteTask(id);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditTask = async (id, newTitle) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? task.updateTitle(newTitle) : task
      )
    );

    try {
      await apiUpdateTask(id, { title: newTitle });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      {error && <div className="error">{error}</div>}
      <div className="task-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <span>{task.title}</span>
              <div className="task-actions">
                <button onClick={() => {
                  const newTitle = prompt('Edit task:', task.title);
                  if (newTitle) handleEditTask(task.id, newTitle);
                }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}