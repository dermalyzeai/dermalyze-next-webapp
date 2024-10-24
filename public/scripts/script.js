// import * as onnx from 'onnxruntime-node';

// Start of code for Drag and drop
//const dropContainer = document.getElementById("dropcontainer")
  //const fileInput = document.getElementById("uploadedImg")

  // dropContainer.addEventListener("dragover", (e) => {
  //   // prevent default to allow drop
  //   e.preventDefault()
  // }, false)

  // dropContainer.addEventListener("dragenter", () => {
  //   dropContainer.classList.add("drag-active")
  // })

  // dropContainer.addEventListener("dragleave", () => {
  //   dropContainer.classList.remove("drag-active")
  // })

  // dropContainer.addEventListener("drop", (e) => {
  //   e.preventDefault()
  //   dropContainer.classList.remove("drag-active")
  //   fileInput.files = e.dataTransfer.files
  // })
  // End of drag and drop code


//var numClasses = skinClassifications.length;
var imageSize = 224;
//NOt using runExample
async function runExample(test=true) {
  // Create an ONNX inference session with WebGL backend.
  const sessionMain = new onnx.InferenceSession({ backendHint: 'webgl' });
  const sessionEczemaPsoriasis = new onnx.InferenceSession({ backendHint: 'webgl' });

  // Load an ONNX model. This model is Resnet18 that takes a 1*3*224*224 image and classifies it.
  await sessionMain.loadModel("./models/skin_disease_mobilenetv3.onnx");
  await sessionEczemaPsoriasis.loadModel("../models/dermalyze-ai-resnet-ft-4_eczemaVSpsoriasis-EVAL.onnx");

  // Load image.
  const imageLoader = new ImageLoader(imageSize, imageSize);
  const imageLoader2 = new ImageLoader(200, 301);
  var imageData = null;
  if (test){
      imageData = await imageLoader.getImageData('./acne.jpg');
  }
  else{
      imageData = await imageLoader2.getImageData(document.getElementById('uploadedImg').files[0]);
  }
  //console.log(document.getElementById('uploadedImg').files[0]);
  // Preprocess the image data to match input dimension requirement, which is 1*3*224*224.
  const width = imageSize;
  const height = imageSize;
  const preprocessedData = preprocess(imageData.data, width, height);

  const inputTensor = new onnx.Tensor(preprocessedData, 'float32', [1, 3, width, height]);
  // Run model with Tensor inputs and get the result.
  // new onnx.Tensor(new Float32Array(224*224*3), 'float32', [1, 3, 224, 224])
  var outputMap = await sessionMain.run([new onnx.Tensor(new Float32Array(224*224*3), 'float32', [1, 3, 224, 224])]);
  var outputData = outputMap.values().next().value.data;

  // Render the output result in html.
  pred = printMatchesMain(outputData);
}

export async function RunMain(test=true, updateQuestionsInParent) {
  var el = document.getElementById('spinner');
  el.style.display  = 'block';
  var imgFile = document.getElementById("file").files[0];
  var img = new Image;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  //ctx.fillRect(0,0,20,20);
  img.onload = function() {
    drawImageScaled(img, ctx);
    URL.revokeObjectURL(img.src);
    var imgData = ctx.getImageData(16,16,224,224);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.putImageData(imgData, 16, 16);
    RunModel(imgData.data, 224, 224, updateQuestionsInParent);
  };
  img.src = URL.createObjectURL(imgFile);
  return "XMLDocument";
}

async function RunModel(data, width, height, updateQuestionsInParent) {
  // Create an ONNX inference session with WebGL backend.
  const sessionMain = new onnx.InferenceSession({ backendHint: 'webgl' });
  const sessionEczemaPsoriasis = new onnx.InferenceSession({ backendHint: 'webgl' });

  // Load an ONNX model. This model is Resnet18 that takes a 1*3*224*224 image and classifies it.
  await sessionMain.loadModel("/models/skin_disease_mobilenetv3.onnx");
  //await sessionEczemaPsoriasis.loadModel("./models/dermalyze-ai-resnet-ft-4_eczemaVSpsoriasis-EVAL.onnx");

  const preprocessedData = preprocess(data, width, height);
  const inputTensor = new onnx.Tensor(preprocessedData, 'float32', [1, 3, width, height]);
  // Run model with Tensor inputs and get the result.
  // new onnx.Tensor(new Float32Array(224*224*3), 'float32', [1, 3, 224, 224])
  var outputMap = await sessionMain.run([inputTensor]);
  var outputData = outputMap.values().next().value.data;

  // Render the output result in html.
  var pred = printMatchesMain(outputData, updateQuestionsInParent);
  // if(pred == 1 || pred == 3) {
  //   outputMap = await sessionEczemaPsoriasis.run([inputTensor]);
  //   outputData = outputMap.values().next().value.data;
  //   pred = printMatchesEczemaPsoriasis(outputData);
  // };
  var el = document.getElementById('spinner');
  el.style.display  = 'none';
}

function drawImageScaled(img, ctx) {
  ctx.fillRect(60,0,20,20);
  var canvas = ctx.canvas ;
  var hRatio = canvas.width  / img.width    ;
  var vRatio =  canvas.height / img.height  ;
  var ratio  = Math.max ( hRatio, vRatio );
  var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
  var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.drawImage(img, 0,0, img.width, img.height,
                     centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
}
  
/**
 * Preprocess raw image data to match Resnet50 requirement.
 */
function preprocess(data, width, height) {
  const dataFromImage = ndarray(new Float32Array(data), [width, height, 4]);
  const dataProcessed = ndarray(new Float32Array(width * height * 3), [1, 3, height, width]);
  // Normalize 0-255 to (-1)-1
  const average = array => array.reduce((a, b) => a + b) / array.length;
  //ndarray.ops.divseq(dataFromImage, 128.0);
  //ndarray.ops.subseq(dataFromImage, 1.0);
  ndarray.ops.subseq(dataFromImage, 128.0);
  ndarray.ops.divseq(dataFromImage, 128.0);

  // Realign imageData from [224*224*4] to the correct dimension [1*3*224*224].
  ndarray.ops.assign(dataProcessed.pick(0, 0, null, null), dataFromImage.pick(null, null, 0));
  ndarray.ops.assign(dataProcessed.pick(0, 1, null, null), dataFromImage.pick(null, null, 1));
  ndarray.ops.assign(dataProcessed.pick(0, 2, null, null), dataFromImage.pick(null, null, 2));

  return dataProcessed.data;
}
  
async function printMatchesMain(data, updateQuestionsInParent) {
  var predIndex = data.indexOf(Math.max(...data));
  console.log(data);
  console.log(skinClassifications[predIndex]);
  document.getElementById('classificationText').innerHTML = skinClassifications[predIndex];
  // if (questions[skinClassifications[predIndex]]!=null){
  //   document.getElementById('Questions').innerHTML = questions[skinClassifications[predIndex]]
  //   var q = document.getElementById('questions');
  //   q.style.display='inline'
  // }
  // else{
  //   document.getElementById('Questions').innerHTML = "hi"
  //   var q = document.getElementById('questions');
  //   q.style.display='Block'
  // }
  try {
    const questions = await obtainQuestions(predIndex); // Wait for the promise to resolve
    
    if (Array.isArray(questions) && questions.length > 0) {
      updateQuestionsInParent(questions); // Now, `questions` is the resolved array
      var q = document.getElementById('questions');
      q.style.display='Block'
      console.log('Questions:', questions.join(', ')); // You can safely use join here
    } else {
      console.error('questions is not an array:', questions);
    }
  } catch (error) {
    console.error('Error obtaining questions:', error);
  }
  //document.getElementById('classificationTextLink').href = '/posts/' + skinClassifications[predIndex] + '/';
  return predIndex;
}
export async function obtainQuestions(predIndex){
  if (quest[skinClassifications[predIndex]]!=null){
  const questionObj = quest[skinClassifications[predIndex]];
  console.log(' before Formatting' + Object.entries(questionObj));
  const formattedQuestions = Object.entries(questionObj).map(([question, options]) => {
    return {
      question: question,   // The key is the question text
      options: options,     // The value is the array of options
    };
  });
  console.log(formattedQuestions);
  console.log(Object.entries(formattedQuestions));
  return formattedQuestions;
  
  }
  return [];  
}
export function processData(data) {
  // Handle the form data here
  console.log('Data received in script.js:', data);

  // Example: Do something with the data
  // For instance, send it to an API or update some internal state
}
function printMatchesEczemaPsoriasis(data) {
  var predIndex = data.indexOf(Math.max(...data));
  if(predIndex == 0){
    predIndex = 1;
  }
  else{
    predIndex = 3
  }
  console.log(data);
  console.log(skinClassifications[predIndex]);
  document.getElementById('classificationText').innerHTML = skinClassifications[predIndex];
  //document.getElementById('classificationTextLink').href = '/posts/' + skinClassifications[predIndex] +'/';
  return predIndex;
}
  