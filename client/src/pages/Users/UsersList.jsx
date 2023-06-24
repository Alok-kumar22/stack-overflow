import React from 'react';
import { useSelector } from 'react-redux';
import Users from './User';
import './Users.css';
const UsersList = () => {

    const users  = useSelector((state)=>(state.userReducer));

           
  return (
    <div className='userList-container'>
      {
        users.map((user)=>{
          return (<Users user={user} key = {user._id} />)
        })
      }
    </div>
  );
}

export default UsersList;
