import * as tf from '@tensorflow/tfjs';
import { processData } from './questionHelper';
import { obtainQuestions } from './questionHelper';
// import { updateQuestionsInParent } from '../index.js';
export var skinClassifications = {
    '0': 'Acne',
    '1': 'Basal',
    '2': 'Eczema',
    '3': 'Hives',
    '4': 'Melanoma or Mole',
    '5': 'Monkey Pox',
    '6': 'Healthy'
  };
export var quest = {
    'Acne or Eczema': {
        "How does your skin feel?": ['Oily and Greasy', 'Dry and Flaky'],
        "What type of bumps do you experience?": ['Pimples with pus or blackheads', 'Itchy red patches or blisters'],
        "Where do the bumps mostly appear?": ['Face, chest, or back', 'Elbows, knees, or hands'],
        "How often do you experience flare-ups?": ['Mostly during teenage years or hormonal changes', 'At any age, often triggered by weather or allergens'],
        "How does your skin react to moisturizers?": ['Makes my skin more oily or causes breakouts', 'Helps soothe dryness or irritation'],
        
    },
    'eczema': {
        "q1": ['o1', 'o2'],
        "q2": ['o1', 'o2']
    },
    'melanoma or mole': {
        "q1": ['o1', 'o2'],
        "q2": ['o1', 'o2']
    },
    'psoriasis': {
        "q1": ['o1', 'o2'],
        "q2": ['o1', 'o2']
    }
};

export var responses = {
  'Acne or Eczema': {
      "0": {
          'Oily and Greasy': '1',
          'Dry and Flaky': '2'
      },
      "1": {
          'Pimples with pus or blackheads': '1',
          'Itchy red patches or blisters': '2'
      },
      "2": {
          'Face, chest, or back': '1',
          'Elbows, knees, or hands': '2'
      },
      "3": {
          'Mostly during teenage years or hormonal changes': '1',
          'At any age, often triggered by weather or allergens': '2'
      },
      "4": {
          'Makes my skin more oily or causes breakouts': '1',
          'Helps soothe dryness or irritation': '2'
      }
  }
}
var pointResults = {
  'Acne or Eczema': [
    { range: [5, 7], result: 'Acne' },
    { range: [8, 10], result: 'Eczema' }
  ],
  'Melanoma or Mole': [
    { range: [5, 6], result: 'Melanoma' },
    { range: [7, 9], result: 'Mole' }
  ],
  'Psoriasis': [
    { range: [5, 6], result: 'Mild Psoriasis' },
    { range: [7, 8], result: 'Moderate Psoriasis' },
    { range: [9, 10], result: 'Severe Psoriasis' }
  ]
};

var linkyBoiRef = null;

export async function RunMainPrediction(updateQuestionsInParent, linkyBoi) {
    try {
      linkyBoiRef = linkyBoi;
      var el = document.getElementById('spinner');
      el.style.display = 'block';
      var imgFile = document.getElementById("file-upload").files[0];
  
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
        const predictionArray = prediction.dataSync();
        const sortedIndices = Array.from(predictionArray.keys()).sort((a, b) => predictionArray[b] - predictionArray[a]);

        const predictedClass = sortedIndices[0];
        const secondPredictedClass = sortedIndices[1];

        const confidence = predictionArray[predictedClass];
        const secondConfidence = predictionArray[secondPredictedClass];

        const predictedDisease = skinClassifications[predictedClass];
        const secondPredictedDisease = skinClassifications[secondPredictedClass];

        console.log("Prediction array:", predictionArray);
        console.log("Predicted class index:", predictedClass);
        console.log("Predicted disease:", predictedDisease);
        console.log("Confidence (%):", (confidence * 100).toFixed(2));

        console.log("Second predicted class index:", secondPredictedClass);
        console.log("Second predicted disease:", secondPredictedDisease);
        console.log("Second confidence (%):", (secondConfidence * 100).toFixed(2));

        //Linking
        linkyBoi(`/posts/${predictedDisease.toLowerCase()}`);
        console.log('Linking to:', `/posts/${predictedDisease.toLowerCase()}`);
  
        // Update the UI with the result
        const classificationTextElement = document.getElementById('classificationText');
        classificationTextElement.innerHTML = `Prediction: ${predictedDisease}`; //(Confidence: ${(confidence * 100).toFixed(2)}%)
        
        if (predictedDisease == 'Eczema' || predictedDisease == 'Acne') {
            classificationTextElement.innerHTML = `Prediction: ${predictedDisease}<br>(Confidence: ${(confidence * 100).toFixed(2)}%)`;
        
            //Getting Questions
            try {
              
            const questions = await obtainQuestions(predictedClass,secondPredictedClass); // Wait for the promise to resolve
              
            if (Array.isArray(questions) && questions.length > 0) {
              const title = skinClassifications[0] + ' or ' + skinClassifications[2];
              updateQuestionsInParent(questions,title); // Now, `questions` is the resolved array
              var q = document.getElementById('questions');
              q.style.display='Block'
              console.log('Questions:', questions.join(', ')); // You can safely use join here
            } else {
              console.error('questions is not an array:', questions);
            }
            } catch (error) {
            console.error('Error obtaining questions:', error);
            }          
        }
        
        el.style.display = 'none';
        return predictedDisease;
      };

  
    } catch (error) {
      console.error('Error running the AI model:', error);
    }
};

export function updatePrediction(quizTitle, totalPoints) {
  console.log('Updating prediction for', quizTitle, 'with total points:', totalPoints);

  // Get the results table for the current quiz title
  const resultTable = pointResults[quizTitle];

  if (!resultTable) {
      console.error(`No point results found for quiz: ${quizTitle}`);
      return;
  }

  // Ensure totalPoints doesn't go below 5
  if (totalPoints < 5) {
      console.error(`Total points (${totalPoints}) are below the minimum allowed value (5) for quiz: ${quizTitle}`);
      return null;
  }

  // Loop through the resultTable to find which range the totalPoints falls into
  for (let i = 0; i < resultTable.length; i++) {
      const { range, result } = resultTable[i];

      // Check if the totalPoints falls within the current range
      if (totalPoints >= range[0] && totalPoints <= range[1]) {
          console.log(`Prediction result: ${result}`);
          const classificationTextElement = document.getElementById('classificationText');
          classificationTextElement.innerHTML = `Updated Prediction Using the Quiz information : ${result}`
          linkyBoiRef(`/posts/${result.toLowerCase()}`);
      }
  }

  // If no range was found for the totalPoints
  console.error(`No matching result found for points: ${totalPoints}`);

}
