// app/photos/page.tsx
"use client";

import { useState, useEffect } from 'react';
import CircularGallery from './CircularGallery';

interface HeartPosition {
  left: number;
  bottom: number;
  fontSize: number;
  animationDelay: number;
}

export default function PhotosPage() {
  const [heartPositions, setHeartPositions] = useState<HeartPosition[]>([]);

  useEffect(() => {
    // Generate random positions only on client side
    const positions = [...Array(10)].map(() => ({
      left: Math.random() * 100,
      bottom: Math.random() * 80,
      fontSize: 2 + Math.random() * 3,
      animationDelay: Math.random() * 4,
    }));
    setHeartPositions(positions);
  }, []);

  return (
    <div className="min-h-screen">
      {/* White header border with navigation */}
      <div className="w-full h-24 bg-white border-b-4 border-pink-300 shadow-lg flex items-center justify-center">
        <nav className="flex justify-center space-x-16">
          <a
            href="/"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/photos"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Photos
          </a>
          <a
            href="/comments"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Comments
          </a>
          <a
            href="/contact"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Contact Him
          </a>
          <a
            href="/harshita-ai"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Harshita AI
          </a>
        </nav>
      </div>
      <main className="relative min-h-screen bg-gradient-to-b from-pink-100 to-pink-300 flex flex-col items-center justify-center overflow-hidden">
        {/* Decorative floating hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {heartPositions.map((heart, i) => (
            <span
              key={i}
              className="absolute text-pink-200 opacity-50 animate-float"
              style={{
                left: `${heart.left}%`,
                bottom: `${heart.bottom}%`,
                fontSize: `${heart.fontSize}rem`,
                animationDelay: `${heart.animationDelay}s`,
              }}
            >
              ♥
            </span>
          ))}
        </div>
        {/* Circular Gallery */}
        <div style={{ height: '600px', position: 'relative' }}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
        </div>
        <style jsx>{`
          @keyframes float {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-400px) scale(1.3);
              opacity: 0;
            }
          }
          .animate-float {
            animation: float 5s linear infinite;
          }
        `}</style>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t-4 border-pink-300 py-4 text-center">
        <p className="text-lg text-pink-700 font-semibold">
          Made with love by his friend Kamalesh Motamarri
        </p>
      </footer>
    </div>
  );
} 