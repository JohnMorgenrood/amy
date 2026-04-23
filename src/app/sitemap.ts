import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.amymup.shop'
  const lastModified = new Date('2026-04-23')

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio/sfx`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/beauty`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/bridal`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/film`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/editorial`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
