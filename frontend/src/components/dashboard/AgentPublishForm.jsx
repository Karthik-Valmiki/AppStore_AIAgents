import { useState } from 'react';
import Button from '../common/Button';
import api from '../../services/api';

export default function AgentPublishForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'productivity',
    api_endpoint: '',
    version: '1.0.0',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    
    try {
      console.log('=== Agent Publish Form Submission ===');
      console.log('Form Data:', formData);
      
      if (!formData.name || !formData.description || !formData.api_endpoint) {
        throw new Error('Please fill in all required fields');
      }
      
      if (formData.name.length > 100) {
        throw new Error('Agent name must be less than 100 characters');
      }
      
      if (formData.description.length > 500) {
        throw new Error('Description must be less than 500 characters');
      }
      
      console.log('Validation passed, sending to API...');
      
      const response = await api.post('/agents/', formData);
      
      console.log('API Response:', response.data);
      console.log('✅ Agent published successfully!');
      
      setFormData({ name: '', description: '', category: 'productivity', api_endpoint: '', version: '1.0.0' });
      setSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('❌ Error publishing agent:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to publish agent';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card fade-in" style={{...styles.form, animationDelay: '0.2s'}}>
      {error && <div className="alert alert-error error-shake">{error}</div>}
      {success && <div className="alert alert-success success-pop">Agent published successfully!</div>}
      
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Agent Name</label>
          <input
            className="input"
            placeholder="Enter agent name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={loading}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Version</label>
          <input
            className="input"
            placeholder="1.0.0"
            value={formData.version}
            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
            disabled={loading}
          />
        </div>
      </div>
      
      <div style={styles.field}>
        <label style={styles.label}>Description</label>
        <textarea
          className="input"
          placeholder="Describe what your agent does..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="4"
          required
          disabled={loading}
        />
      </div>
      
      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Category</label>
          <select
            className="input"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            disabled={loading}
          >
            <option value="productivity">Productivity</option>
            <option value="analytics">Analytics</option>
            <option value="customer_service">Customer Service</option>
            <option value="content">Content Creation</option>
            <option value="automation">Automation</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>API Endpoint</label>
          <input
            className="input"
            placeholder="https://api.example.com/agent"
            value={formData.api_endpoint}
            onChange={(e) => setFormData({ ...formData, api_endpoint: e.target.value })}
            required
            disabled={loading}
          />
        </div>
      </div>
      
      <Button type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Publishing...' : 'Publish Agent'}
      </Button>
    </form>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: 'var(--dark)' }
};
