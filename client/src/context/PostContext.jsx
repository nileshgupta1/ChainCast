import { Web3Storage } from 'web3.storage';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
export const PostContext = React.createContext();


var storedCids = JSON.parse(localStorage.getItem("cid")) || [];
var storedPosts = JSON.parse(localStorage.getItem("post")) || [];


export const PostProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);
    const getAccessToken = ()=>{
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgyQTNDNzQ5MTMwRGE0MTE4NENhNjExNGZiODlGMzYwZkVlMGNCNTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzQ5MjMwMzU4NDUsIm5hbWUiOiJjaGFpbkNhc3QifQ.vXJQnOBWq6bcVbiAQnyxmqzHx3P_B73L1EM0CgvKoO4';
        // return process.env.WEB3STORAGE_TOKEN;
    }
    let client = new Web3Storage({ token: getAccessToken() });
    // const makeStorageClient = () => {
    //     return new Web3Storage({ token: getAccessToken() })
    // }
    
    const storeFiles = async (files)=> {
        const cid = await client.put(files);
        setIsLoading(false);
        console.log('stored files with cid:', cid);
        return cid;
    }
    
    const makeFileObjects = async (formData,imgFile)=>{
        setIsLoading(true);
        const { username, title, post, timestamp } = formData;
        const obj = {
            username: username,
            title: title,
            post: post,
            timestamp: timestamp
        }
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
        const files = [
            new File([blob], 'post-content.json'),
            new File([imgFile], 'post-image.png', { type: "mime/image", })
        ]
    
        const post_cid = await storeFiles(files);
        storedCids.push(post_cid);
        localStorage.setItem("cid", JSON.stringify(storedCids));
        retrieveFiles(post_cid);
    }
    const retrieveFiles = async (cid) => {
        const res = await client.get(cid);
        const files = await res.files();
        var postObject = {};
        console.log(files);
        // for (const file of files) {
            axios.get(`https://${files[0].cid}.ipfs.w3s.link`)
                .then(function (response) {
                    postObject = {
                        ...response.data,
                        imgSrc:`https://${files[1].cid}.ipfs.w3s.link`
                    };
                    storedPosts.push({...postObject});
                    localStorage.setItem("post", JSON.stringify(storedPosts));
                    setIsLoaded(true);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.log('fetched JSON');
                });
        // }
    }
    // const updatePosts = ()=>{
    //     storedCids.map((cid)=>{

    //         storedPosts.push({

    //         })
    //     })
    // }

    useEffect(()=>{
        localStorage.setItem("post", JSON.stringify(storedPosts));
    },[isLoaded]);
    return(
        <PostContext.Provider value={{getAccessToken,storeFiles,makeFileObjects,retrieveFiles,isLoading,storedPosts}}>
            {children}
        </PostContext.Provider>
    )
}