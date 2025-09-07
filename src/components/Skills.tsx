import React, { useEffect, useMemo, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { aggregateLanguages, fetchGithubRepos, GITHUB_USERNAME } from '../utils/github';
import ElectricBorder from './ElectricBorder';
import { MatrixText } from './ui/matrix-text';

const Skills = () => {
  const [ghLangCounts, setGhLangCounts] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    fetchGithubRepos(GITHUB_USERNAME).then((repos) => setGhLangCounts(aggregateLanguages(repos)));
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % skillCategories.length);
      }, 4000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % skillCategories.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const inferred = useMemo(() => Object.entries(ghLangCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name]) => ({ name, level: 80 })), [ghLangCounts]);

  const skillCategories = useMemo(() => [
    {
      title: 'Frontend',
      color: 'blue',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'JavaScript', level: 95 },
        { name: 'HTML/CSS', level: 98 }
      ]
    },
    {
      title: 'Backend',
      color: 'teal',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 85 },
        { name: 'Express.js', level: 90 },
        { name: 'REST APIs', level: 92 },
        { name: 'GraphQL', level: 75 },
        { name: 'Microservices', level: 80 }
      ]
    },
    {
      title: 'Database & Tools',
      color: 'orange',
      skills: [
        { name: 'PostgreSQL', level: 88 },
        { name: 'MongoDB', level: 85 },
        { name: 'Git', level: 95 },
        { name: 'Docker', level: 82 },
        { name: 'AWS', level: 78 },
        { name: 'Linux', level: 85 }
      ]
    },
    {
      title: 'From My GitHub',
      color: 'blue',
      skills: inferred.length ? inferred : [
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 85 }
      ]
    }
  ], [inferred]);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 bg-blue-100 border-blue-200 text-blue-800',
      teal: 'from-teal-500 to-teal-600 bg-teal-100 border-teal-200 text-teal-800',
      orange: 'from-orange-500 to-orange-600 bg-orange-100 border-orange-200 text-orange-800'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="skills" className="py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-6">
              <MatrixText
                text="Skills & Expertise"
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
              Explore my technical expertise through this interactive carousel
            </p>
          </div>

          {/* Carousel Container */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 hover:border-white/30 transition-all duration-500 ease-out shadow-lg hover:shadow-xl transform hover:scale-110 cursor-target"
              aria-label="Previous skill category"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 hover:border-white/30 transition-all duration-500 ease-out shadow-lg hover:shadow-xl transform hover:scale-110 cursor-target"
              aria-label="Next skill category"
            >
              <ChevronRight size={24} />
            </button>

            {/* Carousel Track */}
            <div 
              ref={carouselRef}
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-2xl mx-auto">
                    <ElectricBorder color="rgb(198, 128, 255)" speed={1} chaos={0.5} thickness={2} style={{ borderRadius: 16 }}>
                      <div className="bg-black/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-target transform hover:scale-105">
                        <div className="text-center mb-8">
                          <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-4 ${getColorClasses(category.color).split(' ').slice(2).join(' ')} cursor-target shadow-lg`}>
                            {category.title}
                          </div>
                          <div className="w-16 h-1 bg-electric mx-auto"></div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {category.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="group">
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-100 font-medium text-lg">{skill.name}</span>
                                <span className="text-electric font-semibold">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/10">
                                <div 
                                  className={`h-3 bg-gradient-to-r ${getColorClasses(category.color).split(' ').slice(0, 2).join(' ')} rounded-full transition-all duration-1000 ease-out group-hover:scale-105 shadow-lg`}
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ElectricBorder>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {skillCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ease-out cursor-target ${
                    index === currentIndex
                      ? 'bg-electric shadow-lg shadow-electric/50 scale-125'
                      : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                  }`}
                  aria-label={`Go to ${skillCategories[index].title} skills`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;