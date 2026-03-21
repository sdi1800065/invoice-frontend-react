import ProjectPage from './ProjectPage'
import { SEO } from '../seo/meta'

const IMAGES = [
  { src: '/assets/images/urban-suites-1.jpg', alt: 'Urban Suites luxury living room with modern furnishings' },
  { src: '/assets/images/urban-suites-2.jpg', alt: 'Urban Suites bright bedroom with city view' },
  { src: '/assets/images/urban-suites-3.jpg', alt: 'Urban Suites elegant kitchen and dining area' },
  { src: '/assets/images/urban-suites-4.jpg', alt: 'Urban Suites stylish bathroom with marble finishes' },
  { src: '/assets/images/urban-suites-5.jpg', alt: 'Urban Suites spacious balcony overlooking Alimos' },
  { src: '/assets/images/urban-suites-6.jpg', alt: 'Urban Suites exterior building facade' },
  { src: '/assets/images/urban-suites-7.jpg', alt: 'Urban Suites property entrance and landscaping' },
]

export default function UrbanSuites() {
  const seo = SEO.urbanSuites.el
  return (
    <ProjectPage
      title="Urban Suites"
      description="Επαγγελματική φωτογράφιση πολυτελούς ακινήτου στον Άλιμο Αθήνας — ανάδειξη σύγχρονης αρχιτεκτονικής, premium εσωτερικών χώρων και θέας στη θάλασσα."
      images={IMAGES}
      seoTitle={seo.title}
      seoDescription={seo.description}
      seoKeywords={seo.keywords}
      canonical="https://frameflat.gr/urban-suites"
    />
  )
}
