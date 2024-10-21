import React, { useState, useEffect} from 'react';
import { processData } from '../public/scripts/script.js';

export default function Dropdown(){
    const [formData, setFormData] = useState({});
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [index]: value
        });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        processData(formData); // Pass form data to script.js
        console.log('Form Data Submitted:', formData);
    };
    var Demographics= [
        {question: 'What is your biological sex at birth?', options: ['Male', 'Female', 'Intersex/other']},
        {question: 'What is your age?', options: ['0-10', '10-18','18+']},
        {question: 'What is your continent of Origin?', options: ['Asia', 'Europe','Africa', 'North America', 'South America', 'Australia', 'Antartica']},
        
    ];
    console.log(Demographics);
    return(
    <><div className = "d-flex justify-content-center mt-3">
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Demographic Form
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <form onSubmit={handleSubmit} className = "px-4 py-3">
                            {Demographics.map((questionObj, index)=>(
                                <div className="mb-3" key = {index}>
                                    <label htmlFor={`QuestionInput${index}`} className="form-label">{questionObj.question}</label>
                                    {questionObj.options.map((option, optIndex) => (
                                        <div key={optIndex} className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input" // Correct class for radio button
                                                id={`${questionObj.question}-${optIndex}`} // Use `questionText` for unique IDs
                                                name={`question${index}`} // Use a unique name for each question to group options
                                                value={option}
                                                onChange={(e) => handleChange(e, index)}
                                            />
                                            <label className="form-check-label" htmlFor={`${questionObj.question}-${optIndex}`}>
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <div className="mb-3">
                                <label htmlFor={'QuestionInput 4'} className="form-label">Does your family suffer from any particular skin disease? If so please list down below. Your answer should be diseases separated by a comma, for example: Melanoma, Psoriasis, Sunburn</label>
                                <input type="response" className="form-control" id="FamilyHistoryResponse" placeholder="None" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div></>
    )
}