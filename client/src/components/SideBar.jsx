import { useState } from "react";
import { AiOutlineClose,AiOutlineMenu } from "react-icons/ai";
// import {useComponentVisible} from '../hooks/useComponentVisible';


const SideBarItem = ({title})=>{
    return (
        <div className="mt-4 py-2 pl-8 text-sky-700 cursor-pointer">{title}</div>
    )
}

const SideBar = () => {
    const [toggleMenu,setToggleMenu] = useState(false);
    // const {ref,isComponentVisible} = useComponentVisible(true);
    return (
        <>
            <div className="w-1/5 h-screen flex-col md:flex hidden sidebar-blur float-left mx-10 rounded-2xl">
                {
                    ["Home","Trending","Streaming","Account"].map((item,index)=>(
                        <SideBarItem title = {item} key = {index+item}/>
                    ))
                }
            </div>
            <div className="flex">
                {toggleMenu ?
                <AiOutlineClose fontSize={28} color = "blue" className="ml-5 md:hidden cursor-pointer" onClick={()=>{
                    setToggleMenu(false)
                }}/> 
                : 
                <AiOutlineMenu fontSize={28} className="ml-5 md:hidden cursor-pointer" onClick={()=>{
                    setToggleMenu(true)
                }}/>
            }
            {
                toggleMenu && (
                    <div className="z-10 fixed top-0 -left-2 p-3 w-[30vw] h-screen shadow-2xl md:hidden
                    flex-full flex-col justify-start items-end rounded-md sidebar-blur animate-slide-in">
                        <div className='text-xl w-full my-2'>
                            <AiOutlineClose fontSize={20} color = "blue" className = "ml-2 cursor-pointer" onClick={()=>{setToggleMenu(false)}}/>
                        </div>
                        {
                            ["Home","Trending","Streaming","Account"].map((item,index)=>(
                        <SideBarItem title = {item} key = {index+item}/>
                        ))
                        
                        }
                    </div>
                )  
            }
            </div>
        </>
    )
}
export default SideBar;