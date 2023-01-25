import {useState} from 'react';
import { SlArrowUp,SlArrowDown } from "react-icons/sl";
import {TbMessage} from 'react-icons/tb';
import {AiOutlineShareAlt} from 'react-icons/ai';
import {BsSave,BsCoin} from 'react-icons/bs';
const PostSideBar = ()=>{
    const [like,setLike] = useState(0);
    const handleLike = ()=>{
        setLike(like + 1)
    }
    const handleDislike = ()=>{
        if(!like) return;
        setLike(like - 1);
    }
    return (
        <div className=" bg-gray-100 min-w-max w-[15px] border-2 border-black rounded-xl h-40 flex flex-col justify-center items-center p-0 ml-2">
            <button onClick={handleLike} className = "hover:bg-gray-400 w-full rounded-tl-xl rounded-tr-xl h-1/3 px-2.5 py-2.5">
                <SlArrowUp fontSize={12}/>
            </button>
            <div className='h-1/3 pt-3'>{like}</div>
            <button onClick={handleDislike} className="hover:bg-gray-400 w-full rounded-bl-xl rounded-br-xl h-1/3 px-2.5 py-2.5">
                <SlArrowDown fontSize={12}/>
            </button>
        </div>
    )
}
const BottomBar = ()=>{
    return (
    <div className="flex flex-row px-2 py-3">
        <div className='flex flex-row items-center px-2 py-2 group cursor-pointer'>
            <TbMessage fontSize={20}/>
            <p className=' text-slate-800 font-bold text-md px-2 py-2 group-hover:font-extrabold cursor-pointer'>Comments</p>
        </div>
        <div className='flex flex-row justify-center group items-center px-2'>
            <AiOutlineShareAlt fontSize={20}/>
            <p className=' text-slate-800 font-bold text-md px-2 group-hover:font-extrabold cursor-pointer'>Share</p>
        </div>
        <div className='flex flex-row justify-center group items-center px-2'>
            <BsSave fontSize={20}/>
            <p className=' text-slate-800 font-bold text-md px-2 group-hover:font-extrabold cursor-pointer'>Save</p>
        </div>
        <div className='flex flex-row justify-center group items-center px-2'>
            <BsCoin fontSize={20}/>
            <p className=' text-slate-800 font-bold text-md px-2 group-hover:font-extrabold cursor-pointer'>Tip</p>
        </div>
        <div className='flex flex-row justify-center group items-center px-2'>
            <p className=' text-slate-800 font-bold text-md px-2 group-hover:font-extrabold cursor-pointer'>More...</p>
        </div>
        {/* <div>Share</div>
        <div>Save</div>
        <div>Tip</div>
        <div>...</div> */}
    </div>);
}
const Post = ({postContent,userName})=>{
    return (
        <div className='w-2/3 flex flex-row justify-center rounded-xl overflow-visible shadow-xl items-center bg-post border-2 border-black'>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-black font-semibold text-xl justify-around items-start mt-3'>
                    {userName}                
                </div>
                <div className='flex flex-row'>
                    <PostSideBar/>
                    <div className='py-4 text-clip px-4 ml-5 mr-5 overflow-y-auto'>
                        {postContent}   
                    </div>
                </div>
                <div>
                    <BottomBar/>
                </div>
            </div>
            
        </div>
    )
}
export default Post;