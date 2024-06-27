import fetch from 'node-fetch';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { input } = req.body;
    const apiKey = process.env.HUGGING_FACE_API_KEY;

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/appvoid/palmer-002.5',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: input }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
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
