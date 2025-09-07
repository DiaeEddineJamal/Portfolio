import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav className={`mx-auto max-w-6xl rounded-2xl transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl' 
          : 'bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg'
      }`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('#home')}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all duration-500 ease-out cursor-target shadow-lg hover:shadow-xl transform hover:scale-105 bg-white/10 backdrop-blur-xl"
          >
            <img 
              src="/profile-image2.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 bg-white/8 backdrop-blur-xl border border-white/15 text-gray-300 hover:text-electric hover:bg-white/15 hover:border-white/30 transition-all duration-500 ease-out cursor-target rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-300 hover:text-electric transition-colors duration-200 cursor-target">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-300 hover:text-electric transition-colors duration-200 cursor-target">
              <Linkedin size={20} />
            </a>
            <a href="mailto:your.email@example.com" 
               className="text-gray-300 hover:text-electric transition-colors duration-200 cursor-target">
              <Mail size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 bg-white/8 backdrop-blur-xl border border-white/15 text-gray-300 hover:text-electric hover:bg-white/15 hover:border-white/30 transition-all duration-500 ease-out cursor-target rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 bg-white/8 backdrop-blur-xl border border-white/15 text-left text-gray-300 hover:text-electric hover:bg-white/15 hover:border-white/30 transition-all duration-500 ease-out cursor-target rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center justify-center space-x-6 mt-6 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-electric transition-colors duration-200 cursor-target">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-electric transition-colors duration-200 cursor-target">
                <Linkedin size={20} />
              </a>
              <a href="mailto:your.email@example.com" 
                 className="text-gray-300 hover:text-electric transition-colors duration-200 cursor-target">
                <Mail size={20} />
              </a>
            </div>
          </div>
        )}
      </div>
      </nav>
    </header>
  );
};

export default Header;