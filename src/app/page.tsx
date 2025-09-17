// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [hearts, setHearts] = useState<{ id: number; left: string }[]>([]);

  // Add random hearts every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Remove hearts after they float up
  useEffect(() => {
    const timeout = setInterval(() => {
      setHearts((prev) => prev.slice(1));
    }, 4000);

    return () => clearInterval(timeout);
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
      
      {/* Love Arrow GIF at top left */}
      <Image
        src="/lovearrow.gif"
        alt="Love Arrow"
        width={128}
        height={128}
        className="absolute left-4 top-28 w-24 h-24 md:w-32 md:h-32 z-20 select-none pointer-events-none"
        style={{ objectFit: 'contain' }}
      />

      <main className="relative min-h-screen bg-gradient-to-b from-pink-100 to-pink-300 flex flex-col items-center justify-center overflow-hidden">
        {/* Floating hearts */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 text-pink-500 text-2xl animate-float"
            style={{ left: heart.left }}
          >
            ❤️
          </div>
        ))}

        {/* Harshul Photo */}
        <div className="text-center mb-6">
          <span className="text-3xl md:text-4xl font-bold text-pink-700 typing-animation">
            We Love You Harshul
          </span>
        </div>
        <Image
          src="/harshul.jpg"
          alt="Harshul"
          width={224}
          height={224}
          className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full border-8 border-pink-300 shadow-xl mb-6 mt-2"
        />
        {/* Main Content */}
        <h1 className="text-5xl md:text-7xl font-bold text-pink-700 mb-4 text-center">
          Harshul Fan Page
        </h1>
        <p className="text-xl md:text-2xl text-pink-800 text-center max-w-xl">
          Welcome to the ultimate Harshul fan page! Show your love and share your
          thoughts in the comments.
        </p>

        {/* Floating Hearts Animation */}
        <style jsx>{`
          @keyframes float {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-500px) scale(1.5);
              opacity: 0;
            }
          }

          .animate-float {
            animation: float 4s linear infinite;
          }

          @keyframes typewriter {
            0% {
              width: 0;
            }
            50% {
              width: 100%;
            }
            100% {
              width: 0;
            }
          }

          .typing-animation {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            border-right: 4px solid pink;
            animation: typewriter 4s steps(20) infinite;
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
