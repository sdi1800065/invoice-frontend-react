import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { contactPage } from '../seo/structuredData'
import styles from './Contact.module.css'

export default function Contact() {
  const seo = SEO.contact.el
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent'

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: connect to backend/email service (e.g. EmailJS, Formspree, or custom API)
    setTimeout(() => setStatus('sent'), 800)
  }

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://frameflat.gr/epikoinwnia" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://frameflat.gr/epikoinwnia" />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(contactPage)}</script>
      </Helmet>

      <Header />

      <div className={styles.page}>
        <div className={styles.inner}>
          <h1>Επικοινωνία</h1>
          <p className={styles.subtitle}>
            Μη διστάσετε να επικοινωνήσετε μαζί μας για κατασκευή ιστοσελίδας, συντήρηση,
            redesign ή φωτογράφιση ακινήτων. Είμαστε εδώ για να βοηθήσουμε!
          </p>

          {status === 'sent' ? (
            <div className={styles.success}>
              Το μήνυμά σας στάλθηκε με επιτυχία! Θα επικοινωνήσουμε μαζί σας σύντομα.
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="email">Διεύθυνση email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Το μήνυμά σας *</label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Γράψτε το μήνυμά σας..."
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className="btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Αποστολή...' : 'Αποστολή μηνύματος'}
              </button>
            </form>
          )}

          {/* Follow Us */}
          <div className={styles.followSection}>
            <h2>Ακολουθήστε μας</h2>
            <p className={styles.followDesc}>
              Η επαγγελματική σας ιστοσελίδα είναι μόνο ένα μήνυμα μακριά.
              Βρείτε μας και στα social media.
            </p>

            <div className={styles.contactDetails}>
              <a href="mailto:frameflatcompany@gmail.com" className={styles.contactItem}>
                <img src="/assets/images/icon-mail.png" alt="Email" />
                frameflatcompany@gmail.com
              </a>
              <a href="tel:6942533482" className={styles.contactItem}>
                <img src="/assets/images/icon-thl.png" alt="Τηλέφωνο" />
                6942533482
              </a>
            </div>

            <div className={styles.social}>
              <a
                href="https://www.facebook.com/profile.php?id=61560009936690"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img src="/assets/images/icon-facebook.png" alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/frame_flat/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="/assets/images/icon-instagram.png" alt="Instagram" />
              </a>
              <a
                href="https://www.tiktok.com/@frameflat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <img src="/assets/images/icon-tiktok.png" alt="TikTok" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
