import React,{useEffect} from 'react';
import {Link,useNavigate} from "react-router-dom";
import Avatar from './Avatar/Avatar';
import './Navbar.css';
import { useSelector,useDispatch} from 'react-redux';
import { setCurrentUser } from '../actions/currentUser';
import decode from 'jwt-decode';
const Navbar = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 var user = useSelector((state)=>(state.currentUserReducer))
  
 useEffect(()=>{
   const token = user?.token;
   if(token){
    const decodeToken = decode(token);
    if(decodeToken.exp = 1000 < new Date().getTime()){
      handleLogOut();
    }
   }

   dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))));
   
  },[dispatch]);

const handleLogOut = ()=>{
  dispatch({type:'LOGOUT'});
  navigate('/');
  dispatch(setCurrentUser(null));
}

 return (
    <nav className='main-nav'>
      <div className='navbar'>
        <Link to='/' className='nav-item nav-btn'>About</Link>
        <Link to='/' className='nav-item nav-btn'>Products</Link>
        <Link to='/' className='nav-item nav-btn'>For Teams</Link>
        <form>
          <input type='text' placeholder='Search...' />
        </form>

        {user === null ? <Link to='/Auth' className='nav-item nav-links'>Log In</Link>:<>

        <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to={`/Users/${user.result._id}`} className='' style={{color:"white",textDecoration:"none"
        }}> {user.result.name.charAt(0)} </Link> </Avatar>
        
        <Link to={`/Subscription/${user.result._id}`} className='sub-btn-link'>Subscription</Link>
         <button className='nav-item nav-links' onClick={handleLogOut}>Log Out</button>
        </>}
      </div>
    </nav>
  );
}

export default Navbar;
