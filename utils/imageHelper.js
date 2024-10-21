// const Jimp = require('jimp');
const { Tensor } = require('onnxruntime-web');

async function getImageTensorFromPath(path, dims = [1, 3, 224, 224]) {
  // 1. Load the image  
  const image = await loadImagefromPath(path, dims[2], dims[3]);
  // 2. Convert to tensor
  const imageTensor = imageDataToTensor(image, dims);
  // 3. Return the tensor
  return imageTensor;
}

async function loadImagefromPath(path, width = 224, height = 224) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for images from different origins
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      resolve(imageData);
    };
    img.onerror = reject;
    img.src = path;
  });
}
function imageDataToTensor(imageData, dims) {
    const { width, height, data } = imageData;
  
    // Create a Float32Array to hold the image data
    const float32Data = new Float32Array(width * height * 3); 
  
    // Iterate over the image data and extract RGB values, normalizing to [0, 1]
    let i = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pos = (y * width + x) * 4; // Position in the RGBA array
        float32Data[i++] = data[pos] / 255.0;     // R
        float32Data[i++] = data[pos + 1] / 255.0; // G
        float32Data[i++] = data[pos + 2] / 255.0; // B
      }
    }
  
    // Create the tensor object (assuming you're using onnxruntime-web)
    const inputTensor = new Tensor('float32', float32Data, dims);
    return inputTensor;
  }

module.exports = { getImageTensorFromPath };
