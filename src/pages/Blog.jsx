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
        <link rel="canonical" href="https://frameflat.gr/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://frameflat.gr/blog" />
        <meta property="og:image" content="https://frameflat.gr/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="https://frameflat.gr/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(blogListSchema(articles))}</script>
      </Helmet>

      <Header />

      <div className={styles.page}>
        <div className={styles.heroWrap}>
          <div className={styles.hero}>
            <h1>Άρθρα</h1>
            <p>Συμβουλές και γνώσεις για ιστοσελίδες, SEO, web design και online παρουσία επιχειρήσεων.</p>
          </div>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <article key={article.slug} className={`${styles.card} fade-up`}>
              <Link to={`/blog/${article.slug}`}>
                <img src={article.coverImage} alt={article.title} />
              </Link>
              <span className={styles.category}>{article.category}</span>
              <h2><Link to={`/blog/${article.slug}`}>{article.title}</Link></h2>
              <p className={styles.excerpt}>{article.excerpt}</p>
              <time className={styles.date} dateTime={article.datePublished}>
                {new Date(article.datePublished).toLocaleDateString('el-GR', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </time>
            </article>
          ))}
        </div>

        <div className={`${styles.cta} fade-up`}>
          <h2>Χρειάζεστε ιστοσελίδα;</h2>
          <p>Δείτε τα πακέτα μας ή επικοινωνήστε μαζί μας — ξεκινάμε χωρίς αρχικό κόστος.</p>
          <Link to="/istoselides" className="btn">Ιστοσελίδες</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
