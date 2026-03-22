import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Lightbox from '../components/Lightbox'
import styles from './ProjectPage.module.css'

export default function ProjectPage({ title, description, images, seoTitle, seoDescription, seoKeywords, canonical }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const handlePrev = () =>
    setLightboxIndex((i) => (i - 1 + images.length) % images.length)
  const handleNext = () =>
    setLightboxIndex((i) => (i + 1) % images.length)

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={images[0]?.src ? `https://Everyweb.gr${images[0].src}` : 'https://Everyweb.gr/assets/images/og-image.png'} />
        <meta property="og:locale" content="el_GR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={images[0]?.src ? `https://Everyweb.gr${images[0].src}` : 'https://Everyweb.gr/assets/images/og-image.png'} />
      </Helmet>

      <Header />

      <div className={styles.page}>
        <div className={styles.hero}>
          <Link to="/fotografia" className={styles.backLink}>← Πίσω στη Φωτογράφιση</Link>
          <span className={styles.badge}>Επαγγελματική Φωτογράφιση</span>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>

        <div className={styles.gallery}>
          {images.map((img, i) => (
            <div
              key={img.src}
              className={styles.galleryItem}
              onClick={() => setLightboxIndex(i)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      <Footer />
    </div>
  )
}
