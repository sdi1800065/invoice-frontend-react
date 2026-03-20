import { useEffect } from 'react'
import styles from './Lightbox.module.css'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  if (index === null || index === undefined) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
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
