import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { articles } from '../data/articles'
import { SEO } from '../seo/meta'
import { blogListSchema } from '../seo/structuredData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Blog.module.css'

export default function Blog() {
  const seo = SEO.blog.el
  useScrollReveal()

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://everyweb.gr/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://everyweb.gr/blog" />
        <meta property="og:image" content="https://everyweb.gr/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://everyweb.gr/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(blogListSchema(articles))}</script>
      </Helmet>

      <Header />

      <div className={styles.page}>
        {/* Hero / Header Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <span className={styles.label}>Knowledge Base</span>
              <h1 className={styles.heading}>
                Άρθρα &amp; <em>Στρατηγικές</em> για Μικρομεσαίες Επιχειρήσεις
              </h1>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.searchBox}>
                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Αναζήτηση άρθρων..."
                  readOnly
                />
              </div>
            </div>
          </div>

        </section>

        {/* Article Grid */}
        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {articles.map((article) => (
              <article key={article.slug} className={`${styles.card} fade-up`}>
                <Link to={`/blog/${article.slug}`} className={styles.cardImageWrap}>
                  <span className={styles.cardBadge}>{article.category}</span>
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                  />
                </Link>

                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>
                    <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>

                  <div className={styles.cardMeta}>
                    <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <span className={styles.metaLabel}>{article.category}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={`${styles.newsletter} fade-up`}>
          <div className={styles.newsletterInner}>
            <div className={styles.newsletterPattern} aria-hidden="true" />
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle}>Εγγραφείτε στο Newsletter μας</h2>
              <p className={styles.newsletterDesc}>
                Λάβετε πρώτοι τα νέα μας άρθρα, συμβουλές και στρατηγικές απευθείας στο inbox σας.
              </p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  className={styles.newsletterInput}
                  placeholder="Το email σας..."
                  readOnly
                />
                <button type="button" className={styles.newsletterBtn}>ΕΓΓΡΑΦΗ</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
