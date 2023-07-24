import React,{useState} from 'react';
import './AskQuestion.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { askQuestion, fetchAllQuestion } from '../../actions/question';


const AskQuestion = () => {
  const [questionTitle,setQuestionTitle] = useState('');
  const [questionBody,setQuestionBody]  = useState('');
  const [questionTags,setQuestionTags] = useState(''); 
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector((state)=>(state.currentUserReducer));

  const handleEnter = (e)=>{
    if(e.key ==='Enter'){
      setQuestionBody(questionBody +"/n")
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
  //console.log({questionTitle,questionBody,questionTags});
  if(!questionTitle || !questionBody || !questionTags){
    alert('all paremeters are required!');
  }
  else {
    
    dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:user.result.name,userId:user?.result?._id}))
   dispatch(fetchAllQuestion());
   navigate('/');
  }
  }
  return (
   <div>
      <div className='ask-Question'>
        <div className='ask-ques-container'>
            <h1>Ask a public Question</h1>
            <form onSubmit={handleSubmit}>
              <div className='ask-form-container'>
                 <label htmlFor='ask-ques-title'>
                  <h4>Title</h4>
                  <p>Be specific ans imagine your question</p>
                  <input type ='text' value={questionTitle} onChange={(e)=>{setQuestionTitle(e.target.value)}} id='ask-ques-title' placeholder='e.g. Is there an R function for finding'/>
                 </label>

                 <label htmlFor='ask-ques-body'>
                  <h4>Body</h4>
                  <p>Be specific ans imagine your question</p>
                  <textarea name='body'  id='ask-ques-body'  value={questionBody} onChange={(e)=>{setQuestionBody(e.target.value)}} cols="30" rows="10"  onKeyPress={handleEnter} />
                 </label>

                 <label htmlFor='ask-ques-title'>
                  <h4>Tags</h4>
                  <p>Be specific ans imagine your question</p>
                  <input type ='text' value={questionTags} onChange={(e)=>{setQuestionTags(e.target.value.split(" "))}} id='ask-ques-title' placeholder='e.g. Is there an R function for finding'/>
                 </label>
              </div>
              <input type ='submit' className='review-btn' value ='Review your Question'/>
            </form>
        </div>
      </div>
   </div>
  );
}

export default AskQuestion;
