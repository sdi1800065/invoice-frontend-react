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
        {/* Hero */}
        <section className={styles.hero}>
          <img
            src="/assets/images/hero-front.jpg"
            alt="Επαγγελματική φωτογράφιση ακινήτων"
            className={styles.heroBg}
            loading="eager"
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Αναδείξτε το ακίνητό σας με επαγγελματικές φωτογραφίες και εξατομικευμένες ιστοσελίδες.
            </h1>
            <Link to="/projects" className="btn">Εξερευνήστε</Link>
          </div>
        </section>

        {/* Why Frameflat */}
        <section className={styles.why}>
          <div className={`${styles.whyText} fade-up`}>
            <h2>Γιατί να επιλέξετε την frameflat</h2>
            <p>
              Στη Frameflat, προσφέρουμε κορυφαία φωτογράφιση ακινήτων, αναδεικνύοντας τις
              ιδιοκτησίες σας με τον καλύτερο τρόπο. Είτε είστε μεσίτης είτε ιδιοκτήτης,
              οι εικόνες μας μαγνητίζουν και προσελκύουν άμεσα αγοραστές ή ενοικιαστές.
            </p>
            <p>
              Στη Frameflat, πιστεύουμε στη δύναμη του μινιμαλισμού και των καθαρών εικόνων.
              Αναδεικνύουμε την ομορφιά μέσα από την απλότητα των γραμμών, επιτρέποντας στο
              αντικείμενο να ξεχωρίσει χωρίς περιττές λεπτομέρειες.
            </p>
          </div>
          <div className={`${styles.whyImage} fade-up`}>
            <img
              src="/assets/images/portfolio-photo-14.jpg"
              alt="Frameflat photography aesthetic"
              loading="lazy"
            />
          </div>
        </section>

        {/* Aesthetic tag */}
        <div className={styles.aesthetic}>
          <h3>Αισθητική frameflat</h3>
        </div>

        {/* Services */}
        <section className={styles.services}>
          <div className={`${styles.serviceCard} fade-up`}>
            <img src="/assets/images/service-camera.png" alt="Φωτογράφιση" />
            <h3>Φωτογράφιση</h3>
          </div>
          <div className={`${styles.serviceCard} fade-up`}>
            <img src="/assets/images/service-drone.png" alt="Drone" />
            <h3>Drone</h3>
          </div>
          <div className={`${styles.serviceCard} fade-up`}>
            <img src="/assets/images/service-web.png" alt="Ιστοσελίδα" />
            <h3>Ιστοσελίδα</h3>
          </div>
        </section>

        {/* Drone section */}
        <section className={styles.drone}>
          <img
            src="/assets/images/portfolio-drone.jpg"
            alt="Αεροφωτογράφιση ακινήτων"
            className={styles.droneBg}
            loading="lazy"
          />
          <div className={styles.droneOverlay} />
          <div className={styles.droneContent}>
            <h2>Αποκτήστε εντυπωσιακές φωτογραφίες και βίντεο από Drone</h2>
            <p>
              Οι αεροφωτογραφίες προσφέρουν μια μοναδική προοπτική και αποτυπώνουν την απόλυτη
              ομορφιά του ακινήτου σας, εντυπωσιάζοντας τους πιθανούς αγοραστές.
            </p>
          </div>
        </section>

        {/* Website promo */}
        <section className={styles.websitePromo}>
          <a
            href="https://centralkastoriahouses.gr"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.websitePreviewFrame} fade-up`}
          >
            <div className={styles.websitePreviewBar}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.websitePreviewUrl}>centralkastoriahouses.gr</span>
            </div>
            <img
              src="/assets/images/kastoria-preview.jpg"
              alt="Central Kastoria Houses — Website by frameflat"
              loading="lazy"
            />
          </a>
          <div className={`${styles.websitePromoText} fade-up`}>
            <h2>Αναδείξτε το ακίνητο σας με μια εξατομικευμένη ιστοσελίδα!</h2>
            <p>
              Central Kastoria Houses, Website by frameflat
            </p>
            <div className={styles.websitePromoBtns}>
              <a
                href="https://centralkastoriahouses.gr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Δείτε την ιστοσελίδα
              </a>
              <Link to="/epikoinwnia" className="btn">Επικοινωνία</Link>
            </div>
          </div>
        </section>

        {/* Showcase */}
        <section className={styles.showcase}>
          <img
            src="/assets/images/portfolio-hdr-2.jpg"
            alt="Επαγγελματική φωτογράφιση ακινήτων"
            className={styles.showcaseBg}
            loading="lazy"
          />
          <div className={styles.showcaseOverlay} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
