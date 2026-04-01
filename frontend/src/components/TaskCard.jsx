import React from 'react';
import { Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus, showOwner }) => {
  return (
    <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'transform 0.2s', borderLeft: task.status === 'completed' ? '4px solid var(--success)' : '4px solid var(--accent-primary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => onToggleStatus(task)} className="btn-ghost" style={{ padding: '0.25rem' }}>
          {task.status === 'completed' ? <CheckCircle style={{ color: 'var(--success)' }} /> : <Circle style={{ color: 'var(--text-secondary)' }} />}
        </button>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, textDecoration: task.status === 'completed' ? 'line-through' : 'none', color: task.status === 'completed' ? 'var(--text-primary)' : 'var(--text-primary)' }}>{task.title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
            {task.description && <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>{task.description}</p>}
            {showOwner && task.user?.email && (
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', opacity: 0.8 }}>Owner: {task.user.email}</span>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => onEdit(task)} className="btn btn-ghost" style={{ padding: '0.5rem' }}>
          <Edit2 size={18} />
        </button>
        <button onClick={() => onDelete(task._id)} className="btn btn-danger" style={{ padding: '0.5rem' }}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
