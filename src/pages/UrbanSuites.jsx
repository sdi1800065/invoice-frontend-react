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
      description="Επαγγελματική φωτογράφιση πολυτελούς ακινήτου στον Άλιμο Αθήνας. Ανάδειξη εσωτερικών χώρων, αρχιτεκτονικής και θέας — υλικό ιδανικό για ιστοσελίδα ή καταχώρηση σε πλατφόρμες ενοικίασης."
      images={IMAGES}
      seoTitle={seo.title}
      seoDescription={seo.description}
      seoKeywords={seo.keywords}
      canonical="https://frameflat.gr/urban-suites"
    />
  )
}
