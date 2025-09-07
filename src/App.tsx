import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { Interactive3D } from './components/Interactive3D';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TargetCursor from './components/TargetCursor';

function App() {
  return (
    <div className="min-h-screen">
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <Header />
      <main>
        <Hero />
        <Interactive3D />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;