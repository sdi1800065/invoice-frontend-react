import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
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

const FEATURES = [
  { title: 'Κατασκευή από το Μηδέν', desc: 'Σχεδιάζουμε και αναπτύσσουμε την ιστοσελίδα σας εξ ολοκλήρου — δωρεάν στο πλαίσιο της συνδρομής σας.' },
  { title: 'Ανανέωση & Redesign', desc: 'Έχετε ήδη ιστοσελίδα αλλά δείχνει παλιά; Την εκσυγχρονίζουμε πλήρως χωρίς επιπλέον κόστος.' },
  { title: 'Domain & Hosting', desc: 'Δικό σας domain (.gr ή .com) και hosting υψηλής ταχύτητας — όλα περιλαμβάνονται στη συνδρομή.' },
  { title: 'SSL & Ασφάλεια', desc: 'Πιστοποιητικό SSL, τακτικά backups και προστασία από απειλές — χωρίς κρυφές χρεώσεις.' },
  { title: 'SEO Βελτιστοποίηση', desc: 'On-page SEO, δομημένα δεδομένα και τεχνική βελτιστοποίηση ώστε να σας βρίσκουν στο Google.' },
]

export default function Websites() {
  useScrollReveal()

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>Υπηρεσίες Κατασκευής Ιστοσελίδων | Frameflat</title>
        <meta
          name="description"
          content="Κατασκευή ιστοσελίδων από 29,99€/μήνα + ΦΠΑ. Domain, hosting, SSL και συντήρηση περιλαμβάνονται. Δωρεάν κατασκευή ή ανανέωση υπάρχουσας ιστοσελίδας."
        />
        <meta
          name="keywords"
          content="κατασκευή ιστοσελίδων, κατασκευή website, ιστοσελίδα τιμή, φθηνή ιστοσελίδα, συνδρομητικό πακέτο website, κατασκευή site Ελλάδα, web design Ελλάδα, frameflat"
        />
        <link rel="canonical" href="https://frameflat.gr/ypiresies" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Υπηρεσίες Κατασκευής Ιστοσελίδων | Frameflat" />
        <meta
          property="og:description"
          content="Επαγγελματική ιστοσελίδα από 29,99€/μήνα + ΦΠΑ. Domain, hosting και συντήρηση περιλαμβάνονται."
        />
        <meta property="og:url" content="https://frameflat.gr/ypiresies" />
        <meta property="og:image" content="/assets/images/kastoria-preview.jpg" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Υπηρεσίες Κατασκευής Ιστοσελίδων | Frameflat" />
        <meta
          name="twitter:description"
          content="Επαγγελματική ιστοσελίδα από 29,99€/μήνα + ΦΠΑ. Domain, hosting και συντήρηση περιλαμβάνονται."
        />
        <meta name="twitter:image" content="/assets/images/kastoria-preview.jpg" />
      </Helmet>

      <Header />

      <div className={styles.page}>
        <div className={styles.hero}>
          <h1 className="fade-up">Υπηρεσίες</h1>
          <p className="fade-up">
            Αποκτήστε επαγγελματική ιστοσελίδα με συνδρομητικό πακέτο — κατασκευή ή
            ανανέωση δωρεάν, domain, hosting και συντήρηση περιλαμβάνονται.
          </p>
        </div>

        {/* Pricing card */}
        <div className={`${styles.pricingBlock} fade-up`}>
          <div className={styles.priceCard}>
            <h2>Ένα πακέτο — τα πάντα περιλαμβάνονται</h2>
            <div className={styles.priceRow}>
              <span className={styles.priceAmount}>29,99€</span>
              <span className={styles.pricePer}>/μήνα + ΦΠΑ</span>
            </div>
            <p>
              Δωρεάν κατασκευή ιστοσελίδας από το μηδέν ή πλήρης ανανέωση (redesign) της υπάρχουσας.
              Domain, hosting υψηλής ταχύτητας, SSL και SEO βελτιστοποίηση — όλα
              μέσα στη μηνιαία συνδρομή σας.
            </p>
            <ul className={styles.priceFeatures}>
              {FEATURES.map((f) => (
                <li key={f.title}>{f.title}</li>
              ))}
            </ul>
            <Link to="/epikoinwnia" className="btn">Ξεκινήστε Τώρα</Link>
          </div>
        </div>

        {/* Portfolio section */}
        <div className={styles.sectionHeader}>
          <h2 className="fade-up">Δουλειές μας</h2>
          <p className="fade-up">Ιστοσελίδες που έχουμε σχεδιάσει και κατασκευάσει για πελάτες μας.</p>
        </div>

        <div className={styles.grid}>
          {PORTFOLIO.map((site) => (
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
          <h2>Θέλετε επαγγελματική ιστοσελίδα;</h2>
          <p>Επικοινωνήστε μαζί μας και ξεκινάμε αμέσως — χωρίς αρχικό κόστος κατασκευής.</p>
          <Link to="/epikoinwnia" className="btn">Επικοινωνία</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
