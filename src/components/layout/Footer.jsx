import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Left: logo + copyright */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            EveryWeb
          </Link>
          <p className={styles.copyright}>
            &copy; {year} EveryWeb. Σχεδιασμένο για Επιτυχία.
          </p>
          <div className={styles.contact}>
            <a href="tel:6942533482" className={styles.contactItem}>
              694-253-3482
            </a>
            <a href="mailto:info@everyweb.gr" className={styles.contactItem}>
              info@everyweb.gr
            </a>
          </div>
        </div>

        {/* Center: nav links */}
        <nav className={styles.links}>
          <Link to="/terms">Όροι Χρήσης</Link>
          <Link to="/privacy">Πολιτική Απορρήτου</Link>
          <Link to="/cookies">Cookies</Link>
        </nav>

        {/* Right: social icons */}
        <div className={styles.social}>
          <a
            href="https://www.facebook.com/profile.php?id=61560009936690"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={styles.socialIcon}
          >
            <img src="/assets/images/icon-facebook.png" alt="Facebook" />
          </a>
          <a
            href="https://www.instagram.com/every_web/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={styles.socialIcon}
          >
            <img src="/assets/images/icon-instagram.png" alt="Instagram" />
          </a>
          <a
            href="https://www.tiktok.com/@Everyweb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className={styles.socialIcon}
          >
            <img src="/assets/images/icon-tiktok.png" alt="TikTok" />
          </a>
        </div>
      </div>
    </footer>
  )
}
