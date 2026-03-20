import ProjectPage from './ProjectPage'
import { SEO } from '../seo/meta'

const IMAGES = [
  { src: '/assets/images/athens-view-3.jpg', alt: 'Athens View 1' },
  { src: '/assets/images/athens-view-4.jpg', alt: 'Athens View 2' },
  { src: '/assets/images/athens-view-6.jpg', alt: 'Athens View 3' },
  { src: '/assets/images/athens-view-7.jpg', alt: 'Athens View 4' },
  { src: '/assets/images/athens-view-8.jpg', alt: 'Athens View 5' },
  { src: '/assets/images/athens-view-11.jpg', alt: 'Athens View 6' },
  { src: '/assets/images/athens-view-12.jpg', alt: 'Athens View 7' },
  { src: '/assets/images/athens-view-13.jpg', alt: 'Athens View 8' },
  { src: '/assets/images/athens-view-14.jpg', alt: 'Athens View 9' },
  { src: '/assets/images/athens-view-16a.jpg', alt: 'Athens View 10' },
  { src: '/assets/images/athens-view-17.jpg', alt: 'Athens View 11' },
]

export default function AthensView() {
  const seo = SEO.athensView.el
  return (
    <ProjectPage
      title="Athens View"
      description="Επαγγελματική φωτογράφιση Airbnb στο κέντρο της Αθήνας με θέα στην Ακρόπολη. Φωτογραφικό υλικό που χρησιμοποιήθηκε στην ιστοσελίδα και στις πλατφόρμες κρατήσεων του καταλύματος."
      images={IMAGES}
      seoTitle={seo.title}
      seoDescription={seo.description}
      seoKeywords={seo.keywords}
      canonical="https://frameflat.gr/athens-view"
    />
  )
}
