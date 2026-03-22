export function generateOrganizationSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Company Name',
    url: `https://yourdomain.com/${locale}`,
    logo: 'https://yourdomain.com/logo.png',
    description: 'Professional services and solutions for your business needs',
    address: {
      '@type': 'PostalAddress',
      addressCountry: locale === 'ar' ? 'AE' : 'US',
    },
    sameAs: [
      'https://twitter.com/yourcompany',
      'https://github.com/yourcompany',
      'https://youtube.com/yourcompany',
    ],
  }
}

export function generateWebPageSchema(
  title: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
