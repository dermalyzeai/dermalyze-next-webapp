// components/ParticlesBackground.js
import React from 'react';
import styles from './backgroundAnimation.module.css'; // Import CSS styles

const ParticlesBackground = () => {
  const particleCount = 20; // Adjust number of particles as needed

  // Function to generate random positions for particles
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

  // Generate random positions for particles
  const particlePositions = generateRandomPosition();

  return (
    <div className={styles.background}>
      {particlePositions.map((style, index) => (
        <div key={index} className={styles.particle} style={style}></div>
      ))}
    </div>
  );
};

export default ParticlesBackground;
