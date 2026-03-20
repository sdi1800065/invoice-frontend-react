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
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://frameflat.gr/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://frameflat.gr/" />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(homeBusiness)}</script>
      </Helmet>

      <Header />

      <main>
        {/* Hero — side by side layout */}
        <section className={styles.hero}>
          <p className={styles.heroTag}>Web Design & Maintenance</p>
          <h1 className={styles.heroTitle}>
            Η ιστοσελίδα που χρειάζεται η επιχείρησή σας — σχεδιασμός, κατασκευή και συντήρηση σε ένα πακέτο.
          </h1>
          <div className={styles.heroSplit}>
            <div className={styles.heroContent}>
              <div className={styles.heroCard}>
                <div className={styles.heroPrice}>
                  <span className={styles.priceAmount}>29,99€</span>
                  <span className={styles.pricePer}>/μήνα + ΦΠΑ</span>
                </div>
                <p className={styles.heroSub}>
                  Δωρεάν κατασκευή ή redesign. Domain, hosting, SEO και SSL περιλαμβάνονται.
                </p>
                <div className={styles.heroBtns}>
                  <Link to="/ypiresies" className="btn">Δείτε τα Πακέτα</Link>
                  <Link to="/epikoinwnia" className={`btn ${styles.btnOutline}`}>Επικοινωνία</Link>
                </div>
              </div>
            </div>
            <div className={styles.heroMockup}>
              <Link to="/portfolio" className={styles.mockupLink}>
                <div className={styles.mockupBrowser}>
                  <div className={styles.mockupBar}>
                    <span className={styles.mockupDot} />
                    <span className={styles.mockupDot} />
                    <span className={styles.mockupDot} />
                    <span className={styles.mockupUrl}>edrano.gr</span>
                  </div>
                  <img
                    src="/assets/images/edrano-preview.jpg"
                    alt="Δείγμα ιστοσελίδας — Έδρανο, κατασκευασμένη από Frameflat"
                    loading="eager"
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className={styles.included}>
          <div className={styles.includedInner}>
            <h2 className="fade-up">Τι περιλαμβάνεται</h2>
            <div className={styles.includedGrid}>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>Κατασκευή Ιστοσελίδας</h3>
                  <p>Δωρεάν κατασκευή από το μηδέν ή πλήρης ανανέωση της υπάρχουσας.</p>
                </div>
              </div>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>Domain & Hosting</h3>
                  <p>Δικό σας domain (.gr / .com) και hosting υψηλής ταχύτητας.</p>
                </div>
              </div>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>SSL & Ασφάλεια</h3>
                  <p>Πιστοποιητικό SSL, backups και προστασία από απειλές.</p>
                </div>
              </div>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>SEO Βελτιστοποίηση</h3>
                  <p>On-page SEO και δομημένα δεδομένα για κατάταξη στο Google.</p>
                </div>
              </div>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>Mobile-First Σχεδιασμός</h3>
                  <p>Responsive σχεδιασμός που δουλεύει τέλεια σε κάθε συσκευή.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={styles.process}>
          <h2 className="fade-up">Πώς δουλεύουμε</h2>
          <div className={styles.processGrid}>
            <div className={`${styles.processStep} fade-up`}>
              <span className={styles.stepNum}>01</span>
              <h3>Συζήτηση & Σχεδιασμός</h3>
              <p>Μαθαίνουμε τις ανάγκες της επιχείρησής σας και σχεδιάζουμε τη δομή και την αισθητική της ιστοσελίδας.</p>
            </div>
            <div className={`${styles.processStep} fade-up`}>
              <span className={styles.stepNum}>02</span>
              <h3>Κατασκευή & Ανάπτυξη</h3>
              <p>Δημιουργούμε την ιστοσελίδα σας με καθαρό κώδικα, responsive σχεδιασμό και βελτιστοποίηση SEO.</p>
            </div>
            <div className={`${styles.processStep} fade-up`}>
              <span className={styles.stepNum}>03</span>
              <h3>Παράδοση & Συντήρηση</h3>
              <p>Η ιστοσελίδα σας γίνεται live και εμείς αναλαμβάνουμε τη συνεχή συντήρηση.</p>
            </div>
          </div>
        </section>

        {/* Website portfolio showcase */}
        <section className={styles.portfolioSection}>
          <h2 className="fade-up">Ιστοσελίδες που κατασκευάσαμε</h2>
          <div className={styles.portfolioGrid}>
            <a
              href="https://centralkastoriahouses.gr"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.portfolioCard} fade-up`}
            >
              <div className={styles.browserBar}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.browserUrl}>centralkastoriahouses.gr</span>
              </div>
              <img
                src="/assets/images/kastoria-preview.jpg"
                alt="Central Kastoria Houses — Website by Frameflat"
                loading="lazy"
              />
              <div className={styles.portfolioInfo}>
                <h3>Central Kastoria Houses</h3>
                <p>Ενοικιαζόμενα καταλύματα — Καστοριά</p>
              </div>
            </a>
            <a
              href="https://lightgreen-shrew-218540.hostingersite.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.portfolioCard} fade-up`}
            >
              <div className={styles.browserBar}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.browserUrl}>edrano.gr</span>
              </div>
              <img
                src="/assets/images/edrano-preview.jpg"
                alt="Έδρανο — Website by Frameflat"
                loading="lazy"
              />
              <div className={styles.portfolioInfo}>
                <h3>Έδρανο</h3>
                <p>Κατάστημα επίπλων</p>
              </div>
            </a>
          </div>
          <div className={styles.portfolioCta}>
            <Link to="/portfolio" className={`btn ${styles.btnOutline}`}>Δείτε Όλα τα Projects</Link>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={`${styles.ctaContent} fade-up`}>
            <h2>Έτοιμοι να ξεκινήσετε;</h2>
            <p>
              Επικοινωνήστε μαζί μας σήμερα και αποκτήστε επαγγελματική ιστοσελίδα
              χωρίς αρχικό κόστος κατασκευής.
            </p>
            <Link to="/epikoinwnia" className="btn">Επικοινωνία</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
