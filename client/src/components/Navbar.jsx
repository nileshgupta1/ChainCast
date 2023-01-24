import React from 'react';
import Logo from "../images/redditlogo.png";

function Navbar() {
    return (
        <header className="w-full p-2">
            <div className="mx-4 flex relative">
                <img src={Logo} alt="" className="w-24 h-8 mr-4" />
                <form onSubmit="" className="flex mx-4 flex-grow">
                    <input type="text" className="text-sm border rounded-full w-full p-1 pl-2 pr-0 block bg-gray-100 focus:outline-none text-white"
                        placeholder="Search ChainCast"
                        value=""
                        onChange=""
                    />
                </form>
                <button className="px-5 py-1 mx-1 border rounded-full bg-gray-200">
                    Get App
                </button>
                <button className="px-5 py-1 mx-1 border rounded-full text-white bg-orange-600">
                    Log In
                </button>
            </div>
        </header>
    )
}

export default Navbar