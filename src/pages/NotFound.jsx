import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function NotFound() {
  return (
    <div className="page">
      <Helmet>
        <title>404 — Η σελίδα δεν βρέθηκε | Everyweb</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <div style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1.5rem' }}>Η σελίδα που ψάχνετε δεν βρέθηκε.</p>
        <Link to="/" className="btn">Επιστροφή στην Αρχική</Link>
      </div>
      <Footer />
    </div>
  )
}
