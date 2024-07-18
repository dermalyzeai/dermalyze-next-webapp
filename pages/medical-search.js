import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './index.module.css';
import Layout from '../components/Layout';
import Canvas from '../components/Canvas';
import SingleFileUploader from '../components/FileUpload';
import SubmitButton from '../components/SubmitButton';
import Link from 'next/link';

const MedSearch = () => {
  
  function RuSearch() {
  const submitClick = () => {
    console.log("Ran search")
  };

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Search Health Data</h1>
      <div>
          <a>
            <input type="text" id="condition" placeholder="Condition"></input>
          </a>
          <button
          type="button"
          className="btn btn-primary"
          value="Run Search"
          onClick={RunSearch}
          >
          Run Search
        </button>
      </div>
    </div>
  );
};

export default MedSearch