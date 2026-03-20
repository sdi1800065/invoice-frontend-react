import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { articles } from '../data/articles'
import { articleSchema } from '../seo/structuredData'
import styles from './BlogPost.module.css'

export default function BlogPost() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="page">
        <Header />
        <div className={styles.notFound}>
          <p>Το άρθρο δεν βρέθηκε.</p>
          <Link to="/blog" className="btn" style={{ marginTop: '24px' }}>← Blog</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const schema = articleSchema({
    title: article.title,
    description: article.excerpt,
    datePublished: article.datePublished,
    image: article.coverImage,
    slug: article.slug,
  })

  return (
    <div className="page">
      <Helmet>
        <html lang={article.lang} />
        <title>{article.title} | Frameflat Blog</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://frameflat.gr/blog/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={`https://frameflat.gr/blog/${article.slug}`} />
        <meta property="og:image" content={`https://frameflat.gr${article.coverImage}`} />
        <meta property="article:published_time" content={article.datePublished} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={`https://frameflat.gr${article.coverImage}`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      <div className={styles.page}>
        <div className={styles.inner}>
          <img
            src={article.coverImage}
            alt={article.title}
            className={styles.cover}
            loading="eager"
          />

          <nav className={styles.breadcrumb}>
            <Link to="/">Αρχική</Link>
            <span>›</span>
            <Link to="/blog">Blog</Link>
            <span>›</span>
            <span>{article.title}</span>
          </nav>

          <p className={styles.category}>{article.category}</p>
          <h1>{article.title}</h1>
          <time className={styles.date} dateTime={article.datePublished}>
            {new Date(article.datePublished).toLocaleDateString('el-GR', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </time>

          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          <Link to="/blog" className={styles.back}>← Πίσω στο Blog</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
