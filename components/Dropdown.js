import React, { useState, useEffect} from 'react';
import { processData } from '../public/scripts/script.js';

export default function Dropdown(){
    var Demographics= [
        {'What is your biological gender?': ['Male', 'Female']},
        {'What is your age?': ['0-10', '10-18','18+']},
        {'What is your continent of Origin?': ['Asia', 'Europe','Africa', 'North America', 'South America', 'Australia', 'Antartica']},
        
    ];
    // useEffect(() => {
    //     // Manually initialize Bootstrap dropdown
    //     const dropdownElement = document.querySelector('.dropdown-toggle');
    //     if (dropdownElement) {
    //         new window.bootstrap.Dropdown(dropdownElement);
    //     }
    // }, []);
    return(
//         <div className="dropdown p-4">
//             <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
//              Dropdown form
//          </button>
//     <form className="dropdown-menu px-4 py-3">
//         <div className="mb-3">
//             <label htmlFor="QuestionInput0" className="form-label">What is your biological gender?</label>
//             <div className="form-check">
//                 <input type="radio" className="form-check-input" id="gender-male" name="gender" value="Male" />
//                 <label className="form-check-label" htmlFor="gender-male">Male</label>
//             </div>
//             <div className="form-check">
//                 <input type="radio" className="form-check-input" id="gender-female" name="gender" value="Female" />
//                 <label className="form-check-label" htmlFor="gender-female">Female</label>
//             </div>
//         </div>
//     </form>
// </div>)
    <><div className = "d-flex justify-content-center mt-3">
    <div class="accordion" id="accordionExample">
    <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Demographic Form
      </button>
      </h2>
    
    
      <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <p>HIiii</p>
        {Demographics.length > 0 ? (
        <form className = "px-4 py-3">
            {Demographics.map((questionObj, index)=>{
                const [questionText, options] = Object.entries(questionObj)[0];
                <div class="mb-3">
                    <label htmlFor={`QuestionInput${index}`} class="form-label">{questionText}</label>
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
                    )  : (
                    <p>Error: Options are not available or are not an array</p>
                    )}
                </div>
            })}
            {/* <div class="mb-3">
                <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                    <label class="form-check-label" for="dropdownCheck">
                        Remember me
                    </label>
                </div>
            </div>*/}
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        ) : (
            <p>No questions available.</p> // Show a message if Demographics is empty
        )}
        
        </div>
        </div>
        </div>
        </div>
        </div>
        
</>)
}