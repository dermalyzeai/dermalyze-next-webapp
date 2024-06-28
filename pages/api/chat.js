import fetch from 'node-fetch';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { input } = req.body;
    const apiKey = process.env.AWANLLM_API_KEY;
    //console.log(input);
    try {
      const response = await fetch(
        'https://api.awanllm.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              "model": "Meta-Llama-3-8B-Instruct",
              "messages": [
                {"role": "user", "content": input},
                {"role": "assistant", "content": "Hi!, how can I help you today?"}
              ],
              "repetition_penalty": 1.1,
              "temperature": 0.7,
              "top_p": 0.9,
              "top_k": 40,
              "max_tokens": 64,
              "stream": false
        }),  
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.choices[0]);
      const generatedText = data[0]?.generated_text || "No response generated";
      res.status(200).json({ response: generatedText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching response from Hugging Face API' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
