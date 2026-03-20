import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Photography.module.css'

const PROJECTS = [
  {
    slug: 'cretan-fleur',
    title: 'Cretan Fleur',
    cover: '/assets/images/cretan-fleur-0.jpg',
    description: 'Φωτογράφιση καταλύματος — Ελαφόνησος',
  },
  {
    slug: 'urban-suites',
    title: 'Urban Suites',
    cover: '/assets/images/urban-suites-1.jpg',
    description: 'Φωτογράφιση χώρου — Άλιμος, Αθήνα',
  },
  {
    slug: 'athens-view',
    title: 'Athens View',
    cover: '/assets/images/athens-view-3.jpg',
    description: 'Φωτογράφιση Airbnb — Κέντρο Αθήνας',
  },
]

export default function Photography() {
  const seo = SEO.photography.el
  useScrollReveal()

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://frameflat.gr/fotografia" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://frameflat.gr/fotografia" />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="/assets/images/og-image.png" />
      </Helmet>

      <Header />

      <div className={styles.page}>
        <div className={styles.hero}>
          <h1 className="fade-up">Επαγγελματική Φωτογράφιση</h1>
          <p className="fade-up">
            Αναδεικνύουμε τον χώρο, το προϊόν ή την επιχείρησή σας
            με φωτογραφίες υψηλής ποιότητας και drone λήψεις.
          </p>
        </div>

        {/* Pricing */}
        <div className={`${styles.pricingBlock} fade-up`}>
          <div className={styles.priceCard}>
            <h2>Φωτογράφιση</h2>
            <div className={styles.priceRange}>
              <span className={styles.priceFrom}>από</span>
              <span className={styles.priceAmount}>150€</span>
              <span className={styles.priceTo}>— 300€</span>
            </div>
            <p>Η τιμή εξαρτάται από το μέγεθος του χώρου, τον αριθμό φωτογραφιών και τις ειδικές απαιτήσεις.</p>
            <ul className={styles.priceFeatures}>
              <li>Φωτογράφιση χώρων & εσωτερικών</li>
              <li>Φωτογράφιση προϊόντων & επιχειρήσεων</li>
              <li>Drone λήψεις (εναέρια φωτογράφιση)</li>
              <li>Επεξεργασία & παράδοση υψηλής ανάλυσης</li>
              <li>Ιδανικό υλικό για ιστοσελίδα & social media</li>
            </ul>
            <Link to="/epikoinwnia" className="btn">Ζητήστε Προσφορά</Link>
          </div>
        </div>

        {/* Projects as "Δείγματα δουλειάς" */}
        <div className={styles.projectsSection}>
          <h2 className="fade-up">Δείγματα δουλειάς</h2>
          <div className={styles.projectsGrid}>
            {PROJECTS.map(({ slug, title, cover, description }) => (
              <Link key={slug} to={`/${slug}`} className={`${styles.projectCard} fade-up`}>
                <img src={cover} alt={title} loading="lazy" />
                <div className={styles.projectOverlay}>
                  <span className={styles.projectTitle}>{title}</span>
                  <span className={styles.projectDesc}>{description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`${styles.cta} fade-up`}>
          <h2>Χρειάζεστε επαγγελματικές φωτογραφίες;</h2>
          <p>Επικοινωνήστε μαζί μας για να συζητήσουμε τις ανάγκες σας και να λάβετε προσφορά.</p>
          <Link to="/epikoinwnia" className="btn">Επικοινωνία</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
