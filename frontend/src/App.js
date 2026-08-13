import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function statusClass(status) {
  if (status === 'done') return 'status-done';
  if (status === 'in_progress') return 'status-progress';
  return 'status-todo';
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Erreur de récupération des tâches:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">✓</div>
        <div>
          <h1>SmartTask</h1>
          <p>Gestion de tâches — SmartTech DevOps</p>
        </div>
      </header>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">+ Ajouter</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 && (
          <div className="empty-state">Aucune tâche pour le moment — ajoutez-en une !</div>
        )}
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="task-info">
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
              <span className={`status-badge ${statusClass(task.status)}`}>
                {task.status}
              </span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
