import { useState } from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Post from './components/Post'
import posts from './utils/posts'

function App() {
  return (
    <div className='bg-body h-screen w-full overflow-y-auto customScroll'>
        <Navbar/>
        <SideBar />
        <div className='flex flex-col justify-center items-center'>
          {
            posts.map((post,index) => (
              <Post key = {index} userName={post.publisher} postContent = {post.postContent} image = {post.imgSrc}/>
            ))
          }
        </div>
    </div>
    
  )
}

export default App
