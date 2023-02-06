import { Web3Storage } from 'web3.storage';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { TbColumnInsertLeft } from 'react-icons/tb';

export const PostContext = React.createContext();


var storedCids = JSON.parse(localStorage.getItem("cid")) || [];
var storedPosts = JSON.parse(localStorage.getItem("post")) || [];
let newCidOfArr;
export const PostProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);    
    // const [mainCid,setMainCid] = useState( localStorage.latestMainCid ||'bafybeiasbtpoqbcwaxepv3tbfewxse4qg7c7cuvqzmag4oywbzcyuw66kq');
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
        // console.log('stored files with cid:', cid);
        return cid;
    }
    const makeCidArr = async (arr)=>{
        const blob = new Blob([JSON.stringify(arr)],{type: 'application/json'})
        const files = [
            new File([blob],'cid-array.json')
        ]
        const arr_cid = await storeFiles(files);
        console.log("new arr_cid",arr_cid);
        return arr_cid;
    }
    const retrieveArr = async (cid)=>{
        const res = await client.get(cid);
        const files = await res.files();
        axios.get(`https://${files[0].cid}.ipfs.w3s.link`)
        .then((response)=>{
            return [...response.data];
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // console.log('fetched JSON');
        });
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

        return post_cid;
        // setCidArr((prev)=>{
        //     return [...prev,post_cid]
        // })
        // // localStorage.setItem("cid", JSON.stringify(storedCids));
        // retrieveFiles(mainCid);
    }
    const getFiles = async (cid)=>{
        var postObject = {};
        const resp = await client.get(cid);
        const f = await resp.files();
        await axios.get(`https://${f[0].cid}.ipfs.w3s.link`)
                .then((r)=>{
                    // console.log("fetching");
                    postObject = {
                        ...r.data,
                        imgSrc: `https://${f[1].cid}.ipfs.w3s.link`
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
                .finally(()=>{
                    console.log("post added");
        })
        return postObject;
    }
    const retrieveFilesFromArray = (arr) =>{
        var array = [];
        for(var i = 0;i < arr.length;i++){
            var po = getFiles(arr[i]);
            array.concat(Array.from({length:1},()=>({...po})));
        }
        console.log('array :',array);
    }
    const retrieveFiles = async (cid) => {
        var postArray = [];
        const res = await client.get(cid);
        const files = await res.files();
        // console.log(files[0].cid);
            axios.get(`https://${files[0].cid}.ipfs.w3s.link`)
                .then(async function (response) {
                    var pcid;
                    for(pcid in response.data){
                        const resp = await client.get(response.data[pcid]);
                        const f = await resp.files();
                        // console.log(response.data[pcid]);
                        axios.get(`https://${f[0].cid}.ipfs.w3s.link`)
                        .then((r)=>{
                            postArray.push({...r.data,imgSrc: `https://${f[1].cid}.ipfs.w3s.link`});
                         })
                        .catch((error)=>{
                            console.log(error);
                        })
                        .finally(()=>{
                            console.log("post added");
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.log('fetched post array');
                });
        // setData([...postArray]);
        return postArray;
    }
    // useEffect(()=>{
    //     newCidOfArr = makeCidArr();
    //     setMainCid(newCidOfArr);
    //     retrieveFiles(mainCid);
    // },[cidArr]);
    return(
        <PostContext.Provider value={{retrieveFilesFromArray,getAccessToken,storeFiles,makeFileObjects,retrieveFiles,isLoading,isLoaded,makeCidArr,newCidOfArr}}>
            {children}
        </PostContext.Provider>
    )
}