import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/Layout';
import Canvas from '../components/Canvas';
import SingleFileUploader from '../components/FileUpload';
import SubmitButton from '../components/SubmitButton';
import BigBlock from '../components/BigBlock';
import LoadingSpinner from '../components/LoadingSpinner';
import Link from 'next/link';

const Home = () => {
  const [linkHref, setLinkHref] = useState('');

  useEffect(() => {
    const classificationTextElement = document.getElementById('classificationText');

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const newText = mutation.target.innerHTML;
          setLinkHref(`/posts/${newText}`);
        };
      };
    });

    if (classificationTextElement) {
      observer.observe(classificationTextElement, { childList: true });
    };

    return () => {
      if (classificationTextElement) {
        observer.disconnect();
      };
    };
  }, []);

  return (
    <div>
      <div style={{ padding: '5px' }}></div>
      <BigBlock />
      <div className={styles.instructions}>
        <h2>How to Use the App</h2>
        <ol>
          <li>Upload a clear image of your skin condition using the file uploader below.</li>
          <li>Click the "Run Dermalyze" button to run the image analysis.</li>
          <li>Wait for the AI to process the image. This may take up-to a minute.</li>
          <li>You will then see the result displayed on the screen.</li>
          <li>Click on the result to get more detailed information and recommendations.</li>
        </ol>
      </div>
      <h1 style={{ textAlign: 'center' }}>Skin Health AI</h1>
      <div style={{ textAlign: 'center' }}>
        <Canvas />
      </div>
      <SingleFileUploader />
      <SubmitButton />
      <LoadingSpinner />
      <div>
        <Link href={linkHref} legacyBehavior>
          <a>
            <h2 style={{ textAlign: 'center' }} id="classificationText">
              Run our AI for a result!
            </h2>
            </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;