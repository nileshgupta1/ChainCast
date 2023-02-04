import { useState } from 'react';
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { TbMessage } from 'react-icons/tb';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { BsSave, BsCoin } from 'react-icons/bs';
import posts from '../utils/posts';
const PostSideBar = () => {
    const [like, setLike] = useState(0);
    const handleLike = () => {
        setLike(like + 1);
    }
    const handleDislike = () => {
        if (!like) return;
        setLike(like - 1);
    }
    return (
        <div className=" bg-gray-100 min-w-max w-[15px] border border-black rounded-xl h-40 flex flex-col justify-center items-center p-0 ml-2">
            <button onClick={handleLike} className="hover:bg-gray-400 w-full rounded-tl-xl rounded-tr-xl h-1/3 px-2.5 py-2.5">
                <SlArrowUp fontSize={12} />
            </button>
            <div className='h-1/3 pt-3'>{like}</div>
            <button onClick={handleDislike} className="hover:bg-gray-400 w-full rounded-bl-xl rounded-br-xl h-1/3 px-2.5 py-2.5">
                <SlArrowDown fontSize={12} />
            </button>
        </div>
    )
}
const BottomBar = () => {
    return (
        <div className="flex flex-row px-2 py-3">
            <div className='flex flex-row items-center px-2 py-2 group cursor-pointer'>
                <TbMessage fontSize={20} />
                <p className=' text-slate-800 text-gradient font-bold text-md px-2 py-2 group-hover:font-bold cursor-pointer'>Comments</p>
            </div>
            <div className='flex flex-row justify-center group items-center px-2'>
                <AiOutlineShareAlt fontSize={20} />
                <p className=' text-slate-800 text-gradient font-bold text-md px-2 group-hover:font-bold cursor-pointer'>Share</p>
            </div>
            <div className='flex flex-row justify-center group items-center px-2'>
                <BsSave fontSize={20} />
                <p className=' text-slate-800 text-gradient font-bold text-md px-2 group-hover:font-bold cursor-pointer'>Save</p>
            </div>
            <div className='flex flex-row justify-center group items-center px-2'>
                <BsCoin fontSize={20} />
                <p className=' text-slate-800 text-gradient font-bold text-md px-2 group-hover:font-bold cursor-pointer'>Tip</p>
            </div>
            <div className='flex flex-row justify-center group items-center px-2'>
                <p className=' text-slate-800 text-gradient font-bold text-md px-2 group-hover:font-bold cursor-pointer'>More...</p>
            </div>
        </div>);
}
const Post = ({ postContent, userName, title ,imgSrc}) => {
    return (
        <div className='sm:whitespace-normal sm:w-[650px] md:w-full lg:w-[800px] flex flex-col justify-center rounded-xl shadow-xl items-center bg-post border border-black mb-8'>
            <div className='text-gray-600 flex w-full text-sm justify-start items-start mt-3'>
                    <div className='mr-1 ml-12'>Posted By {userName}</div>
                    <div className=''>{`some`} days ago</div>
            </div>
            <div className='flex flex-col justify-center w-full items-center'>
                <div className='flex flex-row w-full justify-between mt-5'>
                    <PostSideBar />
                    <div className='flex flex-col overflow-y-clip w-full h-60'>
                        <div className='px-4 mx-5 font-semibold text-xl'>
                            <div className=''>

                            </div>
                            {title}
                        </div>
                        <div className='py-4 text-clip px-4 mx-5'>
                            {postContent}
                        </div>
                        <div className='py-4 text-clip px-4 ml-5 mr-5 flex justify-center'>
                            <img className = 'rounded-md' src = {imgSrc} alt = "image"/>
                        </div>
                    </div>
                </div>
                <div>
                    <BottomBar />
                </div>
            </div>

        </div>
    )
}
export default Post;