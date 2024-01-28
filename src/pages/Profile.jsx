import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../img/logo.png';
import UserTempImg from '../img/userTe.png';
import { AuthContext } from '../context/authContext';

function Profile() {
  const [file, setFile] = useState(null);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const { currentUser, setCurrentUser,logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const profileUpload = async ()=>{
    try{
      const formData = new FormData();
      formData.append("file",file)

      const res = await axios.post("/profileUpload",formData)
      return res.data;

    }catch(err){
      console.log(err);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
        alert("Please log in to make changes.");
        return;
      }

      let imgUrl = currentUser.img;
      if (file) {
        imgUrl = await profileUpload();
      }
  
    try {
      const updatedUser = await axios.put(`/users/${currentUser.id}`, {
        ...currentUser,
        username: username || currentUser.username,
        email: email || currentUser.email,
        img: imgUrl,
      });
  
      setCurrentUser(updatedUser.data);
      navigate(`/profile/${currentUser.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='profile'>
      <div className='logoProfile'>
        <Link to='/'>
          <img src={Logo} alt='' />
        </Link>
      </div>
      <div className='profileInfo'>
        <div className='profileImg'>
        {currentUser?.img ?<img src={`/upload/userImg/${currentUser?.img}`} alt=''/>:<img src={UserTempImg} alt=''/>}
        </div>
        <h1>{currentUser?.username}</h1>
        <form>
          <div className='imageUpload'>
            <label htmlFor='profileImage'>Upload Profile Image</label>
            <input type='file' id='profileImage' name='profileImage' onChange={e=>setFile(e.target.files[0])} />
          </div>
          <input type='text' placeholder='Username' name='username' value={username || currentUser?.username} onChange={e=>setUsername(e.target.value)} />
          <input type='email' placeholder='email' name='email' value={email || currentUser?.email} onChange={e=>setEmail(e.target.value)} />
          <button onClick={handleClick}>Update</button>
          {currentUser?<button className='logOut' onClick={handleLogout}>Logout</button> :""}
        </form>
      </div>
    </div>
  );
}

export default Profile;
