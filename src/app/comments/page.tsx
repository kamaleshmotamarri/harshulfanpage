// app/comments/page.tsx
"use client";

import { useState, useEffect } from "react";

interface LoveComment {
  id: string;
  name: string;
  comment: string;
  timestamp: number;
}

interface HeartPosition {
  left: number;
  bottom: number;
  fontSize: number;
  animationDelay: number;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<LoveComment[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [heartPositions, setHeartPositions] = useState<HeartPosition[]>([]);

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem('loveComments');
    if (savedComments) {
      try {
        const parsedComments = JSON.parse(savedComments);
        setComments(parsedComments);
      } catch (error) {
        console.error('Error loading comments from localStorage:', error);
        setComments([]);
      }
    }
  }, []);

  // Save comments to localStorage whenever comments change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('loveComments', JSON.stringify(comments));
    }
  }, [comments]);

  // Generate random heart positions only on client side
  useEffect(() => {
    const positions = [...Array(8)].map(() => ({
      left: Math.random() * 100,
      bottom: Math.random() * 80,
      fontSize: 2 + Math.random() * 3,
      animationDelay: Math.random() * 4,
    }));
    setHeartPositions(positions);
  }, []);

  const handleAddComment = () => {
    setShowInput(true);
    setInput("");
    setName("");
    setError("");
  };

  const handleDelete = () => {
    setShowInput(false);
    setInput("");
    setName("");
    setError("");
  };

  const handleComment = () => {
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }
    if (!input.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    if (comments.length >= 100) {
      setError("Maximum of 100 comments reached.");
      return;
    }
    const newComment: LoveComment = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      comment: input.trim(),
      timestamp: Date.now()
    };
    setComments([newComment, ...comments].slice(0, 100));
    setShowInput(false);
    setInput("");
    setName("");
    setError("");
  };


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
      {/* Love Arrow GIF at top left */}
      <img
        src="/lovearrow.gif"
        alt="Love Arrow"
        className="absolute left-4 top-28 w-24 h-24 md:w-32 md:h-32 z-20 select-none pointer-events-none"
        style={{ objectFit: 'contain' }}
      />
      <main className="relative min-h-screen bg-gradient-to-b from-pink-100 to-pink-300 flex flex-col items-center py-12 overflow-hidden">
        {/* Decorative floating hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {heartPositions.map((heart, i) => (
            <span
              key={i}
              className="absolute text-pink-200 opacity-40 animate-float"
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
        <div className="flex flex-col items-center z-10 w-full max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-pink-700 mb-8 text-center drop-shadow-lg">
            Love Comments
          </h1>
          <button
            onClick={handleAddComment}
            disabled={showInput || comments.length >= 100}
            className="mb-8 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add a Love Comment
          </button>
          {showInput && (
            <div className="w-full bg-white rounded-2xl border-4 border-pink-300 shadow-xl p-6 mb-8 flex flex-col animate-bounce-slow">
              <input
                className="w-full p-3 text-lg border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-400 mb-4"
                placeholder="Your name..."
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={32}
              />
              <textarea
                className="w-full h-28 p-4 text-lg border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-400 resize-none mb-4"
                placeholder="Write your love comment..."
                value={input}
                onChange={e => setInput(e.target.value)}
                maxLength={200}
              />
              {error && <span className="text-red-500 mb-2">{error}</span>}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow transition-all duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={handleComment}
                  className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow transition-all duration-200"
                >
                  Comment
                </button>
              </div>
            </div>
          )}
          <div className="w-full flex flex-col space-y-6">
            {comments.length === 0 && (
              <div className="text-center text-pink-600 text-xl font-medium opacity-70">
                No love comments yet. Be the first to share some love!
              </div>
            )}
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-white border-2 border-pink-200 rounded-xl shadow-md px-6 py-4 text-lg text-pink-800 font-medium animate-fade-in"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-pink-600 font-bold text-base">{c.name}</div>
                  <div className="text-pink-400 text-sm">
                    {new Date(c.timestamp).toLocaleDateString()} {new Date(c.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div>{c.comment}</div>
              </div>
            ))}
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
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.7s;
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