import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import styles from './Checkout.module.css'

const PRODUCTS = {
  webdesign: { label: 'Web Design & Maintenance', net: 29.99, gross: 37.19 },
  invoicing: { label: 'Ηλεκτρονική Τιμολόγηση', net: 19.99, gross: 24.79 },
}
const BUNDLE_GROSS = 61.98

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const paymentMode = searchParams.get('mode') === 'payment' ? 'payment' : 'subscription'

  const [step, setStep] = useState(1)
  const [selectedProducts, setSelectedProducts] = useState({ webdesign: false, invoicing: false })
  const [currentType, setCurrentType] = useState(null)
  const [email, setEmail] = useState('')
  const [afm, setAfm] = useState('')
  const [error, setError] = useState('')
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [afmInvalid, setAfmInvalid] = useState(false)
  const [busy, setBusy] = useState(false)
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  const pageTitle = paymentMode === 'payment' ? 'Πληρωμή — Frameflat' : 'Συνδρομή — Frameflat'

  const hasSelection = selectedProducts.webdesign || selectedProducts.invoicing
  const bothSelected = selectedProducts.webdesign && selectedProducts.invoicing

  const totalGross = bothSelected
    ? BUNDLE_GROSS
    : selectedProducts.webdesign
      ? PRODUCTS.webdesign.gross
      : selectedProducts.invoicing
        ? PRODUCTS.invoicing.gross
        : 0

  const productKey = bothSelected
    ? 'bundle'
    : selectedProducts.webdesign
      ? 'webdesign'
      : 'invoicing'

  const toggleProduct = useCallback((key) => {
    setSelectedProducts(prev => ({ ...prev, [key]: !prev[key] }))
    setError('')
  }, [])

  const goToDocType = useCallback(() => {
    if (!hasSelection) {
      setError('Παρακαλώ επιλέξτε τουλάχιστον μία υπηρεσία.')
      return
    }
    setStep(2)
    setError('')
  }, [hasSelection])

  const goToForm = useCallback((type) => {
    setCurrentType(type)
    setStep(3)
    setError('')
  }, [])

  const goBack = useCallback(() => {
    if (step === 3) {
      setStep(2)
      setCurrentType(null)
    } else {
      setStep(1)
    }
    setError('')
  }, [step])

  const handleSubmit = useCallback(async () => {
    if (busy) return
    setError('')

    const trimmedEmail = email.trim()
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailInvalid(true)
      setError('Παρακαλώ συμπληρώστε ένα έγκυρο email.')
      return
    }
    setEmailInvalid(false)

    if (currentType === 'invoice') {
      const trimmedAfm = afm.trim()
      if (!trimmedAfm || !/^\d{9}$/.test(trimmedAfm)) {
        setAfmInvalid(true)
        setError('Το ΑΦΜ πρέπει να αποτελείται από 9 ψηφία.')
        return
      }
      setAfmInvalid(false)
    }

    setBusy(true)

    try {
      const payload = { email: trimmedEmail, invoiceType: currentType, paymentMode, product: productKey }
      if (currentType === 'invoice') payload.afm = afm.trim()

      const res = await fetch('/api/begin-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.')
        setBusy(false)
        return
      }

      if (data.alreadySubscribed) {
        setAlreadySubscribed(true)
        return
      }

      let stripeUrl
      try {
        stripeUrl = new URL(data.url)
      } catch {
        stripeUrl = null
      }
      if (!stripeUrl || stripeUrl.origin !== 'https://checkout.stripe.com') {
        setError('Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.')
        setBusy(false)
        return
      }
      window.location.href = data.url
    } catch (err) {
      const msg = err instanceof TypeError
        ? 'Αδυναμία σύνδεσης. Ελέγξτε τη σύνδεσή σας στο internet.'
        : 'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.'
      setError(msg)
      setBusy(false)
    }
  }, [busy, email, afm, currentType, paymentMode, productKey])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleSubmit()
  }, [handleSubmit])

  return (
    <div className="page">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Header />
      <main className={styles.wrapper}>
        <div className={styles.checkout}>

        {/* Step 1: product selection */}
        {step === 1 && (
          <div>
            <div className={styles.stepTitle}>Επιλέξτε υπηρεσίες</div>
            <div className={styles.productCards}>
              <label className={`${styles.productCard} ${selectedProducts.webdesign ? styles.productCardSelected : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedProducts.webdesign}
                  onChange={() => toggleProduct('webdesign')}
                  className={styles.productCheckbox}
                />
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{PRODUCTS.webdesign.label}</div>
                  <div className={styles.productPrice}>
                    {PRODUCTS.webdesign.net.toFixed(2).replace('.', ',')}€ + 24% ΦΠΑ = <strong>{PRODUCTS.webdesign.gross.toFixed(2).replace('.', ',')}€</strong> / μήνα
                  </div>
                </div>
              </label>
              <label className={`${styles.productCard} ${selectedProducts.invoicing ? styles.productCardSelected : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedProducts.invoicing}
                  onChange={() => toggleProduct('invoicing')}
                  className={styles.productCheckbox}
                />
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{PRODUCTS.invoicing.label}</div>
                  <div className={styles.productPrice}>
                    {PRODUCTS.invoicing.net.toFixed(2).replace('.', ',')}€ + 24% ΦΠΑ = <strong>{PRODUCTS.invoicing.gross.toFixed(2).replace('.', ',')}€</strong> / μήνα
                  </div>
                </div>
              </label>
            </div>

            {hasSelection && (
              <div className={styles.totalBar}>
                <span>Σύνολο:</span>
                <strong>{totalGross.toFixed(2).replace('.', ',')}€ / μήνα</strong>
              </div>
            )}

            {error && <div className={styles.globalError}>{error}</div>}

            <button
              type="button"
              className={styles.submitBtn}
              onClick={goToDocType}
              disabled={!hasSelection}
            >
              Συνέχεια →
            </button>
          </div>
        )}

        {/* Step 2: document type selection */}
        {step === 2 && (
          <div>
            <button type="button" className={styles.backLink} onClick={goBack}>
              ← Αλλαγή υπηρεσιών
            </button>
            <div className={styles.stepTitle}>Τύπος παραστατικού</div>
            <div className={styles.typeCards}>
              <div className={styles.typeCard} onClick={() => goToForm('receipt')}>
                <div className={styles.typeInfo}>
                  <div className={styles.typeName}>Απόδειξη</div>
                  <div className={styles.typeDesc}>Για ιδιώτες</div>
                </div>
                <span className={styles.typeIcon}>🧾</span>
              </div>
              <div className={styles.typeCard} onClick={() => goToForm('invoice')}>
                <div className={styles.typeInfo}>
                  <div className={styles.typeName}>Τιμολόγιο</div>
                  <div className={styles.typeDesc}>Για επιχειρήσεις — εκδίδεται τιμολόγιο στην ΑΑΔΕ</div>
                </div>
                <span className={styles.typeIcon}>📄</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: form */}
        {step === 3 && !alreadySubscribed && (
          <div>
          <div className={styles.formHeader}>
            <button type="button" className={styles.backLink} onClick={goBack}>
              ← Αλλαγή επιλογής
            </button>
            <div className={styles.chosenBadge}>
              {currentType === 'invoice' ? '📄 Τιμολόγιο' : '🧾 Απόδειξη'}
            </div>
          </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className={emailInvalid ? styles.invalid : ''}
              />
            </div>

            {currentType === 'invoice' && (
              <div className={styles.fieldGroup}>
                <label htmlFor="afm">ΑΦΜ</label>
                <input
                  type="text"
                  id="afm"
                  maxLength={9}
                  inputMode="numeric"
                  placeholder="123456789"
                  value={afm}
                  onChange={(e) => setAfm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={afmInvalid ? styles.invalid : ''}
                />
              </div>
            )}

            {error && <div className={styles.globalError}>{error}</div>}

            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={busy}
            >
              {busy && <span className={styles.spinner} />}
              <span>{busy ? 'Επεξεργασία...' : 'Συνέχεια στην Πληρωμή →'}</span>
            </button>

            <div className={styles.secureNote}>🔒 Ασφαλής πληρωμή μέσω Stripe</div>
          </div>
        )}

        {/* Already subscribed state */}
        {alreadySubscribed && (
          <div className={styles.alreadySubscribed}>
            <div className={styles.alreadyIcon}>✅</div>
            <div className={styles.alreadyTitle}>Είστε ήδη συνδρομητής!</div>
            <div className={styles.alreadyDesc}>
              Βρήκαμε ενεργή συνδρομή για το email <strong>{email.trim()}</strong>.
              <br />Αν αντιμετωπίζετε πρόβλημα, επικοινωνήστε μαζί μας.
            </div>
          </div>
        )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
