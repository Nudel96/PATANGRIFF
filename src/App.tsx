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

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
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