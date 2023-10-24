import React from 'react'

const Menu = () => {
    const posts = [
        {
          id:1,
          title:"apple jdbbub dhdbhd edebdejh",
          desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          img:"https://images.unsplash.com/photo-1584306670957-acf935f5033c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGUlMjBmcnVpdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
          id:2,
          title:"apple jdbbub dhdbhd edebdejh",
          desc:"hsdbha dajfbjdsf djfjdfs df adfhfjf djsj",
          img:"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"
        },
        {
          id:3,
          title:"apple jdbbub dhdbhd edebdejh",
          desc:"hsdbha dajfbjdsf djfjdfs df adfhfjf djsj",
          img:"https://cdn.britannica.com/05/75905-050-C7AE0733/Mangoes-tree.jpg"
        },
        {
          id:4,
          title:"apple jdbbub dhdbhd edebdejh",
          desc:"hsdbha dajfbjdsf djfjdfs df adfhfjf djsj",
          img:"https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg"
        },
      ]
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post=>(
            <div className='post' key={post.id}>
                <img src={post.img} alt=''/>
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu;