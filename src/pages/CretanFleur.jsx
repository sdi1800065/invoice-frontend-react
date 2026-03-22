import ProjectPage from './ProjectPage'
import { SEO } from '../seo/meta'

const IMAGES = [
  { src: '/assets/images/cretan-fleur-0.jpg', alt: 'Cretan Fleur κατάλυμα εξωτερικός χώρος Ελαφόνησος' },
  { src: '/assets/images/cretan-fleur-3.jpg', alt: 'Cretan Fleur σαλόνι με θέα Ελαφόνησος' },
  { src: '/assets/images/cretan-fleur-5.jpg', alt: 'Cretan Fleur κρεβατοκάμαρα Ελαφόνησος' },
  { src: '/assets/images/cretan-fleur-7.jpg', alt: 'Cretan Fleur κουζίνα και τραπεζαρία' },
  { src: '/assets/images/cretan-fleur-9.jpg', alt: 'Cretan Fleur μπάνιο πολυτελείας' },
  { src: '/assets/images/cretan-fleur-10.jpg', alt: 'Cretan Fleur βεράντα με θέα στη θάλασσα' },
  { src: '/assets/images/cretan-fleur-12.jpg', alt: 'Cretan Fleur εσωτερικός χώρος διαμονής' },
  { src: '/assets/images/portfolio-photo-13.jpg', alt: 'Cretan Fleur λεπτομέρεια εσωτερικής διακόσμησης' },
  { src: '/assets/images/portfolio-photo-15.jpg', alt: 'Cretan Fleur αυλή και κήπος' },
  { src: '/assets/images/portfolio-drone.jpg', alt: 'Cretan Fleur αεροφωτογραφία drone Ελαφόνησος' },
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
      canonical="https://Everyweb.gr/cretan-fleur"
    />
  )
}
