import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src="/assets/images/logo-white.png" alt="frameflat" />
        </Link>

        <p className={styles.cta}>
          Ανακαλύψτε την απόλυτη εμπειρία στην επαγγελματική φωτογραφία ακινήτων.
          Επικοινωνήστε μαζί μας σήμερα!
        </p>

        <Link to="/epikoinwnia" className={styles.ctaBtn}>
          Επικοινωνία
        </Link>

        <div className={styles.contact}>
          <a href="tel:6942533482" className={styles.contactItem}>
            <img src="/assets/images/icon-thl-white.png" alt="Τηλέφωνο" />
            694-253-3482
          </a>
          <a href="mailto:frameflatcompany@gmail.com" className={styles.contactItem}>
            <img src="/assets/images/icon-mail-white.png" alt="Email" />
            frameflatcompany@gmail.com
          </a>
        </div>

        <div className={styles.social}>
          <a href="https://www.facebook.com/profile.php?id=61560009936690" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="/assets/images/icon-facebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/frame_flat/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/assets/images/icon-instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@frameflat" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <img src="/assets/images/icon-tiktok.png" alt="TikTok" />
          </a>
        </div>

        <p className={styles.copyright}>© {year}. All rights reserved.</p>
      </div>
    </footer>
  )
}
