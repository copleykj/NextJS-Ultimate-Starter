export const getBaseUrl = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const vercelPublicDomain = process.env.NEXT_PUBLIC_DOMAIN;
  const prodURL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return vercelPublicDomain || (isProduction ? prodURL : 'http://localhost:3000/');
};
