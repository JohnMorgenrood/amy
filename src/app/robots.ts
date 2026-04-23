import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/shop', '/checkout', '/login', '/account'],
    },
    sitemap: 'https://www.amymup.shop/sitemap.xml',
  }
}
