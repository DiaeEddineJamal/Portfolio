import React, { lazy, Suspense, useMemo } from 'react';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { MatrixText } from './ui/matrix-text';

// Lazy load heavy components
const DarkVeil = lazy(() => import('./DarkVeil'));
const ProfileCard = lazy(() => import('./profilecard'));

const Hero = React.memo(() => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Memoize DarkVeil props to prevent unnecessary re-renders
  const darkVeilProps = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      hueShift: 350,
      noiseIntensity: isMobile ? 0.01 : 0.02,
      scanlineIntensity: isMobile ? 0.015 : 0.03,
      speed: isMobile ? 0.6 : 0.9,
      scanlineFrequency: isMobile ? 0.8 : 1,
      warpAmount: isMobile ? 0.2 : 0.3,
      resolutionScale: isMobile ? 0.7 : 1
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />}>
          <DarkVeil {...darkVeilProps} />
        </Suspense>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-center pt-20 sm:pt-24">
        <div className="order-2 lg:order-1 py-8 sm:py-12 lg:py-16">
          <div className="mb-6 sm:mb-8">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-100 leading-tight mb-3 sm:mb-4">
              <MatrixText
                text="G'day, I'm"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-100 justify-start"
                initialDelay={200}
                letterAnimationDuration={500}
                letterInterval={100}
                matrixColor="rgb(198, 128, 255)"
              />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 sm:mb-4">
              <MatrixText
                text="Diae Eddine Jamal"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-electric justify-start"
                initialDelay={1500}
                letterAnimationDuration={500}
                letterInterval={100}
                matrixColor="rgb(198, 128, 255)"
              />
            </div>
            <div className="mt-3 sm:mt-4">
              <MatrixText
                text="A Software Engineer"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-rose-500 justify-start"
                initialDelay={3000}
                letterAnimationDuration={500}
                letterInterval={100}
                matrixColor="rgb(198, 128, 255)"
              />
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed max-w-xl text-sm sm:text-base">
            I'm a recently graduated software engineer with a passion for AI and full-stack development.
            I specialize in building mobile and web applications using modern technologies, with expertise
            in microservices architecture using Spring Boot and various cutting-edge frameworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/15 backdrop-blur-xl border border-white/25 text-white rounded-xl hover:bg-white/25 hover:border-white/40 transition-all duration-500 ease-out font-semibold cursor-target shadow-2xl hover:shadow-3xl transform hover:scale-105 text-sm sm:text-base"
            >
              Contact me!
            </button>
            <a
              href="#"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/8 backdrop-blur-xl border border-electric/40 text-electric rounded-xl hover:bg-electric/25 hover:border-electric/60 transition-all duration-500 ease-out font-semibold cursor-target flex items-center justify-center gap-2 shadow-2xl hover:shadow-3xl transform hover:scale-105 text-sm sm:text-base"
            >
              <Download size={16} className="sm:w-[18px] sm:h-[18px]" /> 
              <span className="hidden sm:inline">Curriculum Vitae | CV</span>
              <span className="sm:hidden">CV</span>
            </a>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-6 mt-8 sm:mt-10">
            <a href="https://github.com/DiaeEddineJamal" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-electric cursor-target">
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-electric cursor-target">
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative min-h-[40vh] sm:min-h-[50vh] lg:min-h-[55vh] flex items-center justify-center">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-32 h-32 bg-gray-800 rounded-2xl animate-pulse" /></div>}>
            <ProfileCard
              name="Diae Eddine Jamal"
              title="Software Engineer"
              handle="diaeeddine"
              status="Available for work"
              contactText="Contact Me"
              avatarUrl="/profile-image.jpg"
              miniAvatarUrl="/profile-image2.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </Suspense>
        </div>
      </div>

      {/* Right vertical email (style stub; real element added elsewhere) */}
    </section>
  );
});

export default Hero;