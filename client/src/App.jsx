import { useState,useContext,useEffect } from 'react';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Post from './components/Post';
// import posts from './utils/posts';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddPost from './components/AddPost';
import Loader from './components/Loader';
import { PostContext } from './context/PostContext';
import axios from 'axios';
import useComponentVisible from './hooks/useComponentVisible';
import InfiniteScrollPost from './components/InfiniteScrollPost';

// const index = 0;
let counter = 5;
const App = () => {
  const {retrieveFiles,makeCidArr,retrieveFilesFromArray} = useContext(PostContext);
  const [isPostAvail, setIsPostAvail] = useState(true);
  const [mainCid,setMainCid] = useState( localStorage.latestMainCid ||'bafybeihpfn3hdc5kxmkfh63vdkcrheziyv4kyqbpf6mcibbv4ngsamjglm');
  const [cidArr,setCidArr] = useState([]);
  const [loading,setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [hasMoreData, setHasMoreData] = useState(true);
  const [openAddPost,setOpenAddPosts] = useState(false);
  const {ref,isComponentVisible,setIsComponentVisible} = useComponentVisible(openAddPost);
  // const handleClick = ()=>{
  //   setOpenAddPosts(true);
  // }
  const fetchInitialCidArr = ()=>{
    axios.get(`https://${mainCid}.ipfs.w3s.link/cid-array.json`)
        .then((response)=>{
          console.log(response.data);
            setCidArr([...response.data]);
        })
        .catch((error)=>{
            console.log(error);
        })
        .finally(()=>{
            console.log('Fetched Initial CidArr');
        })
  }
  const fetchMoreData = () => {
    if (data.length < data.length) {
      setTimeout(() => {
        setData(data.concat(Array.from({ length: 5 }, () => {
          counter = counter + 1;
          return {...data[counter - 1]}
        }
        )));
        setLoading(false);
      }, 2000);
    }
    else {
      setHasMoreData(false);
    }
  }
  // window.onload(fetchInitialCidArr());
  useEffect(()=>{
    fetchInitialCidArr();
    retrieveFiles(mainCid)
    .then((response)=>{
      setData(response);
      setLoading(false);
    });
    // setData(postArray);
    // setData(()=>{
    //   return [...newArr];
    // });
    // console.log(cidArr);
  },[]);
  return (
    <div className='bg-body w-full h-screen overflow-y-hidden'>
      <Navbar setIsComponentVisible = {setIsComponentVisible} setOpenAddPosts={setOpenAddPosts}/>
      <div className='flex flex-row justify-evenly w-full h-screen'>
      <SideBar />
      {
        isComponentVisible && <AddPost reference = {ref} setIsComponentVisible = {setIsComponentVisible} openAddPost = {openAddPost} setOpenAddPosts = {setOpenAddPosts} cidArr={cidArr} setCidArr={setCidArr}
          makeCidArr={makeCidArr} mainCid={mainCid} setMainCid={setMainCid} setLoading = {setLoading} data={data} setData={setData}
        />
      }
      {
        /* (!isPostAvail) ?
        <div className='w-full flex flex-col justify-evenly items-center'>
          <p className='text-xl text-black font-semibold'>Nothing to Show here...</p>
          <p className='text-2xl text-black font-semibold'>Click <div className='inline cursor-pointer text-blue-600' onClick={()=>{
            setOpenAddPosts(true);
            setIsComponentVisible(true);
          }}>Add Post</div> to get started...</p>
        </div> :*/
        <InfiniteScrollPost setLoading = {setLoading} fetchMoreData = {fetchMoreData} hasMore = {hasMoreData} data={data} loading={loading}/>
      }
      </div>
    </div>

  )
}

export default App

