'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={`w-full h-full overflow-visible ${className || ''}`}>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-2 border-electric border-t-transparent"></div>
          </div>
        }
      >
        <Spline
          scene={scene}
          style={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'visible',
            transform: window.innerWidth >= 1024 ? 'scale(1.2) translateZ(0)' : window.innerWidth >= 768 ? 'scale(1.0) translateZ(0)' : 'scale(0.8) translateZ(0)',
            transformOrigin: 'center center'
          }}
          onLoad={() => {
            // Responsive scaling based on screen size
            if (typeof window !== 'undefined') {
              const canvas = document.querySelector('canvas');
              if (canvas) {
                if (window.innerWidth >= 1024) {
                  // Large screens (PC/laptop)
                  canvas.style.transform = 'scale(1.2) translateZ(0)';
                } else if (window.innerWidth >= 768) {
                  // Medium screens (tablet)
                  canvas.style.transform = 'scale(1.0) translateZ(0)';
                } else {
                  // Small screens (mobile)
                  canvas.style.transform = 'scale(0.8) translateZ(0)';
                }
                canvas.style.transformOrigin = 'center center';
              }
            }
          }}
        />
      </Suspense>
    </div>
  )
}