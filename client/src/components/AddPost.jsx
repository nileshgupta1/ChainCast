import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import ReactDOM from "react-dom";
import { makeFileObjects } from "../../../storage/storage";
const AddPost = ({setIsComponentVisible,reference,setOpenAddPosts})=>{
    const [file,setFile] = useState({});
    const [postContent,setPostContent] = useState({
        username : "Anonymous",
        title : "",
        post : "",
        timestamp : "15/02/5453"
    });
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setPostContent((prev)=>(
            {
            ...prev,
            [name] : value
            }
        ))
    }
    const handleFileChange = (e) => {
        if (e.target.files) {
            console.log(e.target.files)
          setFile(e.target.files[0]);
          console.log(file);
        }
    };
    const handleUpload = (e)=>{
        if(postContent.username === ""){
            setPostContent((prev)=>(
                {
                    ...prev,
                    username : "Anonymous"
                }
            ));
        }
        var dt = new Date();
        const time_str = `${dt.getHours()}:${dt.getMinutes()}  ${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;
        setPostContent((prev)=>({
            ...prev,
            timestamp : time_str
         }));
        makeFileObjects(postContent);
}
    
    const styles = "rounded-md px-4 py-2 bg-gray-50 border border-black focus:ring-black focus:border-black w-10/12 placeholder-shown:text-md mr-5 ml-5 bg-gray-50 text-gray-900 grow-0 shrink-0";
    const textBefore = "bg-gray-900 flex-order w-10/12 h-3/4 rounded-md text-white text-center placeholder-shown:text-center customScroll overflow-y-auto grow shrink";
    const textStyle = "p-2.5 h-4/6 w-10/12 text-md text-gray-900 bg-gray-50 rounded-lg border border-1 border-black focus:ring-black focus:border-black";
   
    return ReactDOM.createPortal(
        <> 
            <div className="sidebar-blur rounded-none fixed flex justify-center items-center modal-blur w-screen h-screen">
                <div ref = {reference} className="bg-white w-2/5 h-3/4 flex flex-col justify-between rounded-xl items-center">
                    <div className='text-xl w-full my-2'>
                        <AiOutlineClose fontSize={20} color = "black" className = "ml-4 p-0.5 mt-2 h cursor-pointer" onClick={()=>{
                            setOpenAddPosts(false);
                            setIsComponentVisible(false);
                        }}/>
                    </div>
                    <div className="flex flex-col justify-around items-center w-full h-3/4">
                    <input type="text" name = "username" onChange={handleChange} className={styles} value={postContent.username}
                        placeholder="Anonymus"
                    />
                    <input type="text" name = "title" onChange={handleChange} value={postContent.title} className={styles}
                        placeholder="Title"
                    />
                    <textarea type="textArea" name="post" onChange={handleChange} value={postContent.post} 
                        rows = "5" cols = "50" placeholder="Post"
                        className={textStyle} 
                    ></textarea>
                    {/* <input type="file" name="files" onChange={handleFileChange} className={styles}
                        placeholder="Upload Image"
                    /> */}
                    </div>
                    <div className="flex flex-row justify-end items-center w-full">
                    <button onClick={()=>{
                        handleUpload();
                    }}
                        className="bg-gray-900 text-white rounded-md px-4 py-2 mb-6 mr-6"
                    >Post</button>
                    </div>
                    
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default AddPost;