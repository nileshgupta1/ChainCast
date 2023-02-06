import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import Loader from './Loader';

const InfiniteScrollPost = ({setLoading,fetchMoreData,hasMore,data,loading}) => (
    <div id="parentScrollDiv" className='h-screen w-full flex items-start justify-around md:justify-center overflow-auto customScroll scroll-smooth'>
    <InfiniteScroll
      dataLength={data.length}
      next={()=>{
        setLoading(true);
        fetchMoreData();
      }}
      hasMore={hasMore}
      loader={
        <div className='flex justify-center mb-40 items-center h-2/5 py-4 w-full overflow-hidden'> 
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
)

export default InfiniteScrollPost;