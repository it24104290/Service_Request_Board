export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
    const jobs = await res.json();
    return jobs.map((job) => ({
      id: job._id,
    }));
  } catch {
    return [];
  }
}

'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [params.id]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${params.id}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Job not found');
        throw new Error('Failed to fetch job details');
      }
      const data = await res.json();
      setJob(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    setActionLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updatedJob = await res.json();
      setJob(updatedJob);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteJob = async () => {
    if (!confirm('Are you sure you want to delete this job request?')) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${params.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete job');
      
      router.push('/');
      router.refresh();
    } catch (err) {
      alert(err.message);
      setActionLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!job) return null;

  return (
    <div className="detail-card">
      <div className="detail-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{job.title}</h1>
            <div style={{ color: 'var(--text-secondary)' }}>
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </div>
          </div>
          <select 
            className="form-control" 
            style={{ width: 'auto', fontWeight: 'bold' }}
            value={job.status}
            onChange={(e) => updateStatus(e.target.value)}
            disabled={actionLoading}
          >
            <option value="Open">Status: Open</option>
            <option value="In Progress">Status: In Progress</option>
            <option value="Closed">Status: Closed</option>
          </select>
        </div>
      </div>

      <div className="detail-meta">
        <div className="meta-item">
          <div className="label">Category</div>
          <div>{job.category || 'N/A'}</div>
        </div>
        <div className="meta-item">
          <div className="label">Location</div>
          <div>{job.location || 'N/A'}</div>
        </div>
        <div className="meta-item">
          <div className="label">Contact Name</div>
          <div>{job.contactName || 'N/A'}</div>
        </div>
        <div className="meta-item">
          <div className="label">Contact Email</div>
          <div>{job.contactEmail ? <a href={`mailto:${job.contactEmail}`} style={{ color: 'var(--accent-color)' }}>{job.contactEmail}</a> : 'N/A'}</div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Description</h3>
        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: 'var(--text-primary)' }}>
          {job.description}
        </p>
      </div>

      <div className="detail-actions">
        <button onClick={() => router.back()} className="btn btn-outline">Back to Jobs</button>
        <button 
          onClick={deleteJob} 
          className="btn btn-danger" 
          style={{ marginLeft: 'auto' }}
          disabled={actionLoading}
        >
          Delete Request
        </button>
      </div>
    </div>
  );
}
