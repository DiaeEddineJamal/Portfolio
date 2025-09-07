// Performance optimization utilities

// Image optimization helper
export const optimizeImageUrl = (url: string, width?: number, quality = 80): string => {
  // For external images (Pexels, etc.), add optimization parameters
  if (url.includes('pexels.com')) {
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams();
    
    if (width) {
      params.set('w', width.toString());
    }
    params.set('auto', 'compress');
    params.set('cs', 'tinysrgb');
    params.set('q', quality.toString());
    
    return `${baseUrl}?${params.toString()}`;
  }
  
  return url;
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = async (urls: string[]): Promise<void> => {
  try {
    await Promise.all(urls.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get device performance level
export const getDevicePerformance = (): 'low' | 'medium' | 'high' => {
  if (typeof window === 'undefined') return 'medium';
  
  // Check for mobile devices
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return 'low';
  }
  
  // Check memory (if available)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) {
    return 'low';
  } else if (memory && memory < 8) {
    return 'medium';
  }
  
  // Check CPU cores (if available)
  const cores = navigator.hardwareConcurrency;
  if (cores && cores < 4) {
    return 'low';
  } else if (cores && cores < 8) {
    return 'medium';
  }
  
  return 'high';
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void): void => {
  if (typeof performance === 'undefined') {
    fn();
    return;
  }
  
  const start = performance.now();
  fn();
  const end = performance.now();
  
  console.log(`${name} took ${end - start} milliseconds`);
};

// Memory usage monitoring (if available)
export const getMemoryUsage = (): any => {
  if (typeof performance === 'undefined' || !(performance as any).memory) {
    return null;
  }
  
  return (performance as any).memory;
};