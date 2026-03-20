const BASE = 'https://frameflat.gr'

export const homeBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Frameflat Photography',
  description:
    'Επαγγελματική φωτογράφιση ακινήτων, drone λήψεις και εξατομικευμένες ιστοσελίδες για ακίνητα και Airbnb στην Ελλάδα.',
  url: BASE,
  telephone: '+306942533482',
  email: 'frameflatcompany@gmail.com',
  image: `${BASE}/assets/images/og-image.png`,
  logo: `${BASE}/assets/images/logo.png`,
  sameAs: [
    'https://www.facebook.com/profile.php?id=61560009936690',
    'https://www.instagram.com/frame_flat/',
    'https://www.tiktok.com/@frameflat',
  ],
  priceRange: '€€',
  areaServed: {
    '@type': 'Country',
    name: 'Greece',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Υπηρεσίες Frameflat',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Φωτογράφιση ακινήτων' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Drone φωτογράφιση και βίντεο' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Εξατομικευμένη ιστοσελίδα ακινήτου' },
      },
    ],
  },
}

export const projectsGallery = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Frameflat Photography Portfolio',
  url: `${BASE}/projects`,
  description: 'Portfolio επαγγελματικής φωτογράφισης ακινήτων — Cretan Fleur, Urban Suites, Athens View',
  author: { '@type': 'Organization', name: 'Frameflat Photography', url: BASE },
}

export const contactPage = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Επικοινωνία — Frameflat Photography',
  url: `${BASE}/epikoinwnia`,
  description: 'Επικοινωνήστε με την Frameflat για επαγγελματική φωτογράφιση ακινήτων',
}

export function articleSchema({ title, description, datePublished, image, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: `${BASE}${image}`,
    datePublished,
    dateModified: datePublished,
    url: `${BASE}/blog/${slug}`,
    author: { '@type': 'Organization', name: 'Frameflat Photography', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'Frameflat Photography',
      logo: { '@type': 'ImageObject', url: `${BASE}/assets/images/logo.png` },
    },
  }
}

export function blogListSchema(articles) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Frameflat Blog',
    url: `${BASE}/blog`,
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/blog/${a.slug}`,
      name: a.title,
    })),
  }
}
