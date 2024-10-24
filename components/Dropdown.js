import React, { useState } from 'react';
import { processDemographicData } from '../utils/questionHelper.js';

export default function Dropdown() {
    const [formData, setFormData] = useState({});
    const [isOpen, setIsOpen] = useState(false); // State to track if accordion is open or closed
    
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [index]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        processDemographicData(formData); // Pass form data to script.js
        console.log('Form Data Submitted:', formData);
    };

    const toggleAccordion = () => {
        setIsOpen(!isOpen); // Toggle accordion open/close state
    };

    const Demographics = [
        { question: 'What is your biological sex at birth?', options: ['Male', 'Female', 'Intersex/other'] },
        { question: 'What is your age?', options: ['0-10', '10-18', '18+'] },
        { question: 'What is your continent of Origin?', options: ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Australia', 'Antarctica'] },
    ];

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className={`accordion-button ${!isOpen ? 'collapsed' : ''}`} // 'collapsed' class keeps the arrow down when closed
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded={isOpen ? "true" : "false"} // Set aria-expanded based on open/close state
                                aria-controls="collapseOne"
                                onClick={toggleAccordion}
                            >
                                Please fill out this Demographic Form for improved results
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`} // Show or hide accordion based on state
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <form onSubmit={handleSubmit} className="px-4 py-3">
                                    {Demographics.map((questionObj, index) => (
                                        <div className="mb-3" key={index}>
                                            <label htmlFor={`QuestionInput${index}`} className="form-label">{questionObj.question}</label>
                                            {questionObj.options.map((option, optIndex) => (
                                                <div key={optIndex} className="form-check">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        id={`${questionObj.question}-${optIndex}`}
                                                        name={`question${index}`}
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
                                        <label htmlFor={'QuestionInput 4'} className="form-label">
                                            Does your family suffer from any particular skin disease? If so, please list down below. Your answer should be diseases separated by a comma, for example: Melanoma, Psoriasis, Sunburn
                                        </label>
                                        <input type="text" className="form-control" id="FamilyHistoryResponse" placeholder="None" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
