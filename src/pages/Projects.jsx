import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { projectsGallery } from '../seo/structuredData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Projects.module.css'

const WEBSITES = [
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
        <link rel="canonical" href="https://frameflat.gr/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://frameflat.gr/portfolio" />
        <meta property="og:image" content="https://frameflat.gr/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://frameflat.gr/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(projectsGallery)}</script>
      </Helmet>

      <Header />

      <div className={styles.page}>
        <div className={styles.hero}>
          <h1>Portfolio</h1>
          <p>Ιστοσελίδες που έχουμε σχεδιάσει, κατασκευάσει και συντηρούμε για πελάτες μας.</p>
        </div>

        <div className={styles.websiteGrid}>
          {WEBSITES.map((site) => (
            <a
              key={site.domain}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.websiteCard} fade-up`}
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
              <div className={styles.websiteInfo}>
                <h3>{site.name}</h3>
                <p>{site.description}</p>
                <span className={styles.visitLink}>Επίσκεψη →</span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className={`${styles.cta} fade-up`}>
          <h2>Θέλετε ιστοσελίδα για την επιχείρησή σας;</h2>
          <p>Επικοινωνήστε μαζί μας και ξεκινάμε αμέσως — χωρίς αρχικό κόστος κατασκευής.</p>
          <Link to="/epikoinwnia" className="btn">Επικοινωνία</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
