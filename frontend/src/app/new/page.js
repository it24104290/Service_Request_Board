'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewJob() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Plumbing',
    location: '',
    contactName: '',
    contactEmail: ''
  });

  const categories = ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'General'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create job request');
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2 className="page-title" style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Post a New Request</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Job Title *</label>
          <input 
            type="text" 
            name="title" 
            className="form-control" 
            required 
            placeholder="e.g., Leaking kitchen tap"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            name="category" 
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input 
            type="text" 
            name="location" 
            className="form-control" 
            placeholder="e.g., Glasgow"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea 
            name="description" 
            className="form-control" 
            required 
            placeholder="Describe the issue in detail..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Contact Name</label>
            <input 
              type="text" 
              name="contactName" 
              className="form-control" 
              value={formData.contactName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Email</label>
            <input 
              type="email" 
              name="contactEmail" 
              className="form-control" 
              value={formData.contactEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => router.back()} className="btn btn-outline">Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Posting...' : 'Post Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
