// app/harshita-ai/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";

interface HeartPosition {
  left: number;
  bottom: number;
  fontSize: number;
  animationDelay: number;
}

export default function HarshitaAI() {
  const [heartPositions, setHeartPositions] = useState<HeartPosition[]>([]);

  useEffect(() => {
    // Generate random positions only on client side
    const positions = [...Array(12)].map(() => ({
      left: Math.random() * 100,
      bottom: Math.random() * 80,
      fontSize: 2 + Math.random() * 4,
      animationDelay: Math.random() * 4,
    }));
    setHeartPositions(positions);
  }, []);

  return (
    <div className="min-h-screen">
      {/* White header border with navigation */}
      <div className="w-full h-24 bg-white border-b-4 border-pink-300 shadow-lg flex items-center justify-center">
        <nav className="flex justify-center space-x-16">
          <Link
            href="/"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/photos"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Photos
          </Link>
          <Link
            href="/comments"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Comments
          </Link>
          <Link
            href="/contact"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Contact Him
          </Link>
          <Link
            href="/harshita-ai"
            className="text-2xl font-bold text-pink-700 hover:text-pink-900 transition-colors duration-300"
          >
            Harshita AI
          </Link>
        </nav>
      </div>
      <main className="relative min-h-screen bg-gradient-to-b from-pink-100 to-pink-300 flex flex-col items-center justify-center overflow-hidden">
        {/* Decorative floating hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {heartPositions.map((heart, i) => (
            <span
              key={i}
              className="absolute text-pink-300 opacity-60 animate-float"
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
        {/* Big logo */}
        <div className="flex flex-col items-center z-10">
          <div className="bg-white rounded-full shadow-2xl border-8 border-pink-300 p-12 mb-8 flex items-center justify-center animate-bounce-slow">
            <span className="text-pink-600 text-6xl md:text-8xl font-extrabold tracking-wide drop-shadow-lg select-none">
              Coming Soon
            </span>
          </div>
          <p className="text-2xl md:text-3xl text-pink-800 font-semibold text-center max-w-2xl mt-2">
            Harshita AI is on its way. Stay tuned for something amazing!
          </p>
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
          .animate-bounce-slow {
            animation: bounce 2.5s infinite alternate cubic-bezier(0.4,0,0.2,1);
          }
          @keyframes bounce {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-20px);
            }
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