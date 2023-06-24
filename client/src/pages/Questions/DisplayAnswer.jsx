import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar/Avatar';
import './Questions.css'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnswer } from '../../actions/question';


const DisplayAnswer = ({question , handleShare}) => {
   const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=>(state.currentUserReducer))
  const handleDelete = (answerId,noOfANswers)=>{
     dispatch(deleteAnswer(id,answerId,noOfANswers - 1));
  }
  return (
    <div>
      {
        question.answer.map((ans)=>{
        return (
            <div className='display-ans' key={ans._id}> <p>{ans.answerBody}</p> 
            <div className='question-actions-user'>
                <div>
                   <button type="button" onClick={handleShare} >Share</button>
                   {
                                                  user?.result?._id === ans?.userId && (<button type='button' onClick={()=>{handleDelete(ans._id,question.noOfAnswers)}} >
                                                  Delete
                                              </button>)
                                                }  
                </div>

                <div>
                    <p>answer {moment(ans.answeredOn).fromNow()}</p>
                    <Link to={`/User/${question.userId}`} className='user-link' style={{color:"#0086d8"}} >
                           <Avatar backgroundColor="green" px='8px' py='5px' >{ans.userAnswered}</Avatar>
                            <div>
                              {ans.userAnswered}
                            </div>
                    </Link>
                
                </div>
            </div>
            </div>
        )
        })
      }
    </div>
  );
}

export default DisplayAnswer;
