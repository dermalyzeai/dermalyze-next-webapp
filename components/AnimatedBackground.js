// components/ParticlesBackground.js
import React, { useEffect, useState } from 'react';
import styles from './backgroundAnimation.module.css'; // Import CSS styles

const ParticlesBackground = () => {
  const particleCount = 20; // Adjust number of particles as needed
  const [particlePositions, setParticlePositions] = useState([]);

  useEffect(() => {
    const generateRandomPosition = () => {
      const positions = [];
      for (let i = 0; i < particleCount; i++) {
        const style = {
          left: `${Math.random() * 100}%`, // Random left position
          top: `${Math.random() * 100}%`, // Random top position
          animationDelay: `${Math.random() * 5}s`, // Random animation delay
        };
        positions.push(style);
      }
      return positions;
    };

    setParticlePositions(generateRandomPosition());

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setParticlePositions((prevPositions) =>
        prevPositions.map((pos) => ({
          ...pos,
          left: `${(parseFloat(pos.left) + (clientX / window.innerWidth - 0.5) * 10)}%`,
          top: `${(parseFloat(pos.top) + (clientY / window.innerHeight - 0.5) * 10)}%`,
        }))
      );
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particleCount]);

  return (
    <div className={styles.background}>
      {particlePositions.map((style, index) => (
        <div key={index} className={styles.particle} style={style}></div>
      ))}
    </div>
  );
};

export default ParticlesBackground;
