import { useState } from 'react';
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
  
  return (
    <div>
    <div style={{ padding: '5px' }}></div>
    <BigBlock />
      <h1 style={{textAlign:'center'}}>Skin Health AI</h1>
      <div style={{ textAlign: 'center' }}>
        <Canvas />
      </div>
      <SingleFileUploader />
      <SubmitButton />
      <LoadingSpinner />
      <div>
      <Link href={''} as={`'classificationLinkText'?id='classificationTextLink'`}>
        <h2 style={{textAlign:'center'}} id='classificationText'>Run our AI for a result!</h2>
      </Link>
      </div>
    </div>
  );
  
};

export default Home;
