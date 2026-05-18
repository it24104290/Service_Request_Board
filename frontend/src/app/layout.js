import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Mini Service Request Board',
  description: 'Find or post service requests in your area.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/" className="navbar-brand">
            FixItFast
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Jobs</Link>
            <Link href="/new" className="btn btn-primary">Post a Job</Link>
          </div>
        </nav>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
