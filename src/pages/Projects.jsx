import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { projectsGallery } from '../seo/structuredData'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    slug: 'cretan-fleur',
    title: 'Cretan Fleur',
    cover: '/assets/images/cretan-fleur-0.jpg',
  },
  {
    slug: 'urban-suites',
    title: 'Urban Suites',
    cover: '/assets/images/urban-suites-1.jpg',
  },
  {
    slug: 'athens-view',
    title: 'Athens View',
    cover: '/assets/images/athens-view-3.jpg',
  },
]

export default function Projects() {
  const seo = SEO.projects.el

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://frameflat.gr/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://frameflat.gr/projects" />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(projectsGallery)}</script>
      </Helmet>

      <Header />

      <div className={styles.page}>
        <div className={styles.hero}>
          <h1>Portfolio</h1>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map(({ slug, title, cover }) => (
            <Link key={slug} to={`/${slug}`} className={styles.card}>
              <img src={cover} alt={title} loading="lazy" />
              <div className={styles.cardOverlay}>
                <span className={styles.cardTitle}>{title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
