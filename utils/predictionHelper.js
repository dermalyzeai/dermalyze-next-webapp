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
        "How does you skin feel": ['Oily and Greasy', 'Dry and Flaky'],
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
    'Acne or Eczema':{
        "0" : {
            '0': '1',
            '1': '2'
        },
        "1" : {
            '0': '1',
            '1': '2'
        },
        "2" : {
            '0': '1',
            '1': '2'
        },
        "3" : {
            '0': '1',
            '1': '2'
        },
        "4" : {
            '0': '1',
            '1': '2'
        }
       
    },
    'eczema':{
        "q1" : {
            'o1': 'r1',
            'o2': 'r2'
        },
        "q2" : {
            'o1': 'r1',
            'o2': 'r2'
        }
    },
    'melanoma or mole':{
        "q1" : {
            'o1': 'r1',
            'o2': 'r2'
        },
        "q2" : {
            'o1': 'r1',
            'o2': 'r2'
        }
    },
    'psoriasis':{
        "q1" : {
            'o1': 'r1',
            'o2': 'r2'
        },
        "q2" : {
            'o1': 'r1',
            'o2': 'r2'
        }
    }
}

export async function RunMainPrediction(updateQuestionsInParent) {
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
        const confidence = prediction.max().dataSync()[0];
        const predictedDisease = skinClassifications[predictedClass];

        console.log(prediction.dataSync());
        console.log(predictedClass);
        console.log(predictedDisease);
        console.log((confidence * 100).toFixed(2));
  
        // Update the UI with the result
        const classificationTextElement = document.getElementById('classificationText');
        classificationTextElement.innerHTML = `Prediction: ${predictedDisease}`; //(Confidence: ${(confidence * 100).toFixed(2)}%)
        
        if (predictedDisease == 'Eczema' || predictedDisease == 'Acne') {
            classificationTextElement.innerHTML = `Prediction: ${predictedDisease} (Confidence: ${(confidence * 100).toFixed(2)}%)`;
        
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
      };

  
    } catch (error) {
      console.error('Error running the AI model:', error);
    }
};