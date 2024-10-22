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
import Questions from '../components/Questions';
import Dropdown from '../components/Dropdown.js';
import * as tf from '@tensorflow/tfjs';

const Home = () => {
  const [linkHref, setLinkHref] = useState('');
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    const classificationTextElement = document.getElementById('classificationText');

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const newText = mutation.target.innerHTML;
          setLinkHref(`/posts/${newText}`);
        }
      }
    });

    if (classificationTextElement) {
      observer.observe(classificationTextElement, { childList: true });
    }

    return () => {
      if (classificationTextElement) {
        observer.disconnect();
      }
    };
  }, []);

  const updateQuestionsInParent = (newQuestions) => {
    setQuestions(newQuestions);
  };

  const handleRunMain = async () => {
    try {
      var el = document.getElementById('spinner');
      el.style.display = 'block';
      var imgFile = document.getElementById("file").files[0];
  
      // Create an image element to load the uploaded file
      const img = document.createElement('img');
      img.src = URL.createObjectURL(imgFile);
  
      img.onload = async function () {
        // Step 1: Create a canvas for the 224x224 box
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 224;
        canvas.height = 224;
  
        // Calculate aspect ratio and scaling
        const hRatio = 224 / img.width;
        const vRatio = 224 / img.height;
        const ratio = Math.max(hRatio, vRatio); // Ensure the image fills the 224x224 area
  
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
  
        // Calculate offsets to center the image within the canvas (if it gets cropped)
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;
  
        // Draw the scaled image on the canvas, cropping excess
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  
        // Step 2: Convert the canvas content to a tensor
        let imageTensor = tf.browser.fromPixels(canvas)
          .toFloat()
          .div(tf.scalar(127)).sub(tf.scalar(1)) // Normalize to [0, 1]
          .expandDims(); // Add batch dimension (1, 224, 224, 3)
  
        // Step 3: Load the model and make the prediction
        const model = await tf.loadLayersModel('dermalyze_tensorflow_js/model.json');
  
        const prediction = model.predict(imageTensor);
  
        const predictedClass = tf.argMax(prediction, 1).dataSync()[0];
        const confidence = prediction.max().dataSync()[0];
        console.log(prediction.dataSync());
  
        // Update the UI with the result
        const classificationTextElement = document.getElementById('classificationText');
        classificationTextElement.innerHTML = `Prediction: ${predictedClass} (Confidence: ${(confidence * 100).toFixed(2)}%)`;
  
        el.style.display = 'none';
      };
  
    } catch (error) {
      console.error('Error running the AI model:', error);
    }
  };

  return (
    <div>
      <div style={{ padding: '5px' }}></div>
      <BigBlock />
      <div className={styles.instructions}>
        <h2>How to Use the App</h2>
        <ol>
          <li>Upload a clear image of your skin condition using the file uploader below.</li>
          <li>Click the "Run Dermalyze" button to run the image analysis.</li>
          <li>Wait for the AI to process the image. This may take up to a minute.</li>
          <li>You will then see the result displayed on the screen.</li>
          <li>Click on the result to get more detailed information and recommendations.</li>
        </ol>
      </div>
      <h1 style={{ textAlign: 'center' }}>Skin Health AI</h1>
      <div style={{ textAlign: 'center' }}>
        <Canvas />
      </div>
      <SingleFileUploader />
      <SubmitButton handleRunMain={handleRunMain} />
      <LoadingSpinner />
      <Dropdown style={{ display: 'Block' }} />
      <div>
        <Link href={linkHref} legacyBehavior>
          <a>
            <h2 style={{ textAlign: 'center' }} id="classificationText">
              Run our AI for a result!
            </h2>
          </a>
        </Link>
      </div>
      <Questions questions={questions} />
    </div>
  );
};

export default Home;
