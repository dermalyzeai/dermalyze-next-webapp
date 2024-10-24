import React, { useState } from 'react';
import { processData } from '../utils/questionHelper';
import styles from './Questions.module.css'; // Assuming you have CSS modules

function Questions({ questions, quizTitle, scrollToResult }) {
  const [formData, setFormData] = useState({});

  // Function to handle changes in any question input
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [index]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    processData(formData, quizTitle); // Pass form data to questionHelper
    console.log('Form Data Submitted:', formData, quizTitle);
    scrollToResult(); // Scroll to the result after submitting
  };

  return (
    <div id="questions">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {/* Header section */}
            <div className={`card shadow-sm ${styles.titleCard}`}>
              <div className="card-body text-center">
                <h1 className="h4 fw-bold">
                  Here are a few extra questions to help decide if your skin condition is{' '}
                  <span className="text-primary">{quizTitle}</span>
                </h1>
              </div>
            </div>

            {/* Questions form */}
            <div className="card mt-4 shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {questions.map((questionKey, index) => (
                    <div key={index} className="mb-4">
                      <label
                        htmlFor={`QuestionInput${index}`}
                        className="form-label h6"
                      >
                        {questionKey.question}
                      </label>
                      {Array.isArray(questionKey.options) ? (
                        questionKey.options.map((option, optIndex) => (
                          <div key={optIndex} className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              id={`${questionKey.question}-${optIndex}`}
                              name={`question${index}`}
                              value={option}
                              onChange={(e) => handleChange(e, index)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`${questionKey.question}-${optIndex}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="text-danger">Error: Options are not available.</p>
                      )}
                    </div>
                  ))}

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary w-50">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
