import React, { useContext, useState } from 'react';
import Logo from '../img/logo.png';
import {Link} from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import UserTempImg from '../img/userTe.png';


const Navbar = () =>{

  const {currentUser,logout} = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to="/">
          <img src={Logo} alt=''/>
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/?cat=art'>
            <h6>ART</h6>
          </Link>
          <Link className='link' to='/?cat=science'>
            <h6>SCIENCE</h6>
          </Link>
          <Link className='link' to='/?cat=technology'>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className='link' to='/?cat=cinema'>
            <h6>CINEMA</h6>
          </Link>
          <Link className='link' to='/?cat=design'>
            <h6>DESIGN</h6>
          </Link>
          <Link className='link' to='/?cat=food'>
            <h6>FOOD</h6>
          </Link>
          <span className='write'>
            <Link className='link' to='/write'>Write</Link>
          </span>
          <span className='userInfo' onClick={toggleDropdown}>
               {currentUser?.img ?<img src={`/upload/userImg/${currentUser?.img}`} alt=''/>:<img style={{width:80,height:50}} src={UserTempImg} alt=''/>}
               {showDropdown && (
                  <div className='dropdownContent'>
                    {currentUser?<span>{currentUser?.username}</span>:null}
                    {currentUser ? <span><Link className='link' to={`/profile/${currentUser.id}`}>Profile</Link></span> : null}
                    {currentUser? <span onClick={logout}>Logout</span> :  (
                      <>
                        <span><Link className='link' to="/login">Login</Link></span>
                        <span><Link className='link' to="/register">Register</Link></span>
                      </>
                    )}
                  </div>
                )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar