import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/auth/', '/login/', '/register/', '/mypage/'] }],
    sitemap: `${process.env.NEXT_PUBLIC_FRONT_URL}/sitemap.xml`,
    host: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
  };
};

export default robots;
