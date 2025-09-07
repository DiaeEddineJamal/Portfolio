'use client'

import { SplineScene } from "./ui/spline";
import { Card } from "./ui/card"
import { Spotlight } from "./ui/spotlight"
import { MatrixText } from "./ui/matrix-text"
 
export function Interactive3D() {
  return (
    <section className="py-12 md:py-20 relative overflow-visible">
      <div className="container mx-auto px-4 md:px-6 overflow-visible">
        <div className="max-w-7xl mx-auto overflow-visible">
          <Card className="w-full h-[400px] md:h-[500px] bg-black/[0.96] relative overflow-visible border-0 transition-all duration-300">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            
            <div className="flex flex-col md:flex-row h-full">
              {/* Content section */}
              <div className="flex-1 p-4 md:p-8 relative z-10 flex flex-col justify-center">
                <div className="mb-4 md:mb-6 text-left">
                  <MatrixText
                    text="Portfolio Showcase"
                    className="text-xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 justify-start"
                    initialDelay={200}
                    letterAnimationDuration={500}
                    letterInterval={100}
                    scrollTriggered={true}
                    matrixColor="rgb(198, 128, 255)"
                  />
                </div>
                <p className="text-sm md:text-base text-neutral-300 max-w-lg leading-relaxed">
                  Explore my portfolio of innovative software projects. From AI-powered applications 
                  to full-stack web solutions, discover the practical work that showcases my technical expertise.
                </p>
                <div className="mt-4 md:mt-8">
                  <button 
                    onClick={() => {
                      const projectsSection = document.querySelector('#projects');
                      if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-electric/20 backdrop-blur-xl border border-electric/30 text-electric rounded-xl hover:bg-electric/30 hover:border-electric/50 transition-all duration-500 ease-out font-semibold cursor-target shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    View Projects
                  </button>
                </div>
              </div>

              {/* 3D Scene section */}
              <div className="flex-1 relative overflow-visible min-h-[200px] md:min-h-0">
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="absolute inset-0 overflow-visible"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}