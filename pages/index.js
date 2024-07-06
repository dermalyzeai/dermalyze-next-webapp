import { useState } from 'react';
import LoadingSpinnerLLM from '../components/LoadingSpinnerLLM';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './chat.module.css';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data.response); // Assuming data.response is the rich text document
    } catch (error) {
      console.error(error);
      setResponse({ error: 'Unable to get a response' });
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const renderResponse = (response) => {
    if (response && response.nodeType === 'document') {
      return documentToReactComponents(response);
    } else if (response && response.error) {
      return <p>{response.error}</p>;
    } else {
      return <p>{response}</p>; // Fallback for plain text responses
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Dermalyze AI Assistant</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="symptoms">What are your symptoms?</label>
        <textarea 
          id="symptoms"
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          required 
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>Submit</button>
      </form>
      {loading && <LoadingSpinnerLLM />}
      <div className={styles.responseContainer}>
        <h2 className={styles.responseHeading}>Response:</h2>
        <div className={styles.responseContent}>
          {renderResponse(response)}
        </div>
      </div>
    </div>
  );
}
