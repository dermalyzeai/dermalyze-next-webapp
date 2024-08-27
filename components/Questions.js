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
                {questions && questions.map((question, index) => (
                    <div className="mb-3" key={index}>
                        <label htmlFor={`QuestionInput${index}`} className="form-label">{`Question ${index + 1}`}</label>
                        <input
                type="text"
                className="form-control"
                id={`question${index}`}
                name={`question${index}`}
                value={formData[index] || ''}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Enter your question ${index + 1}`}
              />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Questions;