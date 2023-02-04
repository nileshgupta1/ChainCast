import { useState } from "react";
import { AiOutlineClose,AiOutlineMenu } from "react-icons/ai";
import useComponentVisible from '../hooks/useComponentVisible';


const SideBarItem = ({title})=>{
    return (
        <div className="mt-10 ml-10 text-lg py-2 h-10 hover:text-black hover:text-xl text-sky-700 cursor-pointer flex items-center justify-start">
                {title}
        </div>
    )
}

const SideBar = () => {
    const [toggleMenu,setToggleMenu] = useState(false);
    const {ref,isComponentVisible,setIsComponentVisible} = useComponentVisible(false);
    return (
        <>
            <div className="md:w-[400px] h-3/4 flex-col md:flex hidden sidebar-blur mx-10 mt-10 rounded-2xl">
                {
                    ["Home","Trending","Streaming","Account"].map((item,index)=>(
                        <SideBarItem title = {item} key = {index+item}/>
                    ))
                }
            </div>
            <div>
            {toggleMenu ?
                <AiOutlineClose fontSize={28} color = "blue" className="ml-5 md:hidden cursor-pointer" onClick={()=>{
                    setIsComponentVisible(false);
                }}/> 
                : 
                <AiOutlineMenu fontSize={30} className="mx-10 mt-5 md:hidden rounded-md cursor-pointer group-hover:bg-white p-1" onClick={()=>{
                    setIsComponentVisible(true);
                }}/>
                }
            </div>
                
            <div ref={ref}>
            {
                (isComponentVisible) && (
                    <div className={`z-10 fixed top-0 -left-2 p-3 w-[30vw] h-screen shadow-2xl md:hidden
                    flex-full flex-col justify-start items-end rounded-md animate-slide-in
                    `}>
                        <div className='text-xl w-full my-2'>
                            <AiOutlineClose fontSize={28} color = "blue" className = "ml-2 cursor-pointer" onClick={()=>{
                                setIsComponentVisible(false);
                            }}/>
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