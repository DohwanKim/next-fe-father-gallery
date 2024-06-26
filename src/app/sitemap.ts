import { MetadataRoute } from 'next';

const ROUTE_LIST = ['', '/about', '/gallery'] as const;

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!process.env.NEXT_PUBLIC_DOMAIN) {
    return [];
  }

  const changeFrequency: ChangeFrequency = 'daily';
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || '';
  const routes = ROUTE_LIST.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
  }));

  return [...routes];
}
