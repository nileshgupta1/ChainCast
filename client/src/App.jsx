import { useState,useContext } from 'react';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Post from './components/Post';
// import posts from './utils/posts';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddPost from './components/AddPost';
import Loader from './components/Loader';
import { PostContext } from './context/PostContext';
import useComponentVisible from './hooks/useComponentVisible';

// const index = 0;
let counter = 0;

const posts = {
  userName: "Nilu-Chan",
  title: "Hello", 
  post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  likes: 0,
  time : '15/266/26',
  imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Lunch_bags_random_picture_for_random_wikis.jpg"
};
const App = () => {
  const {storedPosts} = useContext(PostContext);
  // console.log(storedPosts);
  const [data, setData] = useState(Array.from({ length: 5 },()=>{
    if((storedPosts.length < 5)) return {...posts};
    else{
      return {...storedPosts[counter++]};
    }
}));
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
        setData(data.concat(Array.from({ length: 5 }, () => {
          if(counter > (storedPosts.length)) return {...posts};
          else{
            return {...storedPosts[counter++]};
          }
        })));
        setLoading(false);
      }, 2000);
    }
    else {
      setHasMoreData(false);
    }
  }
  return (
    <div className='bg-body w-full h-screen overflow-y-hidden'>
      <Navbar setIsComponentVisible = {setIsComponentVisible} setOpenAddPosts={setOpenAddPosts}/>
      <div className='flex flex-row justify-evenly w-full h-screen'>
      <SideBar />
      {
        isComponentVisible && <AddPost reference = {ref} setIsComponentVisible = {setIsComponentVisible} openAddPost = {openAddPost} setOpenAddPosts = {setOpenAddPosts}/>
      }
      <div id="parentScrollDiv" className='h-full w-full flex items-start justify-start md:justify-center overflow-auto customScroll scroll-smooth'>
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
              (<Post key={index} userName={post.userName} postContent = {post.post} imgSrc={post.imgSrc} title={post.title} />)
            ))
          }

        </InfiniteScroll>
      </div>
      </div>
    </div>

  )
}

export default App

