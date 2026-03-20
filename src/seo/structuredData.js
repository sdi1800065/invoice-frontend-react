const BASE = 'https://frameflat.gr'

export const homeBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Frameflat',
  description:
    'Σχεδιασμός, κατασκευή και συντήρηση ιστοσελίδων από 29,99€/μήνα + ΦΠΑ. Domain, hosting και SSL περιλαμβάνονται. Επίσης προσφέρουμε επαγγελματική φωτογράφιση ακινήτων.',
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
  priceRange: '€',
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
        itemOffered: { '@type': 'Service', name: 'Κατασκευή ιστοσελίδων' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Ανανέωση & redesign ιστοσελίδας' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Συντήρηση, hosting & SEO βελτιστοποίηση' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Επαγγελματική φωτογράφιση & drone λήψεις' },
      },
    ],
  },
}

export const projectsGallery = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Frameflat — Portfolio',
  url: `${BASE}/portfolio`,
  description: 'Ιστοσελίδες που έχουμε σχεδιάσει, κατασκευάσει και συντηρούμε.',
  author: { '@type': 'Organization', name: 'Frameflat', url: BASE },
}

export const contactPage = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Επικοινωνία — Frameflat',
  url: `${BASE}/epikoinwnia`,
  description: 'Επικοινωνήστε με τη Frameflat για κατασκευή ιστοσελίδας, συντήρηση, redesign ή φωτογράφιση ακινήτων.',
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
    author: { '@type': 'Organization', name: 'Frameflat', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'Frameflat',
      logo: { '@type': 'ImageObject', url: `${BASE}/assets/images/logo.png` },
    },
  }
}

export function blogListSchema(articles) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Frameflat Άρθρα',
    url: `${BASE}/blog`,
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/blog/${a.slug}`,
      name: a.title,
    })),
  }
}
