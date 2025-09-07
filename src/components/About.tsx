import React, { useEffect, useState } from 'react';
import { Code, Database, Globe, Server } from 'lucide-react';
import { fetchGithubUser, GITHUB_USERNAME } from '../utils/github';
import ElectricBorder from './ElectricBorder';
import { MatrixText } from './ui/matrix-text';

const About = () => {
  const [name, setName] = useState<string>('Software Engineer');
  const [bio, setBio] = useState<string | undefined>();

  useEffect(() => {
    fetchGithubUser(GITHUB_USERNAME).then((u) => {
      if (u?.name) setName(u.name);
      if (u?.bio) setBio(u.bio);
    });
  }, []);
  const highlights = [
    {
      icon: <Code size={24} />,
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces'
    },
    {
      icon: <Server size={24} />,
      title: 'Backend Development',
      description: 'Building scalable APIs and server-side applications'
    },
    {
      icon: <Database size={24} />,
      title: 'Database Design',
      description: 'Designing efficient database schemas and queries'
    },
    {
      icon: <Globe size={24} />,
      title: 'Full Stack Solutions',
      description: 'End-to-end application development and deployment'
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-6">
              <MatrixText
                text="About Me"
                className="text-3xl md:text-4xl font-bold text-gray-100"
                initialDelay={200}
                letterAnimationDuration={500}
                letterInterval={100}
                scrollTriggered={true}
                matrixColor="rgb(198, 128, 255)"
              />
            </div>
            <div className="w-24 h-1 bg-electric mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
                Software Engineer & AI Enthusiast
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Recently graduated software engineer with a strong foundation in AI and full-stack development. I specialize in creating innovative solutions that bridge the gap between cutting-edge technology and practical applications.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                My expertise spans mobile and web application development, microservices architecture with Spring Boot, and AI integration. I'm passionate about building scalable systems and exploring the potential of artificial intelligence in modern software solutions.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium cursor-target">
                  AI Developer
                </span>
                <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium cursor-target">
                  Full-Stack Engineer
                </span>
                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium cursor-target">
                  Microservices Expert
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <ElectricBorder key={index} color="rgb(198, 128, 255)" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 12 }}>
                  <div 
                    className="p-6 bg-black rounded-xl hover:bg-gray-900 hover:shadow-lg transition-all duration-300 cursor-target"
                  >
                    <div className="text-electric mb-4">
                      {highlight.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-100 mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {highlight.description}
                    </p>
                  </div>
                </ElectricBorder>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;