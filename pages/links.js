import { useState } from 'react';
import LoadingSpinnerLLM from '../components/LoadingSpinnerLLM';
import styles from './chat.module.css';
import {Textarea} from "@nextui-org/input";
import { FaInstagram } from 'react-icons/fa';
import {FaGithub} from 'react-icons/fa';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  

  return (
    <>
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Important Links</h2>
      {/* Insta */}
      <div class = "card" style = {{width: "36rem;"}}>
        <div class="card-body">
          <h5 class="card-title">Instagram Accounts</h5>
          <div class = "row">
          <p class="card-text">Dermalyze:<a href={"https://www.instagram.com/dermalyze/"} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
          </a></p>
          
          </div>
          <div>
          <p class="card-text">Neelesh:<a href={"https://instagram.com/cyber_neel"} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
          </a></p>
          
          </div>
          <div>
          <p class="card-text">Adway:<a href={"https://www.instagram.com/budwayk/"} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
          </a></p>
          
          </div>
          <div>
          <p class="card-text">Sameer:<a href={"https://www.instagram.com/sam.eer.agarwal/"} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
          </a></p>
          
          </div>
          <div>
          <p class="card-text">Murtaza:<a href={"https://www.instagram.com/murtazahaque/"} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
          </a></p>
          
          </div>

        </div>
      </div>

      {/* Github */}
      <div class = "card" style = {{width: "36rem;"}}>
        <div class="card-body">
          <h5 class="card-title">Github Accounts</h5>

          <div>
          <p class="card-text">Neelesh:<a href={"https://github.com/cyberneel"} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
          </a></p>
          
          </div>
          <div>
          <p class="card-text">Sameer:<a href={"https://github.com/Elitelord"} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
          </a></p>
          
          </div>
          <div>
          <p class="card-text">Murtaza:<a href={"https://github.com/TheDarkLynx786"} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
          </a></p>
          
          </div>

        </div>
      </div>
      

    </div>
    </>
  );
}
