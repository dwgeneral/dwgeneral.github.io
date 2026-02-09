'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 延迟加载 3D 场景，优先渲染文字内容
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) {
    return (
      <div className={`${className} flex items-center justify-center bg-muted/30 rounded-lg`}>
        <div className="animate-pulse text-muted-foreground text-sm">Loading 3D...</div>
      </div>
    )
  }

  return (
    <Suspense 
      fallback={
        <div className={`${className} flex items-center justify-center bg-muted/30 rounded-lg`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={() => setIsLoaded(true)}
      />
    </Suspense>
  )
}
