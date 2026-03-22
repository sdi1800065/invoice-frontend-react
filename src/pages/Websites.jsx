import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { websiteService } from '../seo/structuredData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Websites.module.css'

const PORTFOLIO = [
  {
    name: 'Central Kastoria Houses',
    url: 'https://centralkastoriahouses.gr',
    domain: 'centralkastoriahouses.gr',
    description: 'Δίγλωσση ιστοσελίδα για ενοικιαζόμενα καταλύματα στην Καστοριά. Gallery, σελίδα κρατήσεων και πλήρης SEO βελτιστοποίηση.',
    image: '/assets/images/kastoria-preview.jpg',
  },
  {
    name: 'Έδρανο',
    url: 'https://lightgreen-shrew-218540.hostingersite.com/',
    domain: 'edrano.gr',
    description: 'Ιστοσελίδα για κατάστημα επίπλων με παρουσίαση προϊόντων για οικιακούς, επαγγελματικούς και εξωτερικούς χώρους.',
    image: '/assets/images/edrano-preview.jpg',
  },
]

const CHECKLIST = [
  'MyData integration',
  'Stripe payments',
  'Automated Reporting',
  'API Connectivity',
]

const STATS = [
  { value: '99.9%', label: 'Uptime' },
  { value: 'SEO', label: 'Optimized' },
  { value: '7 Days', label: 'Delivery' },
  { value: 'SSL+', label: 'Security' },
]

export default function Websites() {
  const seo = SEO.websites.el
  useScrollReveal()

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://Everyweb.gr/ypiresies" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://Everyweb.gr/ypiresies" />
        <meta property="og:image" content="https://Everyweb.gr/assets/images/kastoria-preview.jpg" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://Everyweb.gr/assets/images/kastoria-preview.jpg" />
        <script type="application/ld+json">{JSON.stringify(websiteService)}</script>
      </Helmet>

      <Header />

      <main className={styles.page}>
        {/* ── Hero ── */}
        <section className={`${styles.hero} pixel-grid`}>
          <div className={styles.heroInner}>
            <span className={`${styles.label} fade-up`}>Digital Presence</span>
            <h1 className="fade-up">
              Σχεδιασμένο για <span className={styles.accent}>Επιτυχία.</span>
            </h1>
            <p className="fade-up">
              Αναβαθμίστε την ψηφιακή σας παρουσία με tailor-made υπηρεσίες
              σχεδιασμένες για σύγχρονες επιχειρήσεις.
            </p>
          </div>
        </section>

        {/* ── Bento Grid ── */}
        <section className={styles.bento}>
          {/* Card 1 — Website Design & Maintenance (full width) */}
          <div className={`${styles.cardHero} fade-up`}>
            <div className={styles.cardHeroText}>
              <span className={styles.label}>Flagship Service</span>
              <h2>Website Design &amp; Maintenance</h2>
              <div className={styles.tags}>
                <span className={styles.tag}>MOBILE-FIRST</span>
                <span className={styles.tag}>CUSTOM BUILD</span>
                <span className={styles.tag}>ENTERPRISE HOSTING</span>
              </div>
              <p>
                Αποκτήστε επαγγελματική ιστοσελίδα χωρίς αρχικό κόστος κατασκευής.
                Domain, hosting, SSL, SEO και συνεχής συντήρηση — όλα σε μία μηνιαία συνδρομή.
              </p>
              <div className={styles.priceRow}>
                <span className={styles.price}>€29.99</span>
                <span className={styles.pricePer}>/mo</span>
              </div>
              <Link to="/epikoinwnia" className="btn">Consultation</Link>
            </div>
            <Link to="/portfolio" className={styles.cardHeroImage}>
              <div className={styles.mockupBar}>
                <span className={styles.mockupDot} />
                <span className={styles.mockupDot} />
                <span className={styles.mockupDot} />
                <span className={styles.mockupUrl}>edrano.gr</span>
              </div>
              <div className={styles.mockupScreen}>
                <img
                  src="/assets/images/edrano-preview.jpg"
                  alt="Προεπισκόπηση ιστοσελίδας — Έδρανο"
                  loading="lazy"
                />
              </div>
              <div className={styles.mockupLabel}>
                <span>Δείτε τα έργα μας</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Bottom row — two cards side by side */}
          <div className={styles.bentoRow}>
            {/* Card 2 — Electronic Invoicing (7/12) */}
            <div className={`${styles.cardInvoice} fade-up`}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z" />
                  <path d="M8 10h8" />
                  <path d="M8 14h4" />
                </svg>
              </div>
              <h2>Ηλεκτρονική Πληρωμή &amp; Τιμολόγηση</h2>
              <p>
                Πλήρης ενσωμάτωση με ΑΑΔΕ myDATA. Αυτοματοποιημένη έκδοση
                παραστατικών, online πληρωμές και αναφορές σε πραγματικό χρόνο.
              </p>
              <ul className={styles.checklist}>
                {CHECKLIST.map((item) => (
                  <li key={item}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.priceRow}>
                <span className={styles.price}>€19.99</span>
                <span className={styles.pricePer}>/mo</span>
              </div>
              <Link to="/ilektroniki-timologisi" className="btn">
                Ενεργοποίηση
              </Link>
            </div>

            {/* Card 3 — Φωτογράφιση & Drone (5/12) */}
            <Link to="/portfolio#fotografia" className={`${styles.cardPhoto} fade-up`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className={styles.label}>Visual Arts</span>
              <h2>Φωτογράφιση &amp; Drone</h2>
              <p>
                Επαγγελματική φωτογράφιση ακινήτων, χώρων Airbnb και
                επιχειρήσεων. Aerial θέα με drone για μοναδικό content.
              </p>
              <div className={styles.photoPreview}>
                <img
                  src="/assets/images/hero-front.jpg"
                  alt="Επαγγελματική φωτογράφιση & Drone"
                  loading="lazy"
                />
              </div>
              <div className={styles.priceRow}>
                <span className={styles.price}>€90</span>
                <span className={styles.pricePer}>starting</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ── Tech Specs ── */}
        <section className={styles.specs}>
          <div className={styles.specsGrid}>
            {STATS.map((stat) => (
              <div key={stat.label} className={`${styles.specCard} pixel-grid fade-up`}>
                <span className={styles.specValue}>{stat.value}</span>
                <span className={styles.specLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
