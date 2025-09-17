import React, { useEffect, useRef } from 'react';

interface CircularGalleryProps {
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollEase?: number;
}

const CircularGallery: React.FC<CircularGalleryProps> = ({
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  scrollEase = 0.02
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(0);
  const targetScrollRef = useRef<number>(0);

  // Filler images - you can replace these with actual image URLs
  const images = [
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
    '/harshul.jpg',
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };

    const animate = () => {
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * scrollEase;
      
      const items = container.querySelectorAll('.gallery-item');
      items.forEach((item, index) => {
        const angle = (index / items.length) * Math.PI * 2 + scrollRef.current * 0.01;
        const radius = 200;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * bend;
        const z = Math.sin(angle) * radius;
        
        (item as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        (item as HTMLElement).style.opacity = (z + radius) / (radius * 2);
      });
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll);
    animate();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [bend, scrollEase]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
      }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="gallery-item"
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: `${borderRadius * 100}%`,
            overflow: 'hidden',
            transition: 'transform 0.1s ease-out',
            cursor: 'pointer',
          }}
        >
          <img
            src={image}
            alt={`Gallery image ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CircularGallery;
