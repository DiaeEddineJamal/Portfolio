import React, { lazy, Suspense } from 'react';
import TargetCursor from './components/TargetCursor';

// Lazy load components for better performance
const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const Interactive3D = lazy(() => import('./components/Interactive3D').then(module => ({ default: module.Interactive3D })));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Loading fallback component
const SectionLoader = ({ height = 'h-96' }: { height?: string }) => (
  <div className={`${height} bg-gradient-to-br from-gray-900 to-black flex items-center justify-center`}>
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen">
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <Suspense fallback={<SectionLoader height="h-20" />}>
        <Header />
      </Suspense>
      <main>
        <Suspense fallback={<SectionLoader height="h-screen" />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Interactive3D />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<SectionLoader height="h-32" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;