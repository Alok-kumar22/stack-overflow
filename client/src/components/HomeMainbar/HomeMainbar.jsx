import React from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import Question from './Question';
import './HomeMainbar.css';
import QuestionList from './QuestionList';
import axios from 'axios';
import { useSelector } from 'react-redux';
const HomeMainbar = () => {
  

   
   const user=useSelector(state=>(state.currentUserReducer));
   const questionsList = useSelector(state => state.questionsReducer)
   const  navigate=useNavigate();

  const location = useLocation();

  const redirect = ()=>{
   try{
    navigate('/Auth');
   }catch(error){
    console.log(error);
   }
    
  }

  const chechAuth = async()=>{
try{
  if(user === null){
    redirect();
  }

 const userId = user?.result?._id;
 const {data} = await axios.delete(`http://localhost:5000/user/deleteplan/${userId}`);
 const result = await axios.get(`http://localhost:5000/questions/checkquestions/${userId}`);
  
  if(data.data.length === 0 && result.data.length === 1){
    alert("Your daily limit to ask Question is Over");
    navigate("/");
  }
  else if(data.data.length == 0 && result.data.length==0){
    navigate('/AskQuestion')
  }
  else if(data.data[0].plan === "GOLD" ){
    navigate("/AskQuestion");
  }
  else if(data.data[0].plan === "SILVER" && result.data.length === 5){
    alert("Your daily limit of 5 Question to ask  is Over");
    navigate('/');
  }
  else {
    navigate("/AskQuestion");
  }


}catch(error){
  console.log(error);
}
   
  }

  return (
    <div className='main-bar'>
       <div className='main-bar-header'>
             {location.pathname === '/' ? <h1>Top Questions</h1>: <h1>All Questions</h1>}
             <button  onClick={chechAuth} className='ask-btn'>Ask Question</button>
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
