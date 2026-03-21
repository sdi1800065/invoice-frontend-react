import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Κάτι πήγε στραβά</h1>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.</p>
          <Link to="/" className="btn" onClick={() => this.setState({ hasError: false })}>
            Επιστροφή στην Αρχική
          </Link>
        </div>
      )
    }
    return this.props.children
  }
}
