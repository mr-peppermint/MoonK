import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function MultiversePortalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Performance based on screen size
    const isMobile = width < 768;
    const particleCount = isMobile ? 100 : 250;
    const warpLineCount = isMobile ? 20 : 50;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let time = 0;

    // Parse RGB from theme or use default if missing
    // theme.rgb might be "r, g, b" e.g. "255, 0, 0"
    const getBaseRGB = () => {
      if (theme.rgb) return theme.rgb;
      // Fallback parsing
      if (theme.color && theme.color.startsWith('#')) {
        const hex = theme.color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
      }
      return '255, 255, 255';
    };

    class Particle {
      x: number = 0;
      y: number = 0;
      angle: number;
      radius: number;
      speed: number;
      size: number;
      alpha: number;
      z: number;
      baseRadius: number;
      
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.baseRadius = Math.random() * (Math.min(width, height) / 1.5);
        this.radius = this.baseRadius;
        this.speed = (Math.random() * 0.02 + 0.002) * (Math.random() > 0.5 ? 1 : -1);
        this.z = Math.random() * 100;
        this.size = (Math.random() * 2 + 0.5) * (100 / (this.z + 1));
        this.alpha = Math.random() * 0.5 + 0.1;
        this.updatePosition();
      }

      updatePosition() {
        const centerX = width / 2;
        const centerY = height / 2;
        // Swirl effect
        const currentRadius = this.radius + Math.sin(time * 0.001 + this.angle) * 20;
        this.x = centerX + Math.cos(this.angle) * currentRadius;
        this.y = centerY + Math.sin(this.angle) * currentRadius;
      }

      update() {
        this.angle += this.speed;
        
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let targetRadius = this.baseRadius;
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          targetRadius += force * 50; // Push out slightly
        }
        
        this.radius += (targetRadius - this.radius) * 0.05;
        this.updatePosition();
        
        // Pulse size
        this.size = (Math.random() * 2 + 0.5) * (100 / (this.z + 1)) + Math.sin(time * 0.005 + this.z) * 0.5;
        if (this.size < 0.1) this.size = 0.1;
      }

      draw(ctx: CanvasRenderingContext2D, rgb: string) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${this.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${rgb}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class WarpLine {
      angle: number;
      distance: number;
      speed: number;
      length: number;
      
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * (Math.min(width, height) / 2);
        this.speed = Math.random() * 5 + 2;
        this.length = Math.random() * 50 + 20;
      }

      update() {
        this.distance += this.speed;
        if (this.distance > Math.max(width, height)) {
          this.distance = 0;
          this.angle = Math.random() * Math.PI * 2;
        }
      }

      draw(ctx: CanvasRenderingContext2D, rgb: string) {
        const centerX = width / 2;
        const centerY = height / 2;
        const x1 = centerX + Math.cos(this.angle) * this.distance;
        const y1 = centerY + Math.sin(this.angle) * this.distance;
        const x2 = centerX + Math.cos(this.angle) * (this.distance + this.length);
        const y2 = centerY + Math.sin(this.angle) * (this.distance + this.length);
        
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `rgba(${rgb}, 0)`);
        gradient.addColorStop(1, `rgba(${rgb}, 0.5)`);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());
    const warpLines: WarpLine[] = Array.from({ length: warpLineCount }, () => new WarpLine());

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // For mobile touch
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const animate = () => {
      time += 16; // approx 60fps step
      const rgb = getBaseRGB();
      
      // Clear with trailing effect
      ctx.fillStyle = 'rgba(5, 5, 8, 0.15)'; // Dark background matching design
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw central glow / core
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.min(width, height) / 2
      );
      
      const pulse = Math.sin(time * 0.002) * 0.1;
      
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 + pulse})`);
      coreGradient.addColorStop(0.1, `rgba(${rgb}, ${0.4 + pulse})`);
      coreGradient.addColorStop(0.4, `rgba(${rgb}, 0.05)`);
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw pulsating rings
      ctx.beginPath();
      const ringRadius = (time * 0.05) % (Math.min(width, height) / 2);
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb}, ${(1 - ringRadius / (Math.min(width, height) / 2)) * 0.3})`;
      ctx.lineWidth = 1 + (1 - ringRadius / (Math.min(width, height) / 2)) * 2;
      ctx.stroke();

      // Update and draw warp lines
      warpLines.forEach(line => {
        line.update();
        line.draw(ctx, rgb);
      });

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx, rgb);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-create effect on theme change

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
      style={{ 
        background: '#050508',
        '--glow-color': theme.color 
      } as React.CSSProperties}
    />
  );
}
