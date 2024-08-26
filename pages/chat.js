import { useState } from 'react';
import LoadingSpinnerLLM from '../components/LoadingSpinnerLLM';
import styles from './chat.module.css';
import {Textarea} from "@nextui-org/input";

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
    <div className={styles.container}>
      <h1 className={styles.heading}>Dermalyze AI Assistant</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="symptoms">What are your symptoms?</label>
        {/* <div className="w-full grid grid-cols-30 gap-4" style={{width: "500px"}}>
      <Textarea
        minRows={10}
        fullWidth
        id="symptoms"
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        required 
        // style="width: 400px"
        className="col-span-30"
        // classNames={{
        //   base: "min-w-lg",
        //   input: "resize-y min-h-[40px] min-w-[10000px]",
          
        // }}
        
      />
      </div> */}
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
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
}
