import React, { useState, useEffect, useContext } from 'react';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, Shield } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === 'admin';

  const fetchTasks = async () => {
    try {
      const res = await axiosClient.get('/tasks');
      setTasks(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks([]);
      setError('Failed to load tasks. Ensure backend API is accessible.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      await axiosClient.post('/tasks', taskData);
      // Immediately fetch tasks to ensure we get the populated user info if admin
      fetchTasks();
      setShowForm(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const res = await axiosClient.put(`/tasks/${editingTask._id}`, taskData);
      setTasks(tasks.map(t => t._id === editingTask._id ? { ...t, ...res.data } : t));
      setEditingTask(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axiosClient.delete(`/tasks/${id}`);
        setTasks(tasks.filter(t => t._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting task');
      }
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const res = await axiosClient.put(`/tasks/${task._id}`, { ...task, status: newStatus });
      setTasks(tasks.map(t => t._id === task._id ? { ...t, ...res.data } : t));
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating task status');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>{isAdmin ? 'Global Tasks' : 'My Tasks'}</h2>
          {isAdmin && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.75rem', borderRadius: '2rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: '600' }}>
              <Shield size={14} /> Admin View
            </span>
          )}
        </div>
        {!showForm && !editingTask && (
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            <Plus size={18} /> Add Task
          </button>
        )}
      </div>

      {error && <div style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

      {(showForm || editingTask) && (
        <TaskForm 
          initialData={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
        />
      )}

      {loading ? (
        <div className="text-center" style={{ padding: '3rem' }}><span className="loader"></span></div>
      ) : tasks.length === 0 && !error ? (
        <div className="glass-card empty-state">
          <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>No tasks found.</p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary">Create your first task</button>
        </div>
      ) : (
        <div>
          {tasks.map(task => (
             <TaskCard 
               key={task._id} 
               task={task} 
               onEdit={setEditingTask} 
               onDelete={handleDeleteTask}
               onToggleStatus={handleToggleStatus}
               showOwner={isAdmin}
             />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
