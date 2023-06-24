import React from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import Question from './Question';
import './HomeMainbar.css';
import QuestionList from './QuestionList';
import { useSelector } from 'react-redux';
const HomeMainbar = () => {
  

   
   const user=useSelector(state=>(state.currentUserReducer));
   const questionsList = useSelector(state => state.questionsReducer)
   const  navigate=useNavigate();
/*
  var questionsList = [{
    _id:1,
    upvotes:3,
    downvotes:2,
    noOfAnswers:2,
    questionTitle:"What is a function",
    questionBody:"It meant to be",
    questionTags:["java","node js","react js", "mongodb"],
    userPosted:"mano",
    askedOn:"jan 1",
    userId:1,
     answer:[{
      answerBody:"Answer",
      userAnswered:"Kumar",
      answerredOn:"jan 2",
      userId:2,
     }]
  },{
    _id:2,
    upvotes:3,
    downvotes:2,
    noOfAnswers:2,
    questionTitle:"What is a function",
    questionBody:"It meant to be",
    questionTags:["javascript","R","python"],
    userPosted:"mano",
    askedOn:"jan 1",
    userId:1,
   answer:[{
    answerBody:"Answer",
    userAnswered:"Kumar",
    answerredOn:"jan 2",
    userId:2,
   }]  },{
    _id:3,
    upvotes:3,
    downvotes:2,
    noOfAnswers:3,
    questionTitle:"What is a function",
    questionBody:"It meant to be",
    questionTags:["javascript","R","python"],
    userPosted:"mano",
    askedOn:"jan 1",
    userId:1,
   answer:[{
    answerBody:"Answer",
    userAnswered:"Kumar",
    answerredOn:"jan 2",
    userId:2,
   }]  }]
  */
  const location = useLocation();


   

  const redirect = ()=>{
    alert("login or signup to ask a question");
    navigate('/Auth');
  }

  const chechAuth = ()=>{
    
      navigate('/AskQuestion');
    
  }

  return (
    <div className='main-bar'>
       <div className='main-bar-header'>
             {location.pathname === '/' ? <h1>Top Questions</h1>: <h1>All Questions</h1>}
             <Link to={  user=== null?
               redirect(): `/AskQuestion`} onClick={chechAuth} className='ask-btn'>Ask Question</Link>
       </div>
       <div >
        { 
          questionsList.data === null ?
          <h1>Loading...</h1>:
          <>
            <p>{questionsList.data.length} Questions</p>
            <QuestionList  questionsList={questionsList.data} />
          </>
        }
       </div>
    </div>
  );
}

export default HomeMainbar;
