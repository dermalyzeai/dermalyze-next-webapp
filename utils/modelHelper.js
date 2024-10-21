const ort = require('onnxruntime-web');
const _ = require('lodash');
// const { imagenetClasses } = require('../data/imagenet');

var skinClassifications = {
    '0': 'acne',
    '1': 'basal',
    '2': 'eczema',
    '3': 'hives',
    '4': 'melanoma or mole',
    '5': 'monkey pox'
};

async function runSqueezenetModel(preprocessedData) {
  // Create session and set options. See the docs here for more options: 
  // https://onnxruntime.ai/docs/api/js/interfaces/InferenceSession.SessionOptions.html#graphOptimizationLevel
  const session = await ort.InferenceSession.create('models\\skin_disease_mobilenetv3.onnx', {
    executionProviders: ['webgl'],
    graphOptimizationLevel: 'all'
  });
  console.log('Inference session created');
  // Run inference and get results.
  const [results, inferenceTime] = await runInference(session, preprocessedData);
  return [results, inferenceTime];
}

async function runInference(session, preprocessedData) {
  // Get start time to calculate inference time.
  const start = new Date();
  // Create feeds with the input name from model export and the preprocessed data.
  const feeds = {};
  feeds[session.inputNames[0]] = preprocessedData;
  // Run the session inference.
  const outputData = await session.run(feeds);
  // Get the end time to calculate inference time.
  const end = new Date();
  // Convert to seconds.
  const inferenceTime = (end.getTime() - start.getTime()) / 1000;
  // Get output results with the output name from the model export.
  const output = outputData[session.outputNames[0]];
  // Get the softmax of the output data. The softmax transforms values to be between 0 and 1
  const outputSoftmax = softmax(Array.prototype.slice.call(output.data));
  // Get the top 5 results.
  const results = skinClassificationsTopK(outputSoftmax, 6);
  console.log('results: ', results);
  return [results, inferenceTime];
}

// Placeholder functions for softmax and imagenetClassesTopK
function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map((x) => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b);
  return exps.map((x) => x / sum);
}

function skinClassificationsTopK(outputSoftmax, k) {
  const sorted = outputSoftmax.map((value, index) => ({ value, index }))
    .sort((a, b) => b.value - a.value)
    .slice(0, k);
  return sorted.map(({ index, value }) => ({
    className: skinClassifications[index],
    probability: value
  }));
}

module.exports = { runSqueezenetModel };
