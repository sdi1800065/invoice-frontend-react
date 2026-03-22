const BASE = 'https://Everyweb.gr'

export const homeBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'EveryWeb',
  description:
    'Κατασκευή ιστοσελίδων με συνδρομή και ηλεκτρονική τιμολόγηση για επιχειρήσεις στην Ελλάδα. Domain, hosting, SSL, SEO και διαβίβαση στην ΑΑΔΕ MyData από τη EveryWeb.',
  url: BASE,
  telephone: '+306942533482',
  email: 'info@everyweb.gr',
  image: `${BASE}/assets/images/og-image.png`,
  logo: `${BASE}/assets/images/logo.png`,
  sameAs: [
    'https://www.facebook.com/profile.php?id=61560009936690',
    'https://www.instagram.com/every_web/',
    'https://www.tiktok.com/@Everyweb',
  ],
  priceRange: '€',
  areaServed: {
    '@type': 'Country',
    name: 'Greece',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Υπηρεσίες EveryWeb',
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
        itemOffered: { '@type': 'Service', name: 'Ηλεκτρονική πληρωμή & τιμολόγηση — διαβίβαση στην ΑΑΔΕ MyData μέσω e-timologera (Brantnet)' },
      },
    ],
  },
}

const provider = {
  '@type': 'Organization',
  name: 'EveryWeb',
  url: BASE,
}

export const websiteService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Κατασκευή Ιστοσελίδων με Συνδρομή',
  serviceType: 'Κατασκευή, redesign και συντήρηση ιστοσελίδων',
  description:
    'Κατασκευή ιστοσελίδων από 29,99€/μήνα + ΦΠΑ με δωρεάν build ή redesign, domain, hosting, SSL, συντήρηση και SEO.',
  url: `${BASE}/ypiresies`,
  provider,
  areaServed: { '@type': 'Country', name: 'Greece' },
  offers: {
    '@type': 'Offer',
    price: '29.99',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
}

export const invoicingService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Ηλεκτρονική Πληρωμή & Τιμολόγηση',
  serviceType: 'Αυτόματη έκδοση παραστατικών και διαβίβαση στην ΑΑΔΕ MyData μέσω e-timologera (Brantnet)',
  description:
    'Ηλεκτρονική πληρωμή και τιμολόγηση από 19,99€/μήνα + ΦΠΑ με αυτόματη έκδοση τιμολογίων και αποδείξεων, PDF, email και admin dashboard. Πιστοποιημένος πάροχος: e-timologera (Brantnet).',
  url: `${BASE}/ilektroniki-timologisi`,
  provider,
  areaServed: { '@type': 'Country', name: 'Greece' },
  offers: {
    '@type': 'Offer',
    price: '19.99',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
}

export const projectsGallery = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'EveryWeb — Portfolio',
  url: `${BASE}/portfolio`,
  description: 'Ιστοσελίδες που έχουμε σχεδιάσει, κατασκευάσει και συντηρούμε.',
  author: { '@type': 'Organization', name: 'EveryWeb', url: BASE },
}

export const contactPage = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Επικοινωνία — EveryWeb',
  url: `${BASE}/epikoinwnia`,
  description: 'Επικοινωνήστε με τη EveryWeb για κατασκευή ιστοσελίδας, ηλεκτρονική τιμολόγηση, συντήρηση, redesign ή φωτογράφιση.',
}

export function articleSchema({ title, description, datePublished, dateModified, image, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: `${BASE}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    url: `${BASE}/blog/${slug}`,
    author: { '@type': 'Organization', name: 'EveryWeb', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'EveryWeb',
      logo: { '@type': 'ImageObject', url: `${BASE}/assets/images/logo.png` },
    },
  }
}

export function blogListSchema(articles) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'EveryWeb Άρθρα',
    url: `${BASE}/blog`,
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/blog/${a.slug}`,
      name: a.title,
    })),
  }
}
