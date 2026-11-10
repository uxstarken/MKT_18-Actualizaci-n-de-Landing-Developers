import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import PluginsSection from './components/PluginsSection';
import ResourcesSection from './components/ResourcesSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ManualModal from './components/ManualModal';
import VideoModal from './components/VideoModal';

function App() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  // Auth simulation state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('starken_user_logged') === 'true';
  });

  const handleToggleAuth = () => {
    setIsLoggedIn(prev => {
      const next = !prev;
      localStorage.setItem('starken_user_logged', String(next));
      return next;
    });
  };

  // Modals state
  const [manualModal, setManualModal] = useState({ isOpen: false, platform: '', url: '' });
  const [videoModal, setVideoModal] = useState({ isOpen: false, platform: '', url: '' });

  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToPlugins = () => {
    const el = document.getElementById('plugins');
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToDocs = () => {
    const el = document.getElementById('documentacion');
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectServiceForContact = (serviceName) => {
    setSelectedService(serviceName);
    scrollToContact();
  };

  const handleSelectPluginForContact = (platformName) => {
    setSelectedPlatform(platformName);
    scrollToContact();
  };

  const handleOpenManual = (platform, url) => {
    setManualModal({ isOpen: true, platform, url });
  };

  const handleOpenVideo = (platform, url) => {
    setVideoModal({ isOpen: true, platform, url });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-starken-text-dark font-sans selection:bg-starken-green/20 selection:text-starken-green-dark">
      {/* Header & Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onToggleAuth={handleToggleAuth}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* Hero Banner with Simulated Live Tracking */}
        <Hero
          onNavigateToContact={scrollToContact}
          onNavigateToPlugins={scrollToPlugins}
          onNavigateToDocs={scrollToDocs}
        />

        {/* Interactive Services Section */}
        <ServicesSection
          isLoggedIn={isLoggedIn}
          onToggleAuth={handleToggleAuth}
          onSelectServiceForContact={handleSelectServiceForContact}
        />

        {/* E-Commerce Plugins Grid & Token Banner */}
        <PluginsSection
          onSelectPluginForContact={handleSelectPluginForContact}
          onOpenManual={handleOpenManual}
          onOpenVideo={handleOpenVideo}
        />

        {/* Documentation, Manuals, Videos & FAQs */}
        <ResourcesSection
          activeManualModal={manualModal}
          setActiveManualModal={setManualModal}
          activeVideoModal={videoModal}
          setActiveVideoModal={setVideoModal}
        />

        {/* Commercial Lead / Integration Contact Form (Jira IC-617) */}
        <ContactForm
          preselectedService={selectedService}
          preselectedPlatform={selectedPlatform}
        />
      </main>

      {/* Corporate Footer with Certifications and Certs */}
      <Footer />

      {/* Floating Scroll to Top button */}
      <ScrollToTop />

      {/* Modals */}
      <ManualModal
        isOpen={manualModal.isOpen}
        onClose={() => setManualModal({ isOpen: false, platform: '', url: '' })}
        platform={manualModal.platform}
        pdfUrl={manualModal.url}
      />

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, platform: '', url: '' })}
        platform={videoModal.platform}
        videoUrl={videoModal.url}
      />
    </div>
  );
}

export default App;
