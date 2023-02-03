import React, {useState} from "react";
import { GooeyCircleLoader } from 'react-loaders-kit';

//or

// import GooeyCircleLoader from 'react-loaders-kit/lib/bars/GooeyCircleLoader'; // Recommended to reduce bundle size

const Loader = ({loading,setLoading}) => {
    // const [loading, setLoading] = useState(true);
    const loaderProps = {
        loading,
        size: 80,
        duration: 1,
        colors: ['#f6b93b', '#5e22f0', '#ef5777']
    }

    return (
        <GooeyCircleLoader {...loaderProps} />
    )
}

export default Loader;
