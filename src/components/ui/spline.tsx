"use client"

import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))
import { prefersReducedMotion, getDevicePerformance, createIntersectionObserver } from '@/utils/performance'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  const reducedMotion = useMemo(() => prefersReducedMotion(), [])
  const perf = useMemo(() => getDevicePerformance(), [])

  const enableWebGL = !reducedMotion && perf !== 'low'

  useEffect(() => {
    if (!containerRef.current) return
    const observer = createIntersectionObserver((entries) => {
      for (const entry of entries) {
        setIsVisible(entry.isIntersecting)
      }
    }, { threshold: 0.2, rootMargin: '100px' })
    if (observer) observer.observe(containerRef.current)
    return () => {
      if (observer) observer.disconnect()
    }
  }, [])

  const scaleStyle = useMemo(() => {
    if (typeof window === 'undefined') return 'scale(1) translateZ(0)'
    if (window.innerWidth >= 1024) return 'scale(1.15) translateZ(0)'
    if (window.innerWidth >= 768) return 'scale(1.0) translateZ(0)'
    return 'scale(0.85) translateZ(0)'
  }, [])

  return (
    <div ref={containerRef} className={`w-full h-full overflow-visible ${className || ''}`}>
      {enableWebGL && isVisible ? (
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
              transform: scaleStyle,
              transformOrigin: 'center center'
            }}
            onLoad={() => {
              if (typeof window !== 'undefined') {
                const canvas = document.querySelector('canvas') as HTMLCanvasElement | null
                if (canvas) {
                  canvas.style.transform = scaleStyle
                  canvas.style.transformOrigin = 'center center'
                  canvas.style.willChange = 'transform'
                }
              }
            }}
          />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="rounded-lg border border-muted p-4 text-muted-foreground text-sm">
            {reducedMotion ? 'Animations disabled (reduced motion)' : perf === 'low' ? '3D disabled on low-performance device' : 'Loading...'}
          </div>
        </div>
      )}
    </div>
  )
}