import Link from 'next/link';

export default function JobCard({ job }) {
  const statusClass = 
    job.status === 'Open' ? 'status-open' :
    job.status === 'In Progress' ? 'status-inprogress' :
    'status-closed';

  return (
    <div className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <div className="job-meta">
        <span>📍 {job.location || 'Anywhere'}</span>
        <span>🏷️ {job.category || 'General'}</span>
      </div>
      <p className="job-desc">{job.description}</p>
      
      <div className="job-footer">
        <span className={`status-badge ${statusClass}`}>{job.status}</span>
        <Link href={`/jobs/${job._id}`} className="btn btn-outline">
          View Details
        </Link>
      </div>
    </div>
  );
}
