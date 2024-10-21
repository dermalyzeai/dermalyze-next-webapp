import Jimp from 'jimp';

export default async function handler(req, res) {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { imageUrl } = req.body;  // Expect the image URL in the request body

  try {
    // Use Jimp to process the image (resize, for example)
    const image = await Jimp.read(imageUrl);
    image.resize(224, 224); // Resize to 224x224, or modify as needed
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG); // Get buffer

    // Send the processed image back
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(buffer); // Send the image buffer as a response
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ message: 'Failed to process image' });
  }
}
