import React, { useState } from 'react';
import { processData } from '../public/scripts/script.js';


function Questions({ questions }) {
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
    processData(formData); // Pass form data to script.js
    console.log('Form Data Submitted:', formData);
  };
  return (
    <div id = "questions" style =  {{display:'none'}}>
      <div className="d-flex justify-content-center">
        <div className=" text-bg  m-3 fs-3" role="status" style={{ width: '69rem' }}>
          <p id="Questions">{questions ? ' ': 'No questions available'}</p>
        </div>
      </div>
      <div className="justify-content-center" id="questi" style={{ display: questions ? 'block' : 'none' }}>
        <form onSubmit={handleSubmit} style = {{padding: '0 20px'}}>
        {Object.values(questions).map(([questionText, options], index) => (
            <div className="mb-3" key={index}>
              <label htmlFor={`QuestionInput${index}`} className="form-label">
                {questionText} {/* Display the actual question text */}
              </label>
              {Array.isArray(options) ? (
                options.map((option, optIndex) => (
                  <div key={optIndex} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input" // Correct class for radio button
                      id={`${questionText}-${optIndex}`} // Use `questionText` for unique IDs
                      name={`question${index}`} // Use a unique name for each question to group options
                      value={option}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <label className="form-check-label" htmlFor={`${questionText}-${optIndex}`}>
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