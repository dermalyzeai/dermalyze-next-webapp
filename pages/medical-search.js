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

  useEffect(() => {
    
  }, []);

  return (
    <div style={{padding: '12px'}}>
      <input type="text" id="condition" placeholder="Condition"></input>
      
    </div>
  );
};

export default Home;