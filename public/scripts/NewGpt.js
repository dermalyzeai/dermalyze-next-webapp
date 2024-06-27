var AWANLLM_API_KEY = 'd82add2e-f296-4907-b2b3-d2ef7b58c7c2';

fetch("https://api.awanllm.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${AWANLLM_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "Meta-Llama-3-8B-Instruct",
    "messages": [
      {"role": "user", "content": "I have a cough, sore throat, and a runny nose. What could be happening?"},
      {"role": "assistant", "content": "Hi!, how can I help you today?"}
    ],
    "repetition_penalty": 1.1,
    "temperature": 0.7,
    "top_p": 0.9,
    "top_k": 40,
    "max_tokens": 64,
    "stream": false
  })
}).then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
  
console.log("LL");
console.error("FFF");
