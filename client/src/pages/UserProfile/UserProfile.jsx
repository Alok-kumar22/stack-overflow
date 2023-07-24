import React, { useState,useEffect } from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import Avatar from '../../components/Avatar/Avatar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBirthdayCake,faPen} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';
import './userProfile.css';
import { addfriend, getuserPosts, removefriend } from '../../actions/posts';
const UserProfile = () => {
    const {id}=useParams();
    const users = useSelector((state)=> state.userReducer)
    const currentProfile = users.filter((user)=>user._id === id)[0];
    const currentUser = useSelector((state)=>state.currentUserReducer)
    const posts = useSelector((state)=> state.postReducer);
    const dispatch=useDispatch();
    const [Switch,setSwitch] = useState(false);
    
    const handleFollower=(e,id,userId,userName)=>{
      e.preventDefault();
         dispatch(addfriend(id,{userId,userName}));
    }
    const handleremoveFollower=(id)=>{
      dispatch(removefriend(id,{userId:currentProfile._id}));
    }
   
    return (
    <div className='home-container-1'>
      <LeftSidebar/>
      <div className='home-container-2'>
        <section>
            <div className='user-details-containers'>
                <div className='user-details'>
                      <Avatar  backgroundColor="purple" color="black" fontSize="50px" px="40px" py="30px">
                        {currentProfile?.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className='user-name'>
                          <h1>{currentProfile?.name}</h1>
                          <p>
                            <FontAwesomeIcon icon={faBirthdayCake}/> Member for {moment(currentProfile?.joinedOn).fromNow()}<br></br>
                            
                          </p>
                          <button onClick={(e)=>{handleFollower(e,currentUser?.result?._id,currentProfile._id,currentProfile.name)}} className='auth-btn1'>follow</button>&nbsp;&nbsp;
                          <button onClick={()=>{handleremoveFollower(currentUser?.result?._id)}} className='auth-btn2'>Remove friend</button>
                      </div>
                      <div>
                        {
                            currentUser?.result._id === id  && (
                                <button type='button' className='edit-profile-btn'  onClick={()=>setSwitch(true)}>
                                   <FontAwesomeIcon icon={faPen}/> Edit Profile
                                </button>
                            )
                        }
                      </div>
                      
                </div>

            </div>
            <>
               {
                Switch ? (<EditProfileForm  currentUser={currentUser} setSwitch={setSwitch}  />) :(<ProfileBio currentProfile={currentProfile} posts={posts}/>) 
               }
            </>
        </section>

      </div>
    </div>
  );
}

export default UserProfile;
