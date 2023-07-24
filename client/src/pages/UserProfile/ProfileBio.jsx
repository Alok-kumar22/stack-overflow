import React,{useEffect,useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { BiUserCircle, BiCommentDetail } from "react-icons/bi";
import { getuserPosts } from '../../actions/posts';
import axios from 'axios';
import { getPosts, likepost } from "../../actions/posts";
import { AiFillHeart } from "react-icons/ai";
const ProfileBio = ({currentProfile,posts}) => {
  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const user = useSelector((state) => state.currentUserReducer);
  
  const [comment, setComment] = useState("");;
  const handlelike = (event, id) => {
    event.preventDefault();
    if (user === null) {
      alert("Please Sign Up Or login");
      navigate("/");
    }
    dispatch(likepost(id, { userId: user.result._id }));
  };
  const handlecomment = (event) => {
    event.preventDefault();
    setShowCommentInput(!showCommentInput); // Toggle the comment input
  };
  const submitcomment = async (event, id) => {
    event.preventDefault();
    const userName = user.result.name;
    try {
      axios.put(`http://localhost:5000/post/${id}/comment`, {
        userName,
        comment,
      });
      handlecomment(event);
    } catch (error) {
      console.log(error);
    }
  };
   
  return (
    <div>
      <div>
      {
        currentProfile?.tags.length !== 0  ?(
          <>
            <h4>Tags watched</h4>
            {
              currentProfile?.tags.map((tag)=>{
                return (<p>{tag}</p>)
              })
            }
          </>
        ):(<>
        <p>0 Tags Watched</p></>)
      }
    </div>

    <div>
       {
        currentProfile?.about ? (
          <> <h4> About</h4>

          <p>{currentProfile?.about}
          </p>
          
          </>
        ):(<>
        <p>No Bio Found</p>
        </>)
       }
    </div>

    <div className="col-md-9">
          <div className="post">
            
          </div>
        </div>
    </div>
  )
}

export default ProfileBio;
