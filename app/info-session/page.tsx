import Navigation from '@/components/public/navigation';
import Footer from '@/components/public/footer';
import InfoSessionContent from '@/components/public/info-session';

export default function InfoSessionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-gray-200">
      <Navigation />
      <InfoSessionContent />
      <Footer />
    </div>
  );
}