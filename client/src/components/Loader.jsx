import React, {useState} from "react";
// import { BarsLoader } from 'react-loaders-kit';

//or

import BarsLoader from 'react-loaders-kit/lib/bars/BarsLoader'; // Recommended to reduce bundle size

const Loader = ({loading,setLoading}) => {
    // const [loading, setLoading] = useState(true);

    const loaderProps = {
        loading,
        size: 35,
        duration: 1,
        colors: ['#5e22f0', '#f6b93b']
    }

    return (
        <BarsLoader {...loaderProps} />
    )
}

export default Loader;
