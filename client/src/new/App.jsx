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
import InfiniteScrollPost from './components/InfiniteScrollPost';

// const index = 0;
let counter = 5;

// const posts = {
//   userName: "Nilu-Chan",
//   title: "Hello", 
//   post: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   likes: 0,
//   time : '15/266/26',
//   imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Lunch_bags_random_picture_for_random_wikis.jpg"
// };
const App = () => {
  const {postArray} = useContext(PostContext);
  const [isPostAvail, setIsPostAvail] = useState(true);
  const [loading,setLoading] = useState(true);
  const [initialLength, setInitialLength] = useState(()=>{
    if(!postArray.length){
      setIsPostAvail(false);
      setLoading(false);
      return 0;
    }
    else if(postArray.length < 5) return postArray.length;
    else return 5;
  });
  const [data, setData] = useState(postArray);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [openAddPost,setOpenAddPosts] = useState(false);
  const {ref,isComponentVisible,setIsComponentVisible} = useComponentVisible(openAddPost);
  // const handleClick = ()=>{
  //   setOpenAddPosts(true);
  // }

  const fetchMoreData = () => {
    // console.log(data.length);
    if (data.length < postArray.length) {
      setTimeout(() => {
        // console.log(counter);
        setData(data.concat(Array.from({ length: 5 }, () => {
          counter = counter + 1;
          return {...postArray[counter - 1]}
        }
        )));
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
      {
        (!isPostAvail) ?
        <div className='w-full flex flex-col justify-evenly items-center'>
          <p className='text-xl text-black font-semibold'>Nothing to Show here...</p>
          <p className='text-2xl text-black font-semibold'>Click <div className='inline cursor-pointer text-blue-600' onClick={()=>{
            setOpenAddPosts(true);
            setIsComponentVisible(true);
          }}>Add Post</div> to get started...</p>
        </div> :
        <InfiniteScrollPost setLoading = {setLoading} fetchMoreData = {fetchMoreData} hasMore = {hasMoreData} data={data} loading={loading}/>
      }
      </div>
    </div>

  )
}

export default App

