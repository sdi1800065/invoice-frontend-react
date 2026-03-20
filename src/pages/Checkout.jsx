import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './Checkout.module.css'

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const paymentMode = searchParams.get('mode') === 'payment' ? 'payment' : 'subscription'

  const [step, setStep] = useState(1)
  const [currentType, setCurrentType] = useState(null)
  const [email, setEmail] = useState('')
  const [afm, setAfm] = useState('')
  const [error, setError] = useState('')
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [afmInvalid, setAfmInvalid] = useState(false)
  const [busy, setBusy] = useState(false)
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  const pageTitle = paymentMode === 'payment' ? 'Πληρωμή — Frameflat' : 'Εγγραφή — Frameflat'

  const goToForm = useCallback((type) => {
    setCurrentType(type)
    setStep(2)
    setError('')
  }, [])

  const goBack = useCallback(() => {
    setStep(1)
    setCurrentType(null)
    setError('')
  }, [])

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
      const payload = { email: trimmedEmail, invoiceType: currentType, paymentMode }
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

      if (!data.url || !/^https:\/\/checkout\.stripe\.com\//.test(data.url)) {
        setError('Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.')
        setBusy(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.')
      setBusy(false)
    }
  }, [busy, email, afm, currentType, paymentMode])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleSubmit()
  }, [handleSubmit])

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className={styles.checkout}>
        <div className={styles.logo}>
          <img src="/assets/images/logo.png" alt="Frameflat" />
        </div>

        {/* Step 1: type selection */}
        {step === 1 && (
          <div>
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
                  <div className={styles.typeDesc}>Για επιχειρήσεις — εκδίδεται τιμολόγιο στο ΑΑΔΕ</div>
                </div>
                <span className={styles.typeIcon}>📄</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: form */}
        {step === 2 && !alreadySubscribed && (
          <div>
            <button type="button" className={styles.backLink} onClick={goBack}>
              ← Αλλαγή επιλογής
            </button>
            <div className={styles.chosenBadge}>
              {currentType === 'invoice' ? '📄 Τιμολόγιο' : '🧾 Απόδειξη'}
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
    </div>
  )
}
