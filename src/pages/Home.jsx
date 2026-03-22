import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { homeBusiness } from '../seo/structuredData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Home.module.css'

export default function Home() {
  const seo = SEO.home.el
  useScrollReveal()

  return (
    <div className="page pixel-grid">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://Everyweb.gr/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://Everyweb.gr/" />
        <meta property="og:image" content="https://Everyweb.gr/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://Everyweb.gr/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(homeBusiness)}</script>
      </Helmet>

      <Header />

      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>

              <h1 className={styles.heroTitle}>
                Δημιουργούμε το <em>ψηφιακό</em> σας μέλλον από{' '}
                <span className={styles.gradientPrice}>€29.99/μήνα</span>
              </h1>

              <p className={styles.heroSub}>
                Επαγγελματική παρουσία για την επιχείρησή σας με €29.99/μήνα.
                Περιλαμβάνει τα πάντα: Σχεδιασμό, Hosting, SSL και Συνεχή Συντήρηση.
              </p>

              <div className={styles.heroBtns}>
                <Link to="/checkout" className="btn">Ξεκινήστε τώρα</Link>
                <Link to="/portfolio" className="btn btn--outline">Δείτε τα Project</Link>
              </div>
            </div>

            <Link to="/portfolio" className={styles.heroVisual}>
              <div className={styles.mockupFrame}>
                <div className={styles.pixelAccent} />
                <img
                  src="/assets/images/edrano-preview.jpg"
                  alt="Δείγμα ιστοσελίδας — Έδρανο"
                  loading="eager"
                />
              </div>
            </Link>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className={styles.pricing}>
          <div className={styles.pricingInner}>
            <div className={`${styles.pricingText} fade-up`}>
              <h2>Η επανάσταση του €29.99/μήνα</h2>
              <p>
                Ξεχάστε τα τεράστια αρχικά κόστη κατασκευής. Με ένα απλό μηνιαίο πακέτο
                αποκτάτε επαγγελματική ιστοσελίδα, hosting, domain και συνεχή συντήρηση.
                Χωρίς κρυφές χρεώσεις, χωρίς εκπλήξεις.
              </p>
            </div>

            <div className={`${styles.pricingCard} fade-up`}>
              <div className={styles.priceHead}>
                <span className={styles.priceAmount}>€29.99</span>
                <span className={styles.pricePer}>/μήνα</span>
              </div>
              <ul className={styles.priceList}>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  Σχεδιασμός Full Website
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  Domain &amp; Hosting
                </li>
                <li>
                  <span className={styles.checkIcon}>✓</span>
                  Ασφάλεια SSL
                </li>
              </ul>
              <Link to="/checkout" className="btn">Επιλογή Πακέτου</Link>
            </div>
          </div>
        </section>

        {/* ── Services Bento Grid ── */}
        <section className={styles.services}>
          <div className={styles.servicesInner}>
            <h2 className="fade-up">Ολοκληρωμένη Ψηφιακή Υποστήριξη</h2>

            <div className={styles.bentoGrid}>
              <div className={`${styles.bentoCard} fade-up`}>
                <div className={styles.bentoIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                </div>
                <h3>Domain &amp; Hosting</h3>
                <p>Δικό σας domain (.gr / .com) και hosting υψηλής ταχύτητας με 99.9% uptime.</p>
              </div>

              <div className={`${styles.bentoCard} fade-up`}>
                <div className={styles.bentoIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <h3>SSL Security</h3>
                <p>Πιστοποιητικό SSL, backups και προστασία για ασφαλή πλοήγηση.</p>
              </div>

              <div className={`${styles.bentoCard} fade-up`}>
                <div className={styles.bentoIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <h3>SEO</h3>
                <p>On-page βελτιστοποίηση και δομημένα δεδομένα για κατάταξη στο Google.</p>
              </div>

              <div className={`${styles.bentoCard} ${styles.bentoWide} fade-up`}>
                <div className={styles.bentoContent}>
                  <div className={styles.bentoIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <div>
                    <h3>Συνεχής Συντήρηση</h3>
                    <p>Ενημερώσεις, patches ασφαλείας και τεχνική υποστήριξη ώστε η ιστοσελίδα σας να λειτουργεί πάντα άψογα.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Selected Projects ── */}
        <section className={styles.projects}>
          <div className={styles.projectsInner}>
            <div className={styles.projectsHead}>
              <h2 className="fade-up">Επιλεγμένα Projects</h2>
              <Link to="/portfolio" className={`${styles.viewGallery} fade-up`}>
                View Gallery
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className={styles.projectsGrid}>
              <Link
                to="/portfolio"
                className={`${styles.projectCard} fade-up`}
              >
                <img
                  src="/assets/images/kastoria-preview.jpg"
                  alt="Central Kastoria Houses — Ενοικιαζόμενα καταλύματα Καστοριά"
                  loading="lazy"
                />
                <div className={styles.projectOverlay}>
                  <h3>Central Kastoria Houses</h3>
                  <p>Ενοικιαζόμενα καταλύματα</p>
                </div>
              </Link>
              <Link
                to="/portfolio"
                className={`${styles.projectCard} fade-up`}
              >
                <img
                  src="/assets/images/edrano-preview.jpg"
                  alt="Έδρανο — Κατάστημα επίπλων"
                  loading="lazy"
                />
                <div className={styles.projectOverlay}>
                  <h3>Έδρανο</h3>
                  <p>Κατάστημα επίπλων</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.cta}>
          <div className={`${styles.ctaContent} fade-up`}>
            <h2>Έτοιμοι για το επόμενο βήμα;</h2>
            <div className={styles.ctaBtns}>
              <Link to="/checkout" className="btn">Ξεκινήστε τώρα</Link>
              <Link to="/epikoinwnia" className="btn btn--outline">Επικοινωνήστε μαζί μας</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
