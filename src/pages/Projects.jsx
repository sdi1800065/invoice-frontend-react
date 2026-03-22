import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { projectsGallery } from '../seo/structuredData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Projects.module.css'

const PHOTO_PROJECTS = [
  {
    slug: 'cretan-fleur',
    name: 'Cretan Fleur',
    description: 'Φωτογράφιση καταλύματος — Ελαφόνησος',
    image: '/assets/images/cretan-fleur-0.jpg',
    category: 'ACCOMMODATION',
  },
  {
    slug: 'urban-suites',
    name: 'Urban Suites',
    description: 'Φωτογράφιση χώρου — Άλιμος, Αθήνα',
    image: '/assets/images/urban-suites-1.jpg',
    category: 'AIRBNB',
  },
  {
    slug: 'athens-view',
    name: 'Athens View',
    description: 'Φωτογράφιση Airbnb — Κέντρο Αθήνας',
    image: '/assets/images/athens-view-3.jpg',
    category: 'AIRBNB',
  },
]

const WEBSITES = [
  {
    name: 'Central Kastoria Houses',
    url: 'https://centralkastoriahouses.gr',
    domain: 'centralkastoriahouses.gr',
    description: 'Δίγλωσση ιστοσελίδα για ενοικιαζόμενα καταλύματα στην Καστοριά. Gallery, σελίδα κρατήσεων και πλήρης SEO βελτιστοποίηση.',
    image: '/assets/images/kastoria-preview.jpg',
    category: 'ACCOMMODATION',
  },
  {
    name: 'Έδρανο',
    url: 'https://lightgreen-shrew-218540.hostingersite.com/',
    domain: 'edrano.gr',
    description: 'Ιστοσελίδα για κατάστημα επίπλων με παρουσίαση προϊόντων για οικιακούς, επαγγελματικούς και εξωτερικούς χώρους.',
    image: '/assets/images/edrano-preview.jpg',
    category: 'FURNITURE',
  },
]

export default function Projects() {
  const seo = SEO.projects.el
  useScrollReveal()

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://Everyweb.gr/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://Everyweb.gr/portfolio" />
        <meta property="og:image" content="https://Everyweb.gr/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://Everyweb.gr/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(projectsGallery)}</script>
      </Helmet>

      <Header />

      <main className={styles.page}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <span className={`${styles.badge} fade-up`}>
                <span className={styles.badgeDot} />
                Selected Case Studies
              </span>

              <h1 className="fade-up">
                Τα <em>Έργα</em> μας.
              </h1>

              <p className={`${styles.heroDesc} fade-up`}>
                Σχεδιάζουμε, κατασκευάζουμε και συντηρούμε ιστοσελίδες με μηνιαία
                συνδρομή — χωρίς προκαταβολικό κόστος. Κάθε project αντικατοπτρίζει
                τη φιλοσοφία μας για pixel-perfect σχεδιασμό και μακροχρόνια υποστήριξη.
              </p>

              <div className={`${styles.heroTags} fade-up`}>
                <span className={styles.heroTag}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  Pixel Perfect
                </span>
                <span className={styles.heroTag}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5.5 8.5L7 10L10.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  No Upfront Cost
                </span>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.microGrid} />
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className={styles.projectsSection}>
          <h2 className={`${styles.sectionTitle} fade-up`}>Επιλεγμένα Projects</h2>

          <div className={styles.projectsGrid}>
            {WEBSITES.map((site) => (
              <a
                key={site.domain}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.projectCard} fade-up`}
              >
                <div className={styles.frame}>
                  <div className={styles.bar}>
                    <div className={styles.dots}>
                      <span className={`${styles.dot} ${styles.dotRed}`} />
                      <span className={`${styles.dot} ${styles.dotYellow}`} />
                      <span className={`${styles.dot} ${styles.dotGreen}`} />
                    </div>
                    <span className={styles.domain}>{site.domain}</span>
                  </div>
                  <div className={styles.imageWrap}>
                    <img src={site.image} alt={site.name} loading="lazy" />
                    <span className={styles.categoryBadge}>{site.category}</span>
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <h3>{site.name}</h3>
                  <p>{site.description}</p>
                  <span className={styles.visitLink}>Επίσκεψη →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Photography Projects */}
        <section id="fotografia" className={styles.projectsSection}>
          <h2 className={`${styles.sectionTitle} fade-up`}>Φωτογράφιση</h2>

          <div className={styles.photoGrid}>
            {PHOTO_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                to={`/${project.slug}`}
                className={`${styles.photoCard} fade-up`}
              >
                <div className={styles.photoImageWrap}>
                  <img src={project.image} alt={project.name} loading="lazy" />
                  <span className={styles.categoryBadge}>{project.category}</span>
                </div>
                <div className={styles.cardInfo}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <span className={styles.visitLink}>Δείτε τις φωτογραφίες →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={`${styles.cta} fade-up`}>
          <div className={styles.ctaCornerTL} />
          <div className={styles.ctaCornerTR} />
          <div className={styles.ctaCornerBL} />
          <div className={styles.ctaCornerBR} />

          <div className={styles.ctaContent}>
            <h2>Είστε έτοιμοι για το δικό σας site;</h2>
            <p>
              Ξεκινήστε σήμερα με την απόλυτη ψηφιακή παρουσία.
              Χωρίς προκαταβολικό κόστος.
            </p>
            <Link to="/checkout" className={styles.ctaBtn}>
              Ξεκινήστε με €29.99/μήνα
            </Link>
            <span className={styles.ctaSmall}>
              No Upfront Cost &bull; Cancel anytime &bull; Subscription model
            </span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
