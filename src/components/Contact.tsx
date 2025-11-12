import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { MatrixText } from './ui/matrix-text';

const Contact = () => {

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      info: 'diae_2002@hotmail.com',
      link: 'mailto:diae_2002@hotmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      info: 'Casablanca (Remote work worldwide)',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      url: 'https://github.com/DiaeEddineJamal',
      color: 'hover:text-white'
    },
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/diae-eddine-jamal-5066242a5/',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-6">
              <MatrixText
                text="Get In Touch"
                className="text-3xl md:text-4xl font-bold text-gray-100"
                initialDelay={200}
                letterAnimationDuration={500}
                letterInterval={100}
                scrollTriggered={true}
                matrixColor="rgb(198, 128, 255)"
              />
            </div>
            <div className="w-24 h-1 bg-electric mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's discuss your next project or just say hello. I'm always open to new opportunities and collaborations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-100 mb-8 text-center">Contact Information</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex flex-col items-center text-center p-6 bg-black rounded-2xl shadow-lg border-2 border-[#2a2766] hover:border-electric/60 transition-all duration-300 group cursor-target text-gray-200 hover:transform hover:scale-105"
                  >
                    <div className="p-4 bg-[#2a2766] text-electric rounded-xl group-hover:bg-electric group-hover:text-black transition-all duration-300 mb-4">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold text-gray-100 mb-2">{item.title}</h4>
                    <p className="text-gray-300 text-sm">{item.info}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-100 mb-8">Follow Me</h3>
              <div className="flex justify-center gap-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-16 h-16 flex items-center justify-center bg-black rounded-2xl shadow-lg border-2 border-[#2a2766] hover:border-electric/60 transition-all duration-300 text-gray-200 ${social.color} group cursor-target hover:transform hover:scale-110`}
                    title={social.name}
                    aria-label={social.name}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;