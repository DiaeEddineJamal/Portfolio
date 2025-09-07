import React from 'react';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import DarkVeil from './DarkVeil';
import ProfileCard from './profileCard';
import { MatrixText } from './ui/matrix-text';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
            hueShift={350}
            noiseIntensity={0.02}
            scanlineIntensity={0.03}
            speed={0.9}
            scanlineFrequency={1}
            warpAmount={0.3}
            resolutionScale={1}
          />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-24">
        <div className="order-2 lg:order-1 py-16">
          <div className="mb-8">
            <div className="text-5xl md:text-6xl font-extrabold text-gray-100 leading-tight mb-4">
              <MatrixText
                text="G'day, I'm"
                className="text-5xl md:text-6xl font-extrabold text-gray-100 justify-start"
                initialDelay={200}
                letterAnimationDuration={500}
                letterInterval={100}
                matrixColor="rgb(198, 128, 255)"
              />
            </div>
            <div className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              <MatrixText
                text="Diae Eddine Jamal"
                className="text-5xl md:text-6xl font-extrabold text-electric justify-start"
                initialDelay={1500}
                letterAnimationDuration={500}
                letterInterval={100}
                matrixColor="rgb(198, 128, 255)"
              />
            </div>
            <div className="mt-4">
              <MatrixText
                text="A Software Engineer"
                className="text-3xl md:text-4xl font-semibold text-rose-500 justify-start"
                initialDelay={3000}
                letterAnimationDuration={500}
                letterInterval={100}
                matrixColor="rgb(198, 128, 255)"
              />
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed max-w-xl">
            I'm a recently graduated software engineer with a passion for AI and full-stack development.
            I specialize in building mobile and web applications using modern technologies, with expertise
            in microservices architecture using Spring Boot and various cutting-edge frameworks.
          </p>
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-3 bg-white/15 backdrop-blur-xl border border-white/25 text-white rounded-xl hover:bg-white/25 hover:border-white/40 transition-all duration-500 ease-out font-semibold cursor-target shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Contact me!
            </button>
            <a
              href="#"
              className="px-8 py-3 bg-white/8 backdrop-blur-xl border border-electric/40 text-electric rounded-xl hover:bg-electric/25 hover:border-electric/60 transition-all duration-500 ease-out font-semibold cursor-target flex items-center gap-2 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <Download size={18} /> Curriculum Vitae | CV
            </a>
          </div>

          <div className="flex items-center gap-6 mt-10">
            <a href="https://github.com/DiaeEddineJamal" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-electric cursor-target">
              <Github />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-electric cursor-target">
              <Linkedin />
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative min-h-[55vh] flex items-center justify-center">
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
        </div>
      </div>

      {/* Right vertical email (style stub; real element added elsewhere) */}
    </section>
  );
};

export default Hero;