// components/ParticlesBackground.js
import React from 'react';
import styles from './backgroundAnimation.module.css'; // Define your CSS styles

const ParticlesBackground = () => {
  return (
    <div className={styles.background}>
      {/* Add multiple divs to create particles */}
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      {/* Add more particles as needed */}
    </div>
  );
};

export default ParticlesBackground;
