import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PositioningStatement } from './components/PositioningStatement';
import { FourPillars } from './components/FourPillars';
import { PlatformTools } from './components/PlatformTools';
import { Stats } from './components/Stats';
import { Community } from './components/Community';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { TradingJournal } from './components/TradingJournal';
import { CurrencyHeatmap } from './components/CurrencyHeatmap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'journal' | 'heatmap'>('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  const handleNavigateToJournal = () => {
    setCurrentView('journal');
  };

  const handleNavigateToHeatmap = () => {
    setCurrentView('heatmap');
  };

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (isLoggedIn) {
    if (currentView === 'journal') {
      return <TradingJournal onBack={handleNavigateToDashboard} onLogout={handleLogout} />;
    }
    if (currentView === 'heatmap') {
      return <CurrencyHeatmap onBack={handleNavigateToDashboard} onLogout={handleLogout} />;
    }
    return <Dashboard onLogout={handleLogout} onNavigateToJournal={handleNavigateToJournal} onNavigateToHeatmap={handleNavigateToHeatmap} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onLogin={handleLogin} />
      <main>
        <Hero />
        <PositioningStatement />
        <Stats />
        <FourPillars />
        <PlatformTools />
        <Community />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;