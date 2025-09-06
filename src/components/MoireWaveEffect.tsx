'use client';

import { useEffect, useRef } from 'react';

interface GameEffectProps {
  className?: string;
}

export default function GameEffect({ className = '' }: GameEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseXRef = useRef(50);
  const mouseYRef = useRef(50);
  const animationIdRef = useRef<number>();
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = (e.clientX / window.innerWidth) * 100;
      mouseYRef.current = (e.clientY / window.innerHeight) * 100;
      
      // Update CSS custom properties for efficient updates
      document.documentElement.style.setProperty('--mouse-x', `${mouseXRef.current}%`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseYRef.current}%`);
    };

    const animate = () => {
      const time = Date.now() * 0.001;
      document.documentElement.style.setProperty('--time', time.toString());
      animationIdRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef}
        className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
        style={{ zIndex: -1 }}
      >
        {/* Subtle moving dots */}
        <div className="game-dots absolute inset-0" />
        
        {/* Gentle grid overlay */}
        <div className="game-grid absolute inset-0" />
      </div>
      
      <style jsx global>{`
        :root {
          --mouse-x: 50%;
          --mouse-y: 50%;
          --time: 0;
        }
        
        /* Lightweight animated dots - visible in both modes */
        .game-dots {
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(255, 167, 196, 0.15) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(0, 175, 154, 0.12) 1px, transparent 1px);
          background-size: 60px 60px, 80px 80px;
          animation: drift 20s linear infinite;
          opacity: 0.4;
        }
        
        .dark .game-dots {
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(255, 167, 196, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(0, 175, 154, 0.15) 1px, transparent 1px);
          opacity: 0.5;
        }
        
        .game-grid {
          background-image: 
            linear-gradient(rgba(255, 167, 196, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 175, 154, 0.04) 1px, transparent 1px);
          background-size: 100px 100px;
          animation: grid-pulse 8s ease-in-out infinite;
          opacity: 0.3;
        }
        
        .dark .game-grid {
          background-image: 
            linear-gradient(rgba(255, 167, 196, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 175, 154, 0.06) 1px, transparent 1px);
          opacity: 0.4;
        }
        
        /* Glass morphism card effects */
        .card, [class*="card"], article, .project-card, .blog-card {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(var(--card), 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          border-radius: 16px;
        }
        
        .dark .card, 
        .dark [class*="card"], 
        .dark article, 
        .dark .project-card, 
        .dark .blog-card {
          background: rgba(var(--card), 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .card::before, 
        [class*="card"]::before, 
        article::before, 
        .project-card::before, 
        .blog-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 167, 196, 0.05) 0%,
            transparent 50%,
            rgba(0, 175, 154, 0.03) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        
        .card:hover::before,
        [class*="card"]:hover::before,
        article:hover::before,
        .project-card:hover::before,
        .blog-card:hover::before {
          opacity: 1;
        }
        
        .card:hover,
        [class*="card"]:hover,
        article:hover,
        .project-card:hover,
        .blog-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(255, 167, 196, 0.3);
          box-shadow: 
            0 10px 40px rgba(255, 167, 196, 0.15),
            0 5px 20px rgba(0, 175, 154, 0.1),
            0 0 20px rgba(255, 167, 196, 0.08);
        }
        
        .dark .card:hover,
        .dark [class*="card"]:hover,
        .dark article:hover,
        .dark .project-card:hover,
        .dark .blog-card:hover {
          box-shadow: 
            0 10px 40px rgba(255, 167, 196, 0.2),
            0 5px 20px rgba(0, 175, 154, 0.15),
            0 0 20px rgba(255, 167, 196, 0.1);
        }
        
        /* Simple Glass Effect */
        .glass-button, .glass-pill {
          position: relative;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(209, 213, 219, 0.3);
          border-radius: 12px;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .glass-pill {
          border-radius: 50px;
          padding: 8px 16px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .glass-button-primary {
          background: var(--green);
          border-color: var(--green);
          color: white;
        }
        
        .glass-button:hover, .glass-pill:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.65);
          border-color: rgba(209, 213, 219, 0.4);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }
        
        .glass-button-primary:hover {
          background: var(--green);
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(0, 175, 154, 0.2);
        }
        
        /* Dark Mode */
        .dark .glass-button, .dark .glass-pill {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        .dark .glass-button:hover, .dark .glass-pill:hover {
          background: rgba(255, 255, 255, 0.13);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .dark .glass-button-primary {
          background: var(--green);
          border-color: var(--green);
          color: white;
        }
        
        .dark .glass-button-primary:hover {
          background: var(--green);
          opacity: 0.9;
          box-shadow: 0 2px 6px rgba(0, 175, 154, 0.3);
        }
        
        /* Apply to existing buttons */
        button, .btn, a[role="button"] {
          @apply glass-button;
        }
        
        /* Glass morphism header */
        header {
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          background: rgba(var(--background), 0.85);
          border: 1px solid rgba(255, 167, 196, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .dark header {
          background: rgba(var(--background), 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        /* Text hover colors */
        a:not([role="button"]):hover {
          color: var(--pink);
          transition: color 0.3s ease;
        }
        
        .dark a:not([role="button"]):hover {
          color: var(--pink);
        }
        
        /* Headings hover */
        h1:hover, h2:hover, h3:hover, h4:hover {
          color: var(--green);
          transition: color 0.3s ease;
          cursor: default;
        }
        
        /* Paragraph emphasis on hover */
        p:hover strong {
          color: var(--green);
          transition: color 0.3s ease;
        }
        
        /* List items */
        li:hover {
          color: var(--textNormal);
        }
        
        /* Special text elements */
        .hover-green:hover {
          color: var(--green);
          transition: color 0.3s ease;
        }
        
        .hover-pink:hover {
          color: var(--pink);
          transition: color 0.3s ease;
        }
        
        @keyframes drift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-10px, -5px); }
          50% { transform: translate(5px, -10px); }
          75% { transform: translate(-5px, 5px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.1; }
        }
        
        /* Responsive performance optimization */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Mobile optimization - simpler effects */
        @media (max-width: 768px) {
          .game-dots, .game-grid {
            opacity: 0.1;
            animation: none;
          }
          
          .card:hover, [class*="card"]:hover, article:hover {
            transform: translateY(-2px) scale(1.01);
          }
        }
      `}</style>
    </>
  );
}