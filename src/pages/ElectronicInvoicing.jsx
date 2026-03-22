import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { invoicingService } from '../seo/structuredData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './ElectronicInvoicing.module.css'

const FEATURES = [
  'Αυτόματη έκδοση τιμολογίων και αποδείξεων',
  'Διαβίβαση στην ΑΑΔΕ MyData',
  'PDF παραστατικά και αποστολή email',
  'Admin dashboard για πελάτες και παραστατικά',
  'Stripe πληρωμές και webhook αυτοματοποίηση',
]

const PROCESS = [
  'Ρυθμίζουμε τον λογαριασμό σας και τον πάροχο ηλεκτρονικής τιμολόγησης.',
  'Συνδέουμε checkout, πληρωμές και στοιχεία πελατών με τη ροή έκδοσης παραστατικών.',
  'Αυτοματοποιούμε την αποστολή σε ΑΑΔΕ, την παραγωγή PDF και το email προς τον πελάτη.',
]

export default function ElectronicInvoicing() {
  const seo = SEO.invoicing.el
  useScrollReveal()

  return (
    <div className="page pixel-grid">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://Everyweb.gr/ilektroniki-timologisi" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://Everyweb.gr/ilektroniki-timologisi" />
        <meta property="og:image" content="https://Everyweb.gr/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://Everyweb.gr/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(invoicingService)}</script>
      </Helmet>

      <Header />

      <main className={styles.page}>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={`${styles.label} fade-up`}>ΑΑΔΕ MyData</span>
            <h1 className="fade-up">
              Ηλεκτρονική <span className={styles.accent}>Πληρωμή &amp; Τιμολόγηση</span>
            </h1>
            <p className="fade-up">
              Αυτόματη έκδοση παραστατικών από 19,99€/μήνα + ΦΠΑ με διαβίβαση στην ΑΑΔΕ
              MyData, PDF, email αποστολή και dashboard διαχείρισης.
              Πιστοποιημένος πάροχος: <strong>e-timologera</strong> (Brantnet).
            </p>
          </div>
        </section>

        {/* ── Pricing Cards ── */}
        <section className={styles.pricingSection}>
          <div className={`${styles.card} fade-up`}>
            <h2>Πακέτο Τιμολόγησης</h2>
            <div className={styles.priceRow}>
              <span className={styles.priceAmount}>€19.99</span>
              <span className={styles.pricePer}>/μήνα + ΦΠΑ</span>
            </div>
            <p>
              Πλήρης ροή ηλεκτρονικής τιμολόγησης για online πωλήσεις και
              αυτοματοποιημένη έκδοση παραστατικών μετά την πληρωμή.
            </p>
            <ul className={styles.featureList}>
              {FEATURES.map((feature) => (
                <li key={feature}>
                  <span className={styles.checkIcon}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <p className={styles.providerNote}>
              * Πιστοποιημένος πάροχος ηλεκτρονικής τιμολόγησης: <strong>e-timologera</strong> της Brantnet — χρεώνεται ξεχωριστά όπου απαιτείται.
            </p>
            <Link to="/epikoinwnia" className="btn">Ζητήστε Επίδειξη</Link>
          </div>

          <div className={`${styles.card} fade-up`}>
            <h2>Πώς Λειτουργεί</h2>
            <p>
              Η υπηρεσία είναι σχεδιασμένη για επιχειρήσεις που θέλουν να συνδέσουν πωλήσεις,
              πληρωμές και φορολογική διαβίβαση σε μία αξιόπιστη αυτοματοποιημένη ροή.
            </p>
            <ul className={styles.featureList}>
              {PROCESS.map((step, i) => (
                <li key={step}>
                  <span className={styles.stepNumber}>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
            <Link to="/epikoinwnia" className="btn">Μιλήστε Μαζί μας</Link>
          </div>
        </section>

        {/* ── Coverage ── */}
        <section className={`${styles.coverage} fade-up`}>
          <h2>Τι Καλύπτει</h2>
          <p>
            Η λύση καλύπτει την έκδοση τιμολογίων και αποδείξεων, τη διαβίβαση στην ΑΑΔΕ,
            την παραγωγή PDF και την αποστολή email στον πελάτη χωρίς χειροκίνητες ενέργειες.
          </p>
        </section>

        {/* ── CTA ── */}
        <section className={`${styles.cta} fade-up`}>
          <h2>Χρειάζεστε αυτοματοποιημένη τιμολόγηση;</h2>
          <p>
            Πείτε μας πώς πληρώνουν οι πελάτες σας και θα σας προτείνουμε τη σωστή ροή
            ηλεκτρονικής τιμολόγησης για την επιχείρησή σας.
          </p>
          <Link to="/epikoinwnia" className="btn">Επικοινωνία</Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
