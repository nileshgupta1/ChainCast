import { useState,useRef,useEffect } from "react";

function useComponentVisible (intialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(intialIsVisible);
    const ref = useRef(null);
    const handleClickOutside = (event)=>{
        if(ref.current && !ref.current.contains(event.target)){
            setIsComponentVisible(false);
        }
    };

    useEffect(()=>{
        document.addEventListener('click',handleClickOutside,true);
        return ()=>{
            document.removeEventListener('click',handleClickOutside,true);
        };
    },[]);

    return {ref,isComponentVisible,setIsComponentVisible};
}
export default useComponentVisible;