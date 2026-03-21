import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { SEO } from '../seo/meta'
import { homeBusiness } from '../seo/structuredData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Home.module.css'

export default function Home() {
  const seo = SEO.home.el
  useScrollReveal()

  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href="https://frameflat.gr/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content="https://frameflat.gr/" />
        <meta property="og:image" content="/assets/images/og-image.png" />
        <meta property="og:locale" content="el_GR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content="/assets/images/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(homeBusiness)}</script>
      </Helmet>

      <Header />

      <main>
        {/* Hero — side by side layout */}
        <section className={styles.hero}>
          <p className={styles.heroTag}>Web Design & Maintenance</p>
          <h1 className={styles.heroTitle}>
            Η ιστοσελίδα που χρειάζεται η επιχείρησή σας — σχεδιασμός, κατασκευή και συντήρηση σε ένα πακέτο.
          </h1>
          <div className={styles.heroSplit}>
            <div className={styles.heroMockup}>
              <Link to="/portfolio" className={styles.mockupLink}>
                <div className={styles.mockupBrowser}>
                  <div className={styles.mockupBar}>
                    <span className={styles.mockupDot} />
                    <span className={styles.mockupDot} />
                    <span className={styles.mockupDot} />
                    <span className={styles.mockupUrl}>edrano.gr</span>
                  </div>
                  <img
                    src="/assets/images/edrano-preview.jpg"
                    alt="Δείγμα ιστοσελίδας — Έδρανο, κατασκευασμένη από Frameflat"
                    loading="eager"
                  />
                </div>
              </Link>
            </div>
            <div className={styles.heroContent}>
              <div className={styles.heroCard}>
                <div className={styles.heroPrice}>
                  <span className={styles.priceAmount}>29,99€</span>
                  <span className={styles.pricePer}>/μήνα + ΦΠΑ</span>
                </div>
                <p className={styles.heroSub}>
                  Δωρεάν κατασκευή ή redesign. Domain, hosting, SEO και SSL περιλαμβάνονται.
                </p>
                <div className={styles.heroBtns}>
                  <Link to="/ypiresies" className="btn">Δείτε τα Πακέτα</Link>
                  <Link to="/epikoinwnia" className={`btn ${styles.btnOutline}`}>Επικοινωνία</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className={styles.included}>
          <div className={styles.includedInner}>
            <h2 className="fade-up">Τι περιλαμβάνεται</h2>
            <div className={styles.includedGrid}>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>Κατασκευή Ιστοσελίδας</h3>
                  <p>Δωρεάν κατασκευή από το μηδέν ή πλήρης ανανέωση της υπάρχουσας.</p>
                </div>
              </div>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>Domain & Hosting</h3>
                  <p>Δικό σας domain (.gr / .com) και hosting υψηλής ταχύτητας.</p>
                </div>
              </div>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>SSL & Ασφάλεια</h3>
                  <p>Πιστοποιητικό SSL, backups και προστασία από απειλές.</p>
                </div>
              </div>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>SEO Βελτιστοποίηση</h3>
                  <p>On-page SEO και δομημένα δεδομένα για κατάταξη στο Google.</p>
                </div>
              </div>
              <div className={`${styles.includedItem} fade-up`}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <h3>Mobile-First Σχεδιασμός</h3>
                  <p>Responsive σχεδιασμός που δουλεύει τέλεια σε κάθε συσκευή.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ηλεκτρονική Τιμολόγηση highlight */}
        <section className={styles.invoicingHighlight}>
          <div className={styles.invoicingSplit}>
            <div className={`${styles.invoicingPreview} fade-up`}>
              <div className={styles.previewBrowser}>
                <div className={styles.previewBar}>
                  <span className={styles.previewDot} />
                  <span className={styles.previewDot} />
                  <span className={styles.previewDot} />
                  <span className={styles.previewUrl}>yourdomain.gr/admin</span>
                </div>
                <div className={styles.mockAdmin}>
                  <div className={styles.mockSidebar}>
                    <div className={styles.mockSidebarTitle}>Invoice Admin</div>
                    <div className={styles.mockNavItem}>Επιχειρήσεις</div>
                    <div className={styles.mockNavItem}>Ιδιώτες</div>
                    <div className={`${styles.mockNavItem} ${styles.mockNavActive}`}>Παραστατικά</div>
                    <div className={styles.mockNavItem}>Πληρωμές</div>
                    <div className={styles.mockNavItem}>Ακυρώσεις</div>
                    <div className={styles.mockNavItem}>Failed Attempts</div>
                  </div>
                  <div className={styles.mockContent}>
                    <div className={styles.mockPageTitle}>Παραστατικά</div>
                    <div className={styles.mockTabs}>
                      <span className={styles.mockTabActive}>Τιμολόγια</span>
                      <span className={styles.mockTab}>Αποδείξεις</span>
                    </div>
                    <table className={styles.mockTable}>
                      <thead>
                        <tr>
                          <th>ΑΡΙΘΜΟΣ</th>
                          <th>ΠΕΛΑΤΗΣ</th>
                          <th>ΗΜΕΡΟΜΗΝΙΑ</th>
                          <th>ΣΥΝΟΛΟ</th>
                          <th>ΜΑΡΚ</th>
                          <th>ΚΑΤΑΣΤΑΣΗ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>A2026-0047</td>
                          <td>Κωστόπουλος ΙΚΕ</td>
                          <td>20/03/2026</td>
                          <td>49,60 €</td>
                          <td className={styles.mockMark}>400019607...</td>
                          <td><span className={styles.mockBadgeGreen}>ΕΝΕΡΓΟ</span></td>
                        </tr>
                        <tr>
                          <td>A2026-0046</td>
                          <td>Νικολάου & Σια ΟΕ</td>
                          <td>19/03/2026</td>
                          <td>26,55 €</td>
                          <td className={styles.mockMark}>400019608...</td>
                          <td><span className={styles.mockBadgeGreen}>ΕΝΕΡΓΟ</span></td>
                        </tr>
                        <tr>
                          <td>A2026-0045</td>
                          <td>Παπαδάκης ΕΠΕ</td>
                          <td>18/03/2026</td>
                          <td>37,19 €</td>
                          <td className={styles.mockMark}>400019605...</td>
                          <td><span className={styles.mockBadgeGreen}>ΕΝΕΡΓΟ</span></td>
                        </tr>
                        <tr>
                          <td>A2026-0044</td>
                          <td>Δημητρίου ΑΕ</td>
                          <td>17/03/2026</td>
                          <td>49,60 €</td>
                          <td className={styles.mockMark}>400019603...</td>
                          <td><span className={styles.mockBadgeRed}>ΑΚΥΡΩΘΗΚΕ</span></td>
                        </tr>
                        <tr>
                          <td>A2026-0043</td>
                          <td>Αντωνίου ΙΚΕ</td>
                          <td>16/03/2026</td>
                          <td>26,55 €</td>
                          <td className={styles.mockMark}>400019601...</td>
                          <td><span className={styles.mockBadgeGreen}>ΕΝΕΡΓΟ</span></td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={styles.mockFooter}>5 τιμολόγια — Σελίδα 1 από 10</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.invoicingCard}>
              <span className={`${styles.invoicingLabel} fade-up`}>Νέα Υπηρεσία</span>
              <h2 className="fade-up">Ηλεκτρονική Τιμολόγηση</h2>
              <div className={`${styles.invoicingPrice} fade-up`}>
                <span className={styles.invoicingAmount}>19,99€</span>
                <span className={styles.invoicingPer}>/μήνα + ΦΠΑ</span>
              </div>
              <p className={`${styles.invoicingDesc} fade-up`}>
                Αυτόματη έκδοση τιμολογίων και αποδείξεων μέσω πιστοποιημένου παρόχου ΑΑΔΕ.
              </p>
              <div className={`${styles.invoicingFeatures} fade-up`}>
                <div className={styles.invoicingFeature}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>Πιστοποιημένος Πάροχος ΑΑΔΕ</span>
                </div>
                <div className={styles.invoicingFeature}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>Stripe Πληρωμές</span>
                </div>
                <div className={styles.invoicingFeature}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>Admin Dashboard</span>
                </div>
                <div className={styles.invoicingFeature}>
                  <span className={styles.featureCheck}>✓</span>
                  <span>PDF & Email Αποστολή</span>
                </div>
              </div>
              <Link to="/ypiresies" className="btn fade-up">Μάθετε Περισσότερα</Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={styles.process}>
          <h2 className="fade-up">Πώς δουλεύουμε</h2>
          <div className={styles.processGrid}>
            <div className={`${styles.processStep} fade-up`}>
              <span className={styles.stepNum}>01</span>
              <h3>Συζήτηση & Σχεδιασμός</h3>
              <p>Μαθαίνουμε τις ανάγκες της επιχείρησής σας και σχεδιάζουμε τη δομή και την αισθητική της ιστοσελίδας.</p>
            </div>
            <div className={`${styles.processStep} fade-up`}>
              <span className={styles.stepNum}>02</span>
              <h3>Κατασκευή & Ανάπτυξη</h3>
              <p>Δημιουργούμε την ιστοσελίδα σας με καθαρό κώδικα, responsive σχεδιασμό και βελτιστοποίηση SEO.</p>
            </div>
            <div className={`${styles.processStep} fade-up`}>
              <span className={styles.stepNum}>03</span>
              <h3>Παράδοση & Συντήρηση</h3>
              <p>Η ιστοσελίδα σας γίνεται live και εμείς αναλαμβάνουμε τη συνεχή συντήρηση.</p>
            </div>
          </div>
        </section>

        {/* Website portfolio showcase */}
        <section className={styles.portfolioSection}>
          <h2 className="fade-up">Ιστοσελίδες που κατασκευάσαμε</h2>
          <div className={styles.portfolioGrid}>
            <a
              href="https://centralkastoriahouses.gr"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.portfolioCard} fade-up`}
            >
              <div className={styles.browserBar}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.browserUrl}>centralkastoriahouses.gr</span>
              </div>
              <img
                src="/assets/images/kastoria-preview.jpg"
                alt="Central Kastoria Houses — Website by Frameflat"
                loading="lazy"
              />
              <div className={styles.portfolioInfo}>
                <h3>Central Kastoria Houses</h3>
                <p>Ενοικιαζόμενα καταλύματα — Καστοριά</p>
              </div>
            </a>
            <a
              href="https://lightgreen-shrew-218540.hostingersite.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.portfolioCard} fade-up`}
            >
              <div className={styles.browserBar}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.browserUrl}>edrano.gr</span>
              </div>
              <img
                src="/assets/images/edrano-preview.jpg"
                alt="Έδρανο — Website by Frameflat"
                loading="lazy"
              />
              <div className={styles.portfolioInfo}>
                <h3>Έδρανο</h3>
                <p>Κατάστημα επίπλων</p>
              </div>
            </a>
          </div>
          <div className={styles.portfolioCta}>
            <Link to="/portfolio" className={`btn ${styles.btnOutline}`}>Δείτε Όλα τα Projects</Link>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={`${styles.ctaContent} fade-up`}>
            <h2>Έτοιμοι να ξεκινήσετε;</h2>
            <p>
              Επικοινωνήστε μαζί μας σήμερα και αποκτήστε επαγγελματική ιστοσελίδα
              χωρίς αρχικό κόστος κατασκευής.
            </p>
            <Link to="/epikoinwnia" className="btn">Επικοινωνία</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
