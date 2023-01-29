import Logo from "../images/reddit-logo.png";

function Navbar() {
    return (
        <nav className="flex p-2 flex-row justify-center mb-8 w-full">
            <img src={Logo} alt="logo" className="w-[5%] md:w-[3%] md:ml-8 md:mr-5 md:p-0 p-1 m-1 cursor-pointer" />
            <input type="text" className="text-sm border w-11/12 border-black rounded-md bg-gray-100 focus:outline-none text-white placeholder-shown:px-4 placeholder-shown:py-1 placeholder-shown:text-md mr-5 ml-5"
                placeholder="Search ChainCast"
                value=""
                onChange=""
            />
            <button className="w-1/12 px-4 py-auto border border-black rounded-md bg-gray-200 hover:bg-gray-400 shadow-sm mr-5">
                Get App
            </button>
            <button className="w-1/12 px-4 mr-1 btn-body border border-black rounded-md bg-black text-white hover:border-white shadow-sm">
                Log In
            </button>
        </nav>
    )
}

export default Navbar;