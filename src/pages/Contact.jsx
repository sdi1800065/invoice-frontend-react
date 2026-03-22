import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { contactPage } from '../seo/structuredData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Contact.module.css'

const galleryImages = [
  '/assets/images/cretan-fleur-0.jpg',
  '/assets/images/athens-view-11.jpg',
  '/assets/images/portfolio-hdr-1.jpg',
  '/assets/images/cretan-fleur-5.jpg',
  '/assets/images/athens-view-13.jpg',
  '/assets/images/portfolio-hdr-2.jpg',
  '/assets/images/cretan-fleur-12.jpg',
  '/assets/images/athens-view-16a.jpg',
]

export default function Contact() {
  const seo = SEO.contact.el
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent'
  const [error, setError] = useState('')

  useScrollReveal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), message: message.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Αποτυχία αποστολής.')
      setStatus('sent')
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://Everyweb.gr/epikoinwnia" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://Everyweb.gr/epikoinwnia" />
        <meta property="og:image" content="https://Everyweb.gr/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://Everyweb.gr/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(contactPage)}</script>
      </Helmet>

      <Header />

      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={`${styles.heroTitle} fade-up`}>
              Ας μιλήσουμε για την{' '}
              <span className={styles.accent}>επιχείρησή σας</span>
            </h1>
            <p className={`${styles.heroSub} fade-up`}>
              Στην EveryWeb πιστεύουμε στη δύναμη της προσωπικής επαφής.
              Είτε έχετε μια ιδέα, είτε αναζητάτε καθοδήγηση, είμαστε εδώ
              για να σας ακούσουμε.
            </p>
          </div>
          <div className={`${styles.heroDecor} fade-up`} aria-hidden="true">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.15" />
              <circle cx="100" cy="100" r="60" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.25" />
              <circle cx="100" cy="100" r="30" fill="var(--color-primary)" opacity="0.08" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.12" />
              <line x1="100" y1="10" x2="100" y2="190" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.12" />
            </svg>
          </div>
        </section>

        {/* Main content: form + info */}
        <section className={styles.mainSection}>
          <div className={styles.mainGrid}>
            {/* Left: Form */}
            <div className={`${styles.formCard} fade-up`}>
              <h2 className={styles.formTitle}>Στείλτε μας ένα μήνυμα</h2>

              {status === 'sent' ? (
                <div className={styles.success}>
                  Το μήνυμά σας στάλθηκε με επιτυχία! Θα επικοινωνήσουμε μαζί σας σύντομα.
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="email">EMAIL *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message">ΠΩΣ ΜΠΟΡΟΥΜΕ ΝΑ ΒΟΗΘΗΣΟΥΜΕ; *</label>
                    <textarea
                      id="message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Γράψτε το μήνυμά σας..."
                      rows={5}
                    />
                  </div>

                  {error && <p className={styles.error}>{error}</p>}

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'ΑΠΟΣΤΟΛΗ...' : 'ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ'}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Contact info */}
            <div className={`${styles.infoCol} fade-up`}>
              <div className={styles.infoItem}>
                <div className={`${styles.infoIcon} ${styles.infoIconPrimary}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className={styles.infoLabel}>Τοποθεσία</h3>
                  <p className={styles.infoText}>
                    Λεωφόρος Βασιλίσσης Σοφίας 42, Αθήνα
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className={styles.infoLabel}>Τηλέφωνο</h3>
                  <a href="tel:6942533482" className={styles.infoLink}>
                    694 253 3482
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3 className={styles.infoLabel}>Email</h3>
                  <a href="mailto:info@everyweb.gr" className={styles.infoLink}>
                    info@everyweb.gr
                  </a>
                </div>
              </div>

              {/* Social links */}
              <div className={styles.social}>
                <a
                  href="https://www.facebook.com/profile.php?id=61560009936690"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={styles.socialLink}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/every_web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={styles.socialLink}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@Everyweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className={styles.socialLink}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className={`${styles.gallery} fade-up`}>
          <p className={styles.galleryLabel}>Inspiration & Workspace</p>
          <div className={styles.galleryTrack}>
            {galleryImages.map((src, i) => (
              <div className={styles.galleryItem} key={i}>
                <img src={src} alt="EveryWeb χώρος εργασίας και έμπνευση" loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
