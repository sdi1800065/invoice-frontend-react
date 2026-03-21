import { useEffect, useRef, useCallback } from 'react'
import styles from './Lightbox.module.css'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const overlayRef = useRef(null)

  const trapFocus = useCallback((e) => {
    if (e.key !== 'Tab' || !overlayRef.current) return
    const focusable = overlayRef.current.querySelectorAll('button, [tabindex]:not([tabindex="-1"])')
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
      trapFocus(e)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    const prev = document.activeElement
    overlayRef.current?.querySelector('button')?.focus()

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose, onPrev, onNext, trapFocus])

  if (index === null || index === undefined) return null

  return (
    <div className={styles.overlay} onClick={onClose} ref={overlayRef} role="dialog" aria-modal="true" aria-label="Προβολή εικόνας">
      <button className={styles.close} onClick={onClose} aria-label="Κλείσιμο">×</button>
      <button
        className={styles.prev}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Προηγούμενη"
      >
        ‹
      </button>
      <img
        src={images[index].src}
        alt={images[index].alt}
        className={styles.img}
        onClick={(e) => e.stopPropagation()}
        loading="eager"
      />
      <button
        className={styles.next}
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Επόμενη"
      >
        ›
      </button>
    </div>
  )
}
