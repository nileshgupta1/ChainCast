import { useState } from 'react';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Post from './components/Post';
// import posts from './utils/posts';
import InfiniteScroll from 'react-infinite-scroll-component';

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


  const fetchMoreData = () => {
    // console.log(data.length);
    if (data.length < 10) {
      setTimeout(() => {
        setData(data.concat(Array.from({ length: 5 }, () => ({ ...posts }))));
      }, 1000);
    }
    else {
      setHasMoreData(false);
    }
  }
  return (
    <div className='bg-body h-screen w-full overflow-hidden'>
<<<<<<< HEAD
        <Navbar/>
        {/* <div className='flex flex-row justify-between w-full h-screen'> */}
          <SideBar/>
          <div id = "parentScrollDiv" className='h-screen overflow-auto customScroll mt-10'>
            <InfiniteScroll 
              dataLength={data.length} 
              next={fetchMoreData}
              hasMore={hasMoreData} 
              loader={<p>Loading.....</p>} 
              endMessage={"You have reached the end"}
              scrollableTarget="parentScrollDiv"
            >
              {
                data.map((post,index) => (
                  <Post key = {index} userName={post.publisher} postContent = {post.postContent} imgSrc = {post.imgSrc} />
                ))
              }
            </InfiniteScroll>
          </div>        
        {/* </div> */}
=======
      <Navbar />
      {/* <div className='flex flex-row justify-between w-full h-screen'> */}
      <SideBar />
      <div id="parentScrollDiv" className='h-screen overflow-auto customScroll'>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMoreData}
          loader={<p>Loading.....</p>}
          endMessage={"You have reached the end"}
          scrollableTarget="parentScrollDiv"
        >
          {
            data.map((post, index) => (
              <Post key={index} userName={post.publisher} postContent={post.postContent} imgSrc={post.imgSrc} />
            ))
          }
        </InfiniteScroll>
      </div>
      {/* </div> */}
>>>>>>> 302f1926a867015ed7bcdc48a7d12b85f6482acc
    </div>

  )
}

export default App

