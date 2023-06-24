import React,{useState} from 'react';
import { useParams,Link,useNavigate ,useLocation} from 'react-router-dom';
import upvote from '../../assets/sort-up.svg';
import downvote from '../../assets/sort-down.svg';
import './Questions.css';
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestion, fetchAllQuestion, postAnswer,voteQuestion } from '../../actions/question';
import moment from 'moment';
import copy from 'copy-to-clipboard';

const QuestionDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const questionsList = useSelector(state => state.questionsReducer)
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state)=>(state.currentUserReducer));
  const [Answer,setAnswer] = useState('');
  const url = 'http://localhost:3000'

   const handlePosAns = (e,answerLength)=>{
     e.preventDefault();
     
       if(Answer ===''){
        alert('Enter an answer befor submitting');  
       }
       else{
           console.log(answerLength);
          dispatch(postAnswer({id,noOfAnswers:answerLength +1,answerBody:Answer,userAnswered:user.result.name,userId:user?.result?._id}) );
       }
     
   }


   const handleShare = (e)=>{
      try{
          copy(url + location.pathname);
          alert('copied url: ' + url+location.pathname)
      }catch(error){
        console.log(error);
      }
   }

  const handleDelete = (e)=>{
    dispatch(deleteQuestion(id));
    dispatch(fetchAllQuestion());
    navigate('/');
  }


  const handleupVotes = ()=>{
    dispatch(voteQuestion(id,'upvote',user.result._id));
    dispatch(fetchAllQuestion());
  }


  const handledownVotes = ()=>{
    dispatch(voteQuestion(id,'downVote',user.result._id));
    dispatch(fetchAllQuestion());
  }
  return (
    <div  className='question-details-page'>
         {
            questionsList.data === null ?
            <h1>Loading...</h1>:
            <>
              {
                questionsList.data.filter(question => question._id === id).map(question =>{
                    return (
                    <div key={question._id}>
                      <section className='question-details-container'> 
                         <h1>{question.questionTitle}</h1>
                         <div className='question-details-container-2'>
                               <div className='question-votes'>
                                    <img src={upvote} alt="upvote" width="18" onClick={handleupVotes}/>
                                    <p>{question.upVote.length - question.downVote.length}</p>
                                    <img src={downvote} alt="downvote" width="18" onClick={handledownVotes}/>
                               </div>
                               <div style={{width:"100%"}}>
                                          <p className='question-body'>{question.questionBody}</p>
                                          <div className='question-details-tags'>
                                            {
                                              question.questionTags.map((tag)=>{
                                              return ( <p key={tag} >{tag} </p>);
                                              })
                                            }
                                          </div>

                                          <div className='question-actions-user'>
                                             <div>
                                                <button type='button' onClick={handleShare}>
                                                    Share
                                                </button>
                                                {
                                                  user?.result?._id === question?.userId && (<button type='button' onClick={handleDelete} >
                                                  Delete
                                              </button>)
                                                }
                                             </div>
                                             <div>
                                               <p>asked {moment(question.askedOn).fromNow()}</p>
                                               <Link to={`/Users/${question.userId}`} className='user-link' style={{color:"#0086d8"}} >
                                                 <Avatar backgroundColor="orange" px='8px' py='5px' >{question.userPosted}</Avatar>
                                                 <div>
                                                  {question.userPosted}
                                                 </div>
                                               </Link>
                                             </div>
                                          </div>
                               </div>
                         </div>
                      </section>
                      {question.noOfAnswers !== 0 && <section>
                       <h3>{question.noOfAnswers} Answers</h3> 
                       <DisplayAnswer key={question._id} question={question} handleShare = {handleShare}/>
                      </section>
                      }

                      <section className='post-ans-container'>
                       <h3>Your Answer</h3>


                       
                       <form onSubmit={(e)=> {handlePosAns(e,question.answer.length)}}>
                        <textarea value={Answer} name="" id="" cols="30" row="10" onChange={(e)=>{setAnswer(e.target.value)}} ></textarea><hr/>
                        <input type='Submit' className='post-ans-btn' value='Post Your Answer' />
                        
                       </form>
                       <p>
                        Browse other Question tagged
                        {
                          
                          question.questionTags.map((tag)=>{
                            <Link to='/Tags' key={tag} className='ans-tags' ></Link>
                          })
                        } or
                        <Link to='/AskQuestion' style={{textDecoration:"none" , color:"#009dff"}}> Ask Your Own Question</Link>
                       </p>
                      </section>

                    </div> );
                })
              }
            </>
         }
    </div>
  );
}

export default QuestionDetails;
