import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MultiversePortalCanvas from './components/MultiversePortalCanvas';
import MissionBrief from './components/MissionBrief';
import Tracks from './components/Tracks';
import SacredTimeline from './components/SacredTimeline';
import PrizeVault from './components/PrizeVault';
import MiniGame from './components/MiniGame';
import RegistrationModal from './components/RegistrationModal';
import FAQAndFooter from './components/FAQAndFooter';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#050508] text-[#e0e0e8] overflow-x-hidden">
        {/* Fixed background canvas */}
        <MultiversePortalCanvas />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main>
          <Hero />
          <MissionBrief />
          <Tracks />
          <SacredTimeline />
          <PrizeVault />
          <MiniGame />
          <FAQAndFooter />
        </main>

        {/* Registration modal (event-driven) */}
        <RegistrationModal />
      </div>
    </ThemeProvider>
  );
}

export default App;
