import { useState } from 'react';
import LoadingSpinnerLLM from '../components/LoadingSpinnerLLM';
import styles from './chat.module.css';
import {Textarea} from "@nextui-org/input";

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  

  return (
    <>
    
    </>
  );
}
