import { skinClassifications, quest, responses} from './predictionHelper';

export async function obtainQuestions(predIndex, predIndexSecondary){
    const predDisease = skinClassifications[predIndex];
    const predDiseaseSecondary = skinClassifications[predIndexSecondary];

    console.log('Primary Prediction:', predDisease);
    console.log('Secondary Prediction:', predDiseaseSecondary);

    if(skinClassifications[predIndex]<skinClassifications[predIndexSecondary]){
        const predDisease = skinClassifications[predIndexSecondary];
        const predDiseaseSecondary = skinClassifications[predIndex];
        const temp=predIndex;
        predIndex=predIndexSecondary;
        predIndexSecondary=temp;
    }
    if (quest[predDisease+' or '+predDiseaseSecondary]!=null){
        const questionObj = quest[predDisease+' or '+predDiseaseSecondary];
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

export function processDemographicData(data) {
    // Handle the form data here
    console.log('Demographic data received in script.js:', data);
  
    // Example: Do something with the data
    // For instance, send it to an API or update some internal state
  }
export function processData(data, quizTitle){
    console.log('Form data received in script.js:', data, quizTitle);
    const valueTable = responses[quizTitle];
}