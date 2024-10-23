import * as tf from '@tensorflow/tfjs';

var skinClassifications = {
    '0': 'Acne',
    '1': 'Basal',
    '2': 'Eczema',
    '3': 'Hives',
    '4': 'Melanoma or Mole',
    '5': 'Monkey Pox',
    '6': 'Healthy'
  };


export async function RunMainPrediction() {
    try {
      var el = document.getElementById('spinner');
      el.style.display = 'block';
      var imgFile = document.getElementById("file").files[0];
  
      // Create an image element to load the uploaded file
      const img = document.createElement('img');
      img.src = URL.createObjectURL(imgFile);
  
      img.onload = async function () {
        // Step 1: Create a canvas for the 224x224 box
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 224;
        canvas.height = 224;
  
        // Calculate aspect ratio and scaling
        const hRatio = 224 / img.width;
        const vRatio = 224 / img.height;
        const ratio = Math.max(hRatio, vRatio); // Ensure the image fills the 224x224 area
  
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
  
        // Calculate offsets to center the image within the canvas (if it gets cropped)
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;
  
        // Draw the scaled image on the canvas, cropping excess
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
  
        // Step 2: Convert the canvas content to a tensor
        let imageTensor = tf.browser.fromPixels(canvas)
          .toFloat()
          .div(tf.scalar(127)).sub(tf.scalar(1)) // Normalize to [0, 1]
          .expandDims(); // Add batch dimension (1, 224, 224, 3)
  
        // Step 3: Load the model and make the prediction
        const model = await tf.loadLayersModel('dermalyze_tensorflow_js/model.json');
  
        const prediction = model.predict(imageTensor);
  
        const predictedClass = tf.argMax(prediction, 1).dataSync()[0];
        const predictedDisease = skinClassifications[predictedClass];
        const confidence = prediction.max().dataSync()[0];
        console.log(prediction.dataSync());
        console.log(predictedClass);
        console.log(predictedDisease);
        console.log((confidence * 100).toFixed(2));
  
        // Update the UI with the result
        const classificationTextElement = document.getElementById('classificationText');
        classificationTextElement.innerHTML = `Prediction: ${predictedDisease}`; //(Confidence: ${(confidence * 100).toFixed(2)}%)
  
        el.style.display = 'none';
      };
  
    } catch (error) {
      console.error('Error running the AI model:', error);
    }
};