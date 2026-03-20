import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styles from './CheckoutSuccess.module.css'

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const mode = searchParams.get('mode')
  const isSubscription = mode === 'subscription'

  const heading = isSubscription ? 'Η εγγραφή ολοκληρώθηκε!' : 'Η πληρωμή ολοκληρώθηκε!'
  const title = isSubscription ? 'Εγγραφή ολοκληρώθηκε — Frameflat' : 'Πληρωμή ολοκληρώθηκε — Frameflat'

  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/', { replace: true })
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className={styles.card}>
        <div className={styles.logo}>
          <img src="/assets/images/logo.png" alt="Frameflat" />
        </div>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.desc}>
          Η πληρωμή σας επεξεργάστηκε επιτυχώς.<br />
          Θα λάβετε σύντομα επιβεβαίωση στο email σας.
        </p>
        <p className={styles.redirect}>
          Ανακατεύθυνση στην αρχική σε {countdown}...
        </p>
      </div>
    </div>
  )
}
