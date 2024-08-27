import { useState } from 'react';
function ParentComponent() {
    const [questions, setQuestions] = useState([]);
  
    const updateQuestionsInParent = (newQuestions) => {
      setQuestions(newQuestions);
    };
    Questions(questions)
}
function Questions(){
    
    const Qs = [
        {
        
        }
    ]
    return(
    <><div className="d-flex justify-content-center"><div className="badge text-bg-primary text-wrap m-3 fs-3"  role="status"  style =  {{display:'none', width: '69rem'}}>
    <p id = "Questions" ></p>
  </div></div>
  <div  class="justify-content-center" id = "questions" style =  {{display:'none'}}>
        <div class="mb-3" >
  <label for="formGroupExampleInput" class="form-label">Example label</label>
  <input type="text" class="form-control" id="QuestionInput" placeholder="Example input placeholder" />
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Another label</label>
  <input type="text" class="form-control" id="QuestionInput2" placeholder="Another input placeholder" />
</div>
</div></>);
}
export default Questions;