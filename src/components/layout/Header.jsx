import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const NAV_LINKS = [
  { to: '/', label: 'Αρχική' },
  { to: '/ypiresies', label: 'Υπηρεσίες' },
  { to: '/portfolio', label: 'Τα Έργα μας' },
  { to: '/blog', label: 'Άρθρα' },
  { to: '/epikoinwnia', label: 'Επικοινωνία' },
]

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          EveryWeb
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/checkout" className={styles.ctaBtn}>Ξεκινήστε τώρα</Link>
        </nav>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Μενού"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ''}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.dropdownLink} ${isActive ? styles.active : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <Link to="/checkout" className={styles.dropdownCta} onClick={() => setMenuOpen(false)}>
          Ξεκινήστε τώρα
        </Link>
      </div>
    </header>
  )
}
