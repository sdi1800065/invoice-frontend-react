import ProjectPage from './ProjectPage'
import { SEO } from '../seo/meta'

const IMAGES = [
  { src: '/assets/images/cretan-fleur-0.jpg', alt: 'Cretan Fleur 1' },
  { src: '/assets/images/cretan-fleur-3.jpg', alt: 'Cretan Fleur 2' },
  { src: '/assets/images/cretan-fleur-5.jpg', alt: 'Cretan Fleur 3' },
  { src: '/assets/images/cretan-fleur-7.jpg', alt: 'Cretan Fleur 4' },
  { src: '/assets/images/cretan-fleur-9.jpg', alt: 'Cretan Fleur 5' },
  { src: '/assets/images/cretan-fleur-10.jpg', alt: 'Cretan Fleur 6' },
  { src: '/assets/images/cretan-fleur-12.jpg', alt: 'Cretan Fleur 7' },
  { src: '/assets/images/portfolio-photo-13.jpg', alt: 'Cretan Fleur 8' },
  { src: '/assets/images/portfolio-photo-15.jpg', alt: 'Cretan Fleur 9' },
  { src: '/assets/images/portfolio-drone.jpg', alt: 'Cretan Fleur drone shot' },
]

export default function CretanFleur() {
  const seo = SEO.cretanFleur.el
  return (
    <ProjectPage
      title="Cretan Fleur"
      description="Επαγγελματική φωτογράφιση ακινήτου στην Ελαφόνησο — ανάδειξη της κομψής αρχιτεκτονικής, των φωτεινών εσωτερικών χώρων και της μαγευτικής θέας. Ιδανικό φωτογραφικό υλικό για ιστοσελίδα ή πλατφόρμες ενοικίασης."
      images={IMAGES}
      seoTitle={seo.title}
      seoDescription={seo.description}
      seoKeywords={seo.keywords}
      canonical="https://frameflat.gr/cretan-fleur"
    />
  )
}
