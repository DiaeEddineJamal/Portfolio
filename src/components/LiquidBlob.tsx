import React, { useEffect, useRef } from 'react';

type LiquidBlobProps = {
  className?: string;
  color?: string;
};

// Simple value-noise based blobby shape that reacts to mouse movement
const LiquidBlob: React.FC<LiquidBlobProps> = ({ className, color = '#E7C049' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / width - 0.5;
      mouseRef.current.y = e.clientY / height - 0.5;
    };
    window.addEventListener('mousemove', onMove);
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    // Lightweight pseudo noise
    const noise = (x: number, y: number) => {
      const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return s - Math.floor(s);
    };

    const draw = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);

      const baseRadius = Math.min(width, height) * 0.42;
      const points = 120;
      const { x: mx, y: my } = mouseRef.current;
      const influence = 60 * Math.hypot(mx, my);

      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const a = (i / points) * Math.PI * 2;
        const nx = Math.cos(a) * 0.8 + t * 0.6;
        const ny = Math.sin(a) * 0.8 + t * 0.6;
        const n = noise(nx, ny);
        const r = baseRadius + (n - 0.5) * 90 + influence;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Fill with soft radial gradient similar to reference blob
      const grad = ctx.createRadialGradient(0, 0, baseRadius * 0.2, 0, 0, baseRadius * 1.2);
      grad.addColorStop(0, color);
      grad.addColorStop(1, '#d4a017');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LiquidBlob;


