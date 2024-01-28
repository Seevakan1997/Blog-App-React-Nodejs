import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import UserTempImg from '../img/userimg.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext';

function Single() {
  const [post,setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  const {currentUser}  = useContext(AuthContext);

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[postId]);

  const handleDelete = async ()=>{

    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
    try{
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    }catch(err){
      console.log(err);
    }
   }
  }

  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }
  return (
    <div className='single'>
      <div className='content'>
        <img src={`../upload/${encodeURIComponent(post.img)}`}/>
        <div className='user'>
        {post.userImg ? <img src={`/upload/userImg/${post.userImg}`} alt=''/> : <img src={UserTempImg} alt=''/>}

        <div className='info'>
          <span>{post?.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>

        {currentUser?.username && currentUser.username === post.username &&<div className='edit'>
          <Link to={`/write?edit=2`} state={post}>
            <img src={Edit} alt=''/>
          </Link>
          <img onClick={handleDelete} src={Delete} alt=''/>
        </div>}
        </div>
        <h1>{post.title}</h1>
        <p>
          {getText(post.desc)}
        </p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single