import SplashPage from '@/components/public/splash-page';
import SEOHead from '@/components/seo/SEOHead';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Version Bravo Alphabet - Combat Veteran Entrepreneurship"
        description="Welcome to Version Bravo Alphabet - The only entrepreneurship program for US and Israeli combat veterans. Transform your military leadership into business success."
        keywords={[
          'version bravo alphabet',
          'combat veteran startup program',
          'military entrepreneur training',
          'veteran business accelerator',
          'alpha-bet program',
          'military to civilian transition',
          'veteran startup incubator'
        ]}
        canonical="/"
      />
      <SplashPage />
    </>
  );
}
