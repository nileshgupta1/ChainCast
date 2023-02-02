import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import ReactDOM from "react-dom";
const AddPost = ({setIsComponentVisible,reference,setOpenAddPosts})=>{
    const [postContent,setPostContent] = useState({
        title : "",
        post : "",
        files : ""
    });
    const handleChange = (e)=>{
        const {name,value} = e.target;
        console.log(name);
        setPostContent((prev)=>(
            {
            ...prev,
            [name] : value
            }
        ))
    }
    const styles = "rounded-md placeholder-shown:px-4 placeholder-shown:py-1 placeholder-shown:text-md mr-5 ml-5";
    return ReactDOM.createPortal(
        <> 
            <div className="sidebar-blur rounded-none fixed flex justify-center items-center modal-blur w-screen h-screen">
                <div ref = {reference} className="bg-white w-1/2 h-1/2 flex flex-col rounded-xl items-center">
                    <div className='text-xl w-full my-2'>
                        <AiOutlineClose fontSize={20} color = "blue" className = "ml-2 cursor-pointer" onClick={()=>{
                            setOpenAddPosts(false);
                            setIsComponentVisible(false);
                        }}/>
                    </div>
                    <input type="text" name = "title" onChange={handleChange} value={postContent.publisher} className={styles}
                        placeholder="Search ChainCast"
                        // value=""
                        // onChange=""
                    />
                    <input type="textarea" name="post" onChange={handleChange} value={postContent.post} 
                        placeholder="Search ChainCast"
                        // value=""
                        // onChange=""
                    />
                    <input type="file" name="files" onChange={handleChange} value={postContent.files} 
                        placeholder="Search ChainCast"
                        // value=""
                        // onChange=""
                    />
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default AddPost;