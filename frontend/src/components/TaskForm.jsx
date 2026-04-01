import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'pending');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
        {initialData ? 'Edit Task' : 'Add New Task'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <input 
              type="text" 
              placeholder="Task Title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea 
              placeholder="Task Description (Optional)" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ minHeight: '80px', resize: 'vertical' }}
            />
          </div>
          {initialData && (
            <div>
               <select 
                 value={status} 
                 onChange={(e) => setStatus(e.target.value)}
                 style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', outline: 'none' }}
               >
                 <option value="pending">Pending</option>
                 <option value="in_progress">In Progress</option>
                 <option value="completed">Completed</option>
               </select>
            </div>
          )}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {initialData ? 'Update Task' : 'Create Task'}
            </button>
            {onCancel && (
              <button type="button" onClick={onCancel} className="btn btn-ghost" style={{ flex: 1, border: '1px solid var(--glass-border)' }}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
