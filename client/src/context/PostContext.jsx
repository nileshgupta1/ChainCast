import { Web3Storage } from 'web3.storage';
import React,{useState,useEffect} from 'react';

export const PostContext = React.createContext();

export const PostProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(false);
    const getAccessToken = ()=>{
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgyQTNDNzQ5MTMwRGE0MTE4NENhNjExNGZiODlGMzYwZkVlMGNCNTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzQ5MjMwMzU4NDUsIm5hbWUiOiJjaGFpbkNhc3QifQ.vXJQnOBWq6bcVbiAQnyxmqzHx3P_B73L1EM0CgvKoO4';
        // return process.env.WEB3STORAGE_TOKEN;
    }
    
    const makeStorageClient = () => {
        return new Web3Storage({ token: getAccessToken() })
    }
    
    const storeFiles = async (files)=> {
        const client = makeStorageClient();
        const cid = await client.put(files);
        setIsLoading(false);
        console.log('stored files with cid:', cid);
        return cid;
    }
    
    const makeFileObjects = (formData)=>{
        setIsLoading(true);
        const { username, title, post, time } = formData;
    
        const obj = {
            userName: username,
            title: title,
            post: post,
            time: time
        }
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    
        const files = [
            new File([blob], 'post-content.json'),
            // new File([imageObject], 'post-image.png', { type: "mime/image", })
        ]
    
        const post_cid = storeFiles(files);
        // retrieveFiles(post_cid);
        console.log("Cheers!")
    }
    const retrieveFiles = async (cid) => {
        const client = makeStorageClient()
        const res = await client.get(cid)
        console.log(`Got a response! [${res.status}] ${res.statusText}`)
        if (!res.ok) {
            throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
        }
    
        // unpack File objects from the response
        const files = await res.files()
        for (const file of files) {
            console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
    
        }
    }

    return(
        <PostContext.Provider value={{getAccessToken,makeStorageClient,storeFiles,makeFileObjects,retrieveFiles,isLoading}}>
            {children}
        </PostContext.Provider>
    )
}