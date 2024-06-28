import { useState } from 'react';
import LoadingSpinnerLLM from '../components/LoadingSpinnerLLM';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
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
      setResponse(data.response);
    } catch (error) {
      console.error(error);
      setResponse('Error: Unable to get a response');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div style={styles.container}>
      <h1>Dermalyze Ai Assistant</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          required 
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {loading && <LoadingSpinnerLLM />}
      <div style={styles.responseContainer}>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '0 20px',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  responseContainer: {
    marginTop: '20px',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'left',
  }
};
