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
import { RunMainPrediction } from '../utils/predictionHelper.js';
import DermalyzeImageBlock from '../components/DermalyzeImageApp.js';

const Home = () => {
  const [linkHref, setLinkHref] = useState('');
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle]=useState([]);
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

  const updateQuestionsInParent = (newQuestions,newQuizTitle) => {
    setQuestions(newQuestions);
    setQuizTitle(newQuizTitle);
  };

  const handleRunMain = async () => {
    await RunMainPrediction(updateQuestionsInParent);
  };

  return (
    <div>
      <div style={{ padding: '5px' }}></div>
      <BigBlock />
      <div className={"row mx-center"}>
        <div className={styles.instructions + " col-sm-5 mx-center"}>
          <h2>How to Use the App</h2>
          <ol>
            <li>Upload a clear image of your skin condition using the file uploader below.</li>
            <li>Click the "Run Dermalyze" button to run the image analysis.</li>
            <li>Wait for the AI to process the image. This may take up to a minute.</li>
            <li>You will then see the result displayed on the screen.</li>
            <li>Click on the result to get more detailed information and recommendations.</li>
          </ol>
        </div>
        <div className="col-sm-4 d-flex mx-center">
          <img src="/DermalyzeLogo.png" alt="Dermalyze Logo" style={{ }} />
        </div>
      </div>
      <hr></hr>

      <DermalyzeImageBlock questFunc={updateQuestionsInParent}/>)
      <LoadingSpinner />
      
      {/* <h1 style={{ textAlign: 'center' }}>Skin Health AI</h1>
      <div className={"row mx-center justify-content-md-center"}>
      <div className = {"col-lg-8"}>
      <div style={{ textAlign: 'center' }}>
        <Canvas />
      </div>
      </div>
      <div className = {"col-md-auto"}>
        <SingleFileUploader />
      <SubmitButton handleRunMain={handleRunMain} />
      <LoadingSpinner />
      </div>
      </div> */}
      <Dropdown style={{ display: 'Block' }} />
      
     
      <div>
        <Link href={linkHref} legacyBehavior>
          <a>
            <h2 style={{ textAlign: 'center' }} id="classificationText">
              Run our AI for a result!
            </h2>
          </a>
        </Link>
      </div><br></br>
      <hr></hr>
      <Questions questions={questions} quizTitle={quizTitle} />
    </div>
  );
};

export default Home;
