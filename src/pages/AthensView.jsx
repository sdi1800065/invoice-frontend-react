import ProjectPage from './ProjectPage'
import { SEO } from '../seo/meta'

const IMAGES = [
  { src: '/assets/images/athens-view-3.jpg', alt: 'Athens View living room with Acropolis panorama' },
  { src: '/assets/images/athens-view-4.jpg', alt: 'Athens View cozy bedroom with warm lighting' },
  { src: '/assets/images/athens-view-6.jpg', alt: 'Athens View fully equipped kitchen' },
  { src: '/assets/images/athens-view-7.jpg', alt: 'Athens View modern bathroom' },
  { src: '/assets/images/athens-view-8.jpg', alt: 'Athens View balcony with city skyline' },
  { src: '/assets/images/athens-view-11.jpg', alt: 'Athens View dining area with natural light' },
  { src: '/assets/images/athens-view-12.jpg', alt: 'Athens View second bedroom with workspace' },
  { src: '/assets/images/athens-view-13.jpg', alt: 'Athens View hallway and entrance' },
  { src: '/assets/images/athens-view-14.jpg', alt: 'Athens View terrace with Acropolis view at sunset' },
  { src: '/assets/images/athens-view-16a.jpg', alt: 'Athens View building exterior day view' },
  { src: '/assets/images/athens-view-16b.jpg', alt: 'Athens View building exterior night view' },
  { src: '/assets/images/athens-view-17.jpg', alt: 'Athens View neighbourhood street scene' },
]

export default function AthensView() {
  const seo = SEO.athensView.el
  return (
    <ProjectPage
      title="Athens View"
      description="Επαγγελματική φωτογράφιση Airbnb στο κέντρο της Αθήνας — μοναδική θέα στην Ακρόπολη, φωτεινοί χώροι και σύγχρονη διακόσμηση. Ιδανικό υλικό για πλατφόρμες ενοικίασης."
      images={IMAGES}
      seoTitle={seo.title}
      seoDescription={seo.description}
      seoKeywords={seo.keywords}
      canonical="https://Everyweb.gr/athens-view"
    />
  )
}
