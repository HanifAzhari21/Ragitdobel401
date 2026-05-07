import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DashboardSection } from './components/DashboardSection';
import { LMSSection } from './components/LMSSection';
import { DokumentasiSection } from './components/DokumentasiSection';
import { Footer } from './components/Footer';
import { DarkModeProvider } from './contexts/DarkModeContext';

export default function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300">
        <Header />
        <main>
          <HeroSection />
          <DashboardSection />
          <LMSSection />
          <DokumentasiSection />
        </main>
        <Footer />
      </div>
    </DarkModeProvider>
  );
}