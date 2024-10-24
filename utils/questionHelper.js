import { skinClassifications, quest, responses, updatePrediction} from './predictionHelper';

export async function obtainQuestions(predIndex, predIndexSecondary) {
    const predDisease = skinClassifications[predIndex];
    const predDiseaseSecondary = skinClassifications[predIndexSecondary];

    console.log('Primary Prediction:', predDisease);
    console.log('Secondary Prediction:', predDiseaseSecondary);

    // Try to find the question set with both disease orders
    let questionObj = quest[predDisease + ' or ' + predDiseaseSecondary] 
                      || quest[predDiseaseSecondary + ' or ' + predDisease];

    if (questionObj != null) {
        console.log('Questions found before formatting:', Object.entries(questionObj));
        const formattedQuestions = Object.entries(questionObj).map(([question, options]) => {
            return {
                question: question,   // The key is the question text
                options: options,     // The value is the array of options
            };
        });
        console.log('Formatted Questions:', formattedQuestions);
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
export function processData(data, quizTitle) {
    console.log('Form data received in script.js:', data, quizTitle);

    // Get the response table for the quizTitle
    const valueTable = responses[quizTitle];
    if (valueTable != null){
    // Initialize a total score counter
    let totalPoints = 0;

    // Loop through the user's answers (data object)
    for (let questionIndex in data) {
        if (data.hasOwnProperty(questionIndex)) {
            const userAnswer = data[questionIndex];  // User's selected option (e.g., "Oily and Greasy")

            // Check if the corresponding question exists in the valueTable
            const questionResponseTable = valueTable[questionIndex]; // Get the response object for the question
            if (questionResponseTable && questionResponseTable[userAnswer] !== undefined) {
                // Get the point value for the user's answer
                const pointValue = parseInt(questionResponseTable[userAnswer], 10);

                // Add the point value to the totalPoints
                totalPoints += pointValue;
            } else {
                console.warn(`No point value found for question ${questionIndex} and answer "${userAnswer}"`);
            }
        }
    }

    // Log the totalPoints calculated
    console.log(`Total Points for ${quizTitle}:`, totalPoints);

    // Send the total points back to wherever it is needed
    updatePrediction(quizTitle,totalPoints);
    }
    else { 
        console.log("No Responses for this quiz")
     }
}
