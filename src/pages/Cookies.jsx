import { Helmet } from 'react-helmet-async'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import styles from './Legal.module.css'

export default function Cookies() {
  return (
    <div className="page">
      <Helmet>
        <html lang="el" />
        <title>Πολιτική Cookies | EveryWeb</title>
        <meta name="description" content="Πολιτική cookies της EveryWeb. Μάθετε ποια cookies χρησιμοποιούμε και πώς μπορείτε να τα διαχειριστείτε." />
        <link rel="canonical" href="https://Everyweb.gr/cookies" />
      </Helmet>

      <Header />

      <main className={styles.page}>
        <div className={styles.content}>
          <h1>Πολιτική Cookies</h1>
          <p className={styles.updated}>Τελευταία ενημέρωση: 22 Μαρτίου 2026</p>

          <h2>1. Τι Είναι τα Cookies</h2>
          <p>
            Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας
            κατά την επίσκεψη μιας ιστοσελίδας. Χρησιμοποιούνται για τη σωστή λειτουργία
            του site και τη βελτίωση της εμπειρίας πλοήγησης.
          </p>

          <h2>2. Cookies που Χρησιμοποιούμε</h2>

          <p><strong>Απαραίτητα Cookies</strong></p>
          <p>
            Είναι απολύτως αναγκαία για τη λειτουργία της ιστοσελίδας. Χωρίς αυτά,
            βασικές λειτουργίες όπως η πλοήγηση και η πρόσβαση σε ασφαλείς περιοχές
            δεν θα λειτουργούν σωστά. Δεν απαιτούν συγκατάθεση.
          </p>

          <p><strong>Cookies Stripe</strong></p>
          <p>
            Κατά τη διαδικασία πληρωμής, η Stripe τοποθετεί cookies για την ασφαλή
            επεξεργασία συναλλαγών και την πρόληψη απάτης.
          </p>

          <p><strong>Cookies Ανάλυσης</strong></p>
          <p>
            Χρησιμοποιούμε cookies για τη συλλογή ανώνυμων στατιστικών επισκεψιμότητας
            ώστε να βελτιώνουμε την ιστοσελίδα μας.
          </p>

          <h2>3. Διαχείριση Cookies</h2>
          <p>
            Μπορείτε να διαχειριστείτε ή να απενεργοποιήσετε τα cookies μέσω των
            ρυθμίσεων του browser σας. Σημειώστε ότι η απενεργοποίηση ορισμένων cookies
            ενδέχεται να επηρεάσει τη λειτουργικότητα της ιστοσελίδας.
          </p>
          <ul>
            <li><strong>Chrome:</strong> Ρυθμίσεις → Απόρρητο και ασφάλεια → Cookies</li>
            <li><strong>Firefox:</strong> Ρυθμίσεις → Απόρρητο & Ασφάλεια → Cookies</li>
            <li><strong>Safari:</strong> Προτιμήσεις → Απόρρητο → Cookies</li>
          </ul>

          <h2>4. Επικοινωνία</h2>
          <p>
            Για ερωτήσεις σχετικά με τα cookies, επικοινωνήστε μαζί μας
            στο <a href="mailto:info@everyweb.gr">info@everyweb.gr</a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
