import ProjectPage from './ProjectPage'
import { SEO } from '../seo/meta'

const IMAGES = [
  { src: '/assets/images/urban-suites-1.jpg', alt: 'Urban Suites 1' },
  { src: '/assets/images/urban-suites-2.jpg', alt: 'Urban Suites 2' },
  { src: '/assets/images/urban-suites-3.jpg', alt: 'Urban Suites 3' },
  { src: '/assets/images/urban-suites-4.jpg', alt: 'Urban Suites 4' },
  { src: '/assets/images/urban-suites-5.jpg', alt: 'Urban Suites 5' },
  { src: '/assets/images/urban-suites-6.jpg', alt: 'Urban Suites 6' },
  { src: '/assets/images/urban-suites-7.jpg', alt: 'Urban Suites 7' },
  { src: '/assets/images/portfolio-hdr-1.jpg', alt: 'Urban Suites interior 1' },
  { src: '/assets/images/portfolio-hdr-3.jpg', alt: 'Urban Suites interior 2' },
]

export default function UrbanSuites() {
  const seo = SEO.urbanSuites.el
  return (
    <ProjectPage
      title="Urban Suites"
      description="Κάθε λεπτομέρεια από τη φωτογράφιση του Urban Suites στον Άλιμο, από τη διακόσμηση μέχρι την αρχιτεκτονική, αποπνέει πολυτέλεια και κομψότητα. Οι καλαίσθητοι εσωτερικοί χώροι, σε συνδυασμό με τη μαγευτική θέα στη θάλασσα, δημιουργούν ένα ιδανικό σκηνικό για φωτογραφίες υψηλής αισθητικής."
      images={IMAGES}
      seoTitle={seo.title}
      seoDescription={seo.description}
      seoKeywords={seo.keywords}
      canonical="https://frameflat.gr/urban-suites"
    />
  )
}
