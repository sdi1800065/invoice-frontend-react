import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Websites.module.css'

const WEBSITES = [
  {
    name: 'Central Kastoria Houses',
    url: 'https://centralkastoriahouses.gr',
    domain: 'centralkastoriahouses.gr',
    description: 'Εξατομικευμένη ιστοσελίδα για ενοικιαζόμενα καταλύματα στην Καστοριά. Διπλόγλωσση (ελληνικά / αγγλικά) με gallery και σελίδα επικοινωνίας.',
    image: '/assets/images/kastoria-preview.jpg',
  },
  {
    name: 'Athens View',
    url: 'https://athensview.frameflat.gr',
    domain: 'athensview.frameflat.gr',
    description: 'Ιστοσελίδα παρουσίασης Airbnb στο κέντρο της Αθήνας με θέα στην Ακρόπολη. Μινιμαλιστικό design, gallery και σύνδεσμος κράτησης.',
    image: '/assets/images/portfolio-showcase.jpg',
  },
]

export default function Websites() {
  useScrollReveal()

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>Ιστοσελίδες Ακινήτων | Frameflat</title>
        <meta
          name="description"
          content="Δείτε τις εξατομικευμένες ιστοσελίδες ακινήτων που έχουμε δημιουργήσει. Central Kastoria Houses, Athens View και άλλα projects της Frameflat."
        />
        <meta
          name="keywords"
          content="ιστοσελίδα ακινήτου, κατασκευή ιστοσελίδας airbnb, website ακίνητο Ελλάδα, frameflat websites"
        />
        <link rel="canonical" href="https://frameflat.gr/websites" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ιστοσελίδες Ακινήτων | Frameflat" />
        <meta
          property="og:description"
          content="Εξατομικευμένες ιστοσελίδες ακινήτων από τη Frameflat."
        />
        <meta property="og:url" content="https://frameflat.gr/websites" />
        <meta property="og:image" content="/assets/images/kastoria-preview.jpg" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ιστοσελίδες Ακινήτων | Frameflat" />
        <meta
          name="twitter:description"
          content="Εξατομικευμένες ιστοσελίδες ακινήτων από τη Frameflat."
        />
        <meta name="twitter:image" content="/assets/images/kastoria-preview.jpg" />
      </Helmet>

      <Header />

      <div className={styles.page}>
        <div className={styles.hero}>
          <h1 className="fade-up">Websites</h1>
          <p className="fade-up">
            Εξατομικευμένες ιστοσελίδες για ακίνητα και καταλύματα — σχεδιασμένες να αναδεικνύουν
            κάθε property και να μετατρέπουν τους επισκέπτες σε κρατήσεις.
          </p>
        </div>

        <div className={styles.grid}>
          {WEBSITES.map((site) => (
            <a
              key={site.domain}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} fade-up`}
            >
              <div className={styles.frame}>
                <div className={styles.bar}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.domain}>{site.domain}</span>
                </div>
                <img src={site.image} alt={site.name} loading="lazy" />
              </div>
              <div className={styles.info}>
                <h2>{site.name}</h2>
                <p>{site.description}</p>
                <span className={styles.visitLink}>
                  Επίσκεψη →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className={`${styles.cta} fade-up`}>
          <h2>Θέλετε ιστοσελίδα για το ακίνητό σας;</h2>
          <p>Επικοινωνήστε μαζί μας και θα δημιουργήσουμε μαζί την ιδανική παρουσίαση για το property σας.</p>
          <Link to="/epikoinwnia" className="btn">Επικοινωνία</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
