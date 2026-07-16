import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.amymup.shop'
  const lastModified = new Date('2026-07-16')

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/film-tv-commercial-makeup-artist-cape-town`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/makeup-department-coordinator-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/makeup-continuity-standby-artist-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.86,
    },
    {
      url: `${baseUrl}/international-film-production-makeup-support-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.86,
    },
    {
      url: `${baseUrl}/sfx-makeup-artist-cape-town`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/commercial-editorial-makeup-artist-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.86,
    },
    {
      url: `${baseUrl}/hair-stylist-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.84,
    },
    {
      url: `${baseUrl}/private-makeup-artist-cape-town`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/bridal-makeup-artist-cape-town`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/wedding-makeup-artist-stellenbosch`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${baseUrl}/bridal-makeup-artist-winelands`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${baseUrl}/makeup-artist-northern-suburbs-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.76,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/production-credits`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/makeup-artist-tv-commercials-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/production-hair-makeup-team-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.86,
    },
    {
      url: `${baseUrl}/period-character-makeup-artist-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.86,
    },
    {
      url: `${baseUrl}/body-painting-artist-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.84,
    },
    {
      url: `${baseUrl}/actor-headshot-makeup-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${baseUrl}/wardrobe-hair-makeup-production-support-cape-town`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${baseUrl}/blog/corona-100-years-of-living-commercial`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/blog/coca-cola-springbok-rugby-commercial-makeup`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/blog/pep-south-africa-valentines-commercial-makeup-hair`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/blog/actor-headshot-portfolio-shoot-makeup-cape-town`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.74,
    },
    {
      url: `${baseUrl}/blog/hunter-kennedy-fashion-shoot-body-painting`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.72,
    },
  ]
}
