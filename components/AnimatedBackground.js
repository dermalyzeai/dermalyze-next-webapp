// components/ParticlesBackground.js
import React, { useEffect, useRef } from 'react';
import styles from './backgroundAnimation.module.css';

const ParticlesBackground = () => {
  const particleCount = 20; // Adjust number of particles as needed
  const particlesRef = useRef([]);

  useEffect(() => {
    const generateRandomPosition = () => {
      const positions = [];
      for (let i = 0; i < particleCount; i++) {
        positions.push({
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: `${Math.random() * 5}s`, // Random animation delay
        });
      }
      return positions;
    };

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // Normalize to -1 to 1 range
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // Normalize to -1 to 1 range
      particlesRef.current.forEach((particle) => {
        if (particle) {
          particle.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
        }
      });
    };

    const particlePositions = generateRandomPosition();
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        particle.style.left = `${particlePositions[index].left}%`;
        particle.style.top = `${particlePositions[index].top}%`;
        particle.style.animationDelay = particlePositions[index].animationDelay;
      }
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particleCount]);

  return (
    <div className={styles.background}>
      {Array.from({ length: particleCount }).map((_, index) => (
        <div
          key={index}
          className={styles.particle}
          ref={(el) => (particlesRef.current[index] = el)}
        ></div>
      ))}
    </div>
  );
};

export default ParticlesBackground;
