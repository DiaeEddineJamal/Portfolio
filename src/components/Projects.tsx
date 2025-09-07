import React, { useEffect, useMemo, useState, memo, lazy, Suspense } from 'react';
import { ExternalLink, Github, Zap, Shield, Smartphone, Palette, Database, Bot } from 'lucide-react';
import { fetchGithubRepos, GithubRepo, GITHUB_USERNAME } from '../utils/github';
import { optimizeImageUrl } from '../utils/performance';
import { MatrixText } from './ui/matrix-text';

// Lazy load ElectricBorder for better performance
const ElectricBorder = lazy(() => import('./ElectricBorder'));

// Optimized image component with lazy loading
const LazyImage = memo(({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Optimize image URL for better performance
  const optimizedSrc = useMemo(() => optimizeImageUrl(src, 800, 75), [src]);

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" />
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {error && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center rounded-lg">
          <span className="text-gray-400 text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

const Projects = memo(() => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGithubRepos(GITHUB_USERNAME).then(setRepos);
  }, []);

  const projects = useMemo(() => [
    {
      title: 'WolziFlix - Streaming Platform',
      description: 'A comprehensive streaming platform offering free high-quality content including anime, TV series, and movies. Features user authentication, content browsing, search functionality, and responsive design for optimal viewing experience across devices.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Next.js', 'Streaming APIs', 'Responsive Design', 'Vercel'],
      github: 'https://github.com/DiaeEddineJamal/wolzi-stream-hub',
      demo: 'https://wolzi-stream-hub.vercel.app/',
      icon: <Smartphone size={24} />,
      color: 'teal'
    },
    {
      title: 'Task Flow - Task Manager',
      description: 'A cross-platform task management application built with Flutter and Spring Boot. Features user authentication, task creation/management, priority filtering, and real-time collaboration with team members.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Flutter', 'Dart', 'Spring Boot', 'SQL', 'Java'],
      github: 'https://github.com/DiaeEddineJamal/Task_Manager_Backend',
      demo: null,
      icon: <Shield size={24} />,
      color: 'teal'
    },
    {
      title: 'Chatyemente Chat App',
      description: 'A real-time chat application developed in Java using JavaFX for the user interface. Enables instant messaging with a clean and intuitive desktop interface.',
      image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Java', 'JavaFX', 'Socket Programming'],
      github: 'https://github.com/DiaeEddineJamal/Chatyemente-',
      demo: null,
      icon: <Bot size={24} />,
      color: 'blue'
    },
    {
      title: 'Lilas Kokoro',
      description: 'An aesthetic wellbeing companion mobile app built with Flutter for Android and iOS. Features AI chat functionality, customizable reminders, love counters, and mindfulness tools to support mental health and daily wellness routines.',
      image: 'https://images.pexels.com/photos/4498318/pexels-photo-4498318.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Flutter', 'Dart', 'AI Integration', 'Mobile Development', 'Cross-platform'],
      github: 'https://github.com/DiaeEddineJamal/lilas_kokoro',
      demo: null,
      icon: <Smartphone size={24} />,
      color: 'orange'
    },
    {
      title: 'Fitness App - Finess',
      description: 'A comprehensive fitness tracking application designed to help users monitor their workouts, track progress, and maintain healthy lifestyle habits.',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Mobile Development', 'UI/UX Design', 'Health APIs'],
      github: 'https://github.com/DiaeEddineJamal/Finess-Fitness',
      demo: null,
      icon: <Smartphone size={24} />,
      color: 'blue'
    },
    {
      title: 'Storagentadoris Management',
      description: 'A storage house management system for inventory tracking and warehouse operations. Features include stock management, reporting, and administrative controls.',
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Python', 'Database Management', 'Inventory Systems'],
      github: 'https://github.com/DiaeEddineJamal/Storagentadoris-beta-0.2',
      demo: null,
      icon: <Database size={24} />,
      color: 'teal'
    },
    {
      title: 'Equation Solver',
      description: 'A mathematical equation solver application that can handle various types of equations and provide step-by-step solutions for educational purposes.',
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Mathematics', 'Algorithm Design', 'Problem Solving'],
      github: 'https://github.com/DiaeEddineJamal/equation-solver',
      demo: null,
      icon: <Palette size={24} />,
      color: 'blue'
    },
    {
      title: 'Marsa Maroc LLaMA 3.1 Model',
      description: 'Fine-tuned Meta LLaMA 3.1 model with 8.03 billion parameters, optimized for natural language understanding and generation. Quantized to 4.9GB and deployed on both Hugging Face and Ollama platforms for accessibility.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Machine Learning', 'LLaMA 3.1', 'Model Fine-tuning', 'NLP', 'AI'],
      github: 'https://huggingface.co/Luziv/Marsa-Maroc-modelx',
      demo: 'https://ollama.com/Luzivx/luzivila-model',
      icon: <Bot size={24} />,
      color: 'orange'
    },
    {
      title: 'Lila GPT - AI Assistant',
      description: 'An advanced AI-powered conversational assistant built with modern web technologies. Features intelligent natural language processing, context-aware responses, and seamless user interaction for enhanced productivity and support.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['AI/ML', 'Natural Language Processing', 'Web Development', 'API Integration', 'Vercel'],
      github: 'https://github.com/DiaeEddineJamal/lila-gpt',
      demo: 'https://lila-gpt.vercel.app/',
      icon: <Bot size={24} />,
      color: 'orange'
    },
    {
      title: 'Flappy Lila - Game Development',
      description: 'A reworked version of the classic Flappy Bird game built with Flutter, featuring personalized custom assets and refined game mechanics. Showcases mobile game development skills with smooth animations, collision detection, and engaging gameplay.',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Flutter', 'Dart', 'Game Development', 'Custom Assets', 'Mobile Gaming'],
      github: 'https://github.com/DiaeEddineJamal/flappy-lila',
      demo: null,
      icon: <Smartphone size={24} />,
      color: 'blue'
    }
  ], []);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100 hover:bg-blue-600 hover:text-white border-blue-200',
      teal: 'text-teal-600 bg-teal-100 hover:bg-teal-600 hover:text-white border-teal-200',
      orange: 'text-orange-600 bg-orange-100 hover:bg-orange-600 hover:text-white border-orange-200'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-6">
              <MatrixText
                text="Featured Projects"
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
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Suspense key={index} fallback={<div className="bg-gray-800 rounded-2xl h-96 animate-pulse" />}>
                <ElectricBorder color="rgb(198, 128, 255)" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
                <div 
                  className="group bg-black rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#2a2766] hover:border-electric"
                >
                  <div className="relative overflow-hidden">
                    <LazyImage 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  <div className="absolute top-4 right-4">
                    <div className={`p-3 rounded-full ${getColorClasses(project.color)} border transition-all duration-300`}>
                      {project.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-100 mb-3 group-hover:text-electric transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-500 ease-out font-semibold cursor-target shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Github size={18} />
                      View Code
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-electric/20 backdrop-blur-xl border border-electric/30 text-electric rounded-xl hover:bg-electric/30 hover:border-electric/50 transition-all duration-500 ease-out font-semibold cursor-target shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
              </ElectricBorder>
              </Suspense>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 transition-colors duration-300 cursor-target"
            >
              <Github size={20} />
              View All Projects on GitHub
            </a>
          </div>

          {/* GitHub section removed as requested */}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;