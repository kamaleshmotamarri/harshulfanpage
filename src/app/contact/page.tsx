// app/contact/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";

const contacts = [
  {
    icon: "/phone.png", // Use phone.png from public/
    label: "Phone",
    value: "+1 612 703 0700",
  },
  {
    icon: "/gmail.png", // Use gmail.png from public/
    label: "Email",
    value: "neelahar000@isd284.com",
  },
  {
    icon: "/insta.png", // Use insta.png from public/
    label: "Instagram",
    value: "@harshul2026",
    link: "https://www.instagram.com/harshul2026/?utm_source=ig_web_button_share_sheet",
  },
  {
    icon: "emoji-earth", // Use earth emoji for location
    label: "Location",
    value: "6677 Coach House Ln Corcoran MN",
  },
];

interface HeartPosition {
  left: number;
  bottom: number;
  fontSize: number;
  animationDelay: number;
}

export default function ContactPage() {
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
        {/* Contact Card */}
        <div className="flex flex-col items-center z-10">
          <div className="bg-white rounded-3xl shadow-2xl border-8 border-pink-300 px-10 py-12 mb-8 flex flex-col items-center animate-bounce-slow">
            <h1 className="text-5xl md:text-7xl font-extrabold text-pink-700 mb-6 text-center drop-shadow-lg">
              Contact Him
            </h1>
            <div className="flex flex-col space-y-8 mt-4 w-full max-w-md">
              {contacts.map((c, i) => (
                <div key={i} className="flex items-center space-x-6">
                  {c.icon !== "emoji-earth" && (
                    <Image
                      src={c.icon}
                      alt={c.label + " icon"}
                      width={64}
                      height={64}
                      className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-md"
                    />
                  )}
                  {c.icon === "emoji-earth" && (
                    <span className="text-5xl md:text-6xl mr-2 select-none">🌍</span>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-semibold text-pink-800">{c.label}</span>
                    {c.link ? (
                      <a 
                        href={c.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg md:text-xl text-pink-600 font-mono select-all hover:text-pink-800 transition-colors duration-200"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-lg md:text-xl text-pink-600 font-mono select-all">
                        {c.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
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