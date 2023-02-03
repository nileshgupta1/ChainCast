import { useState } from 'react';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Post from './components/Post';
// import posts from './utils/posts';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddPost from './components/AddPost';
import Loader from './components/Loader';
import useComponentVisible from './hooks/useComponentVisible';

// const index = 0;
// let counter = 0;

const posts = {
  publisher: "Nilu-Chan",
  postContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  likes: 0,
  imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Lunch_bags_random_picture_for_random_wikis.jpg"
};
const App = () => {
  const [data, setData] = useState(Array.from({ length: 5 }, () => ({ ...posts })));
  const [hasMoreData, setHasMoreData] = useState(true);
  const [openAddPost,setOpenAddPosts] = useState(false);
  const [loading,setLoading] = useState(true);
  const {ref,isComponentVisible,setIsComponentVisible} = useComponentVisible(openAddPost);
  // const handleClick = ()=>{
  //   setOpenAddPosts(true);
  // }

  const fetchMoreData = () => {
    // console.log(data.length);
    if (data.length < 50) {
      setTimeout(() => {
        setData(data.concat(Array.from({ length: 5 }, () => ({ ...posts }))));
        setLoading(false);
      }, 4000);
    }
    else {
      setHasMoreData(false);
    }
  }
  return (
    <div className='bg-body w-full h-screen overflow-y-hidden'>
      <Navbar setIsComponentVisible = {setIsComponentVisible} setOpenAddPosts={setOpenAddPosts}/>
      <div className='flex flex-row justify-between w-full h-screen'>
      <SideBar />
      {
        isComponentVisible && <AddPost reference = {ref} setIsComponentVisible = {setIsComponentVisible} openAddPost = {openAddPost} setOpenAddPosts = {setOpenAddPosts}/>
      }
      <div id="parentScrollDiv" className='h-screen flex overflow-auto customScroll scroll-smooth'>
        <InfiniteScroll
          dataLength={data.length}
          next={()=>{
            setLoading(true);
            fetchMoreData();
          }}
          hasMore={hasMoreData}
          loader={
            <div className='flex justify-center mb-40 items-center h-2/5 py-4 w-4/5 ml-14'> 
              <Loader loading={loading} setLoading={setLoading}/>
            </div>
          }
          endMessage={
            <div className='flex text-black text-2xl font justify-center mb-40 items-center h-2/5 py-4 w-4/5 ml-14'>
              You have reached the end...
            </div>
          }
          scrollableTarget="parentScrollDiv"
        >
          {
            data.map((post, index) => (
              <Post key={index} userName={post.publisher} postContent={post.postContent} imgSrc={post.imgSrc} />
            ))
          }
        </InfiniteScroll>
      </div>
      </div>
    </div>

  )
}

export default App

