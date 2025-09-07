import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black/95 backdrop-blur-xl border-t border-white/10 text-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-electric bg-clip-text text-transparent">
                  Diae Eddine Jamal
                </h3>
                <p className="text-xl font-medium text-electric">
                  Software Engineer
                </p>
                <p className="text-gray-300 leading-relaxed max-w-md">
                  Building innovative digital solutions with passion and precision. 
                  Always exploring new technologies and pushing boundaries in mobile and web development.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/DiaeEddineJamal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/8 backdrop-blur-xl border border-white/15 rounded-xl text-gray-300 hover:text-electric hover:bg-white/15 hover:border-white/30 transition-all duration-500 ease-out cursor-target shadow-lg hover:shadow-xl transform hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/8 backdrop-blur-xl border border-white/15 rounded-xl text-gray-300 hover:text-electric hover:bg-white/15 hover:border-white/30 transition-all duration-500 ease-out cursor-target shadow-lg hover:shadow-xl transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:your.email@example.com"
                  className="p-3 bg-white/8 backdrop-blur-xl border border-white/15 rounded-xl text-gray-300 hover:text-electric hover:bg-white/15 hover:border-white/30 transition-all duration-500 ease-out cursor-target shadow-lg hover:shadow-xl transform hover:scale-110"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white mb-4">Navigation</h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { href: '#home', label: 'Home' },
                  { href: '#about', label: 'About' },
                  { href: '#skills', label: 'Skills' },
                  { href: '#projects', label: 'Projects' },
                  { href: '#contact', label: 'Contact' }
                ].map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-left px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-electric hover:bg-white/10 hover:border-white/20 transition-all duration-500 ease-out cursor-target rounded-xl shadow-lg hover:shadow-xl transform hover:translate-x-2"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white mb-4">Get In Touch</h4>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-electric" />
                      <span>diae.eddine@example.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full bg-electric flex-shrink-0"></span>
                      <span>Available for work</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={scrollToTop}
                  className="w-full px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-500 ease-out font-semibold cursor-target shadow-lg hover:shadow-xl transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                >
                  ↑ Back to Top
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent h-px"></div>
            <div className="pt-12 pb-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3 text-gray-300">
                  <span>© {currentYear}</span>
                  <span className="w-1 h-1 rounded-full bg-electric"></span>
                  <span>Made with</span>
                  <Heart size={16} className="text-red-500 animate-pulse" />
                  <span>by</span>
                  <span className="font-semibold text-electric">Diae Eddine Jamal</span>
                </div>
                <p className="text-sm text-gray-400">
                  Crafted with modern technologies and attention to detail
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;