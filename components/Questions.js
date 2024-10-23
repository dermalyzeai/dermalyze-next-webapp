import React, { useState } from 'react';
import { processData } from '../utils/questionHelper';


function Questions({ questions, quizTitle }) {
  const [formData, setFormData] = useState({});

  // Function to handle changes in any question input
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [index]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    processData(formData, quizTitle); // Pass form data to script.js
    console.log('Form Data Submitted:', formData, quizTitle);
  };
  return (
    <div id = "questions" style =  {{display:'none'}}>
      <div className="d-flex justify-content-center">
        <div className=" text-bg  m-3 fs-3" role="status" style={{ width: '69rem' }}>
          <p id="Questions">{questions ? ' ': 'No questions available'}</p>
        </div>
      </div>
      <div className="justify-content-center" id="questi" style={{ display: questions ? 'block' : 'none' }}>
        <div><h1>Here are a few extra questions to help decide if your skin condition is {quizTitle}</h1></div>
        <form onSubmit={handleSubmit} style = {{padding: '0 20px'}}>
        {questions.map((questionKey, index) => (
            <div className="mb-3" key={index}>
              <label htmlFor={`QuestionInput${index}`} className="form-label">
              {questionKey.question} {/* Display the actual question text */}
              </label>
              {Array.isArray(questions) ? (
                 questionKey.options.map((option, optIndex) => (
                  <div key={optIndex} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input" // Correct class for radio button
                      id={`${questionKey.question}-${optIndex}`} // Use `questionText` for unique IDs
                      name={`question${index}`} // Use a unique name for each question to group options
                      value={option}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <label className="form-check-label" htmlFor={`${questionKey.question}-${optIndex}`}>
                      {option}
                    </label>
                  </div>
                ))
              ) : (
                <p>Error: Options are not available or are not an array</p>
              )}
              </div>
          ))}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Questions;