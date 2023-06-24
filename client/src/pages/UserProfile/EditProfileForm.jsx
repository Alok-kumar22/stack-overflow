import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { updateProfile } from '../../actions/user';
const EditProfileForm = ({currentUser,setSwitch}) => {
   const [about,setAbout]=useState(currentUser?.result?.about);
   const [tags,setTags] = useState(currentUser?.result?.tags);
   const [name,setName] = useState(currentUser?.result?.name);
  const dispatch =useDispatch();
  
  const handleSubmit = (e)=>{
e.preventDefault();
  if(tags.length == 0){
   dispatch(updateProfile(currentUser?.result?._id,{name,about,tags: currentUser?.result?.tags}));
  }
  else{
   dispatch(updateProfile(currentUser?.result?._id,{name,about,tags}));
  }
  console.log("update Successfully");
  setSwitch(false);
  }
  
  
  
  
  
   return (
    <div>
       <h1 className='edit-profile-title'>
                  Edit Your Profile
       </h1>
       <h2 className='edit-profile-title-2'>
        Public information
       </h2>
       <form className='edit-profile-form' onSubmit={handleSubmit}>
              <label htmlFor='name'>
                 <h3>Display name</h3>
              <input type='text' value={name}  onChange={(e)=> setName(e.target.value)}/>
              </label>

              <label  htmlFor='about'>
                   <h3>About me</h3>
                   <textarea name='' id="about" cols="30" rows = "10"  value={about} onChange={(e)=> setAbout(e.target.value)}/>
              </label>
              <label htmlFor='Tags'>
                 <h3>Watched Tags</h3>
                 <p>Add tags seperated by 1 space</p>
              <input type='text' id='tags' value={tags}  onChange={(e)=> setTags(e.target.value)}/>
              </label><br></br>
              <input type='submit' value='Save profile' className='user-submit-btn' />
              <button type='submit' className='user-cancel-btn'>Cancel</button>
       </form>
    </div>
  );
}

export default EditProfileForm;
