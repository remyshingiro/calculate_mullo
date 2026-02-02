import { MetadataRoute } from 'next';
import { stateTaxData, commonWages } from '../data/stateTaxData';

export default function sitemap(): MetadataRoute.Sitemap {
  // CHANGE THIS to your actual domain once you deploy (e.g., https://paycheckusa.com)
  const baseUrl = 'https://hourly-pay-calc.vercel.app';

  // 1. Static Pages (Home, About, etc)
  const staticPages = [
    '',
    '/states',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }));

  // 2. Programmatic Pages (State x Wage)
  // This generates ~2,000+ links automatically
  const programmaticPages: MetadataRoute.Sitemap = [];

  // @ts-expect-error - ignoring js keys
  Object.keys(stateTaxData).forEach((stateKey) => {
    // For each state, we generate pages for common wages (e.g., $15, $20, $25...)
    // @ts-expect-error - ignoring js types
    commonWages.forEach((wage) => {
      programmaticPages.push({
        url: `${baseUrl}/salary/${stateKey}/${wage}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.8,
      });
    });
  });

  return [...staticPages, ...programmaticPages];
}