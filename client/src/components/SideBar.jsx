const SideBar = () => {
    return (
        <div className="w-1/5 h-screen flex flex-col sidebar-blur float-left mx-10 rounded-2xl ">
            <div className="my-2 py-2 pl-8 text-sky-700">
                Home
            </div>
            <div className="my-2 py-2 pl-8 text-sky-700">
                Trending
            </div>
            <div className="my-2 py-2 pl-8 text-sky-700">
                Streaming
            </div>
            <div className="my-2 py-2 pl-8 text-sky-700">
                Account
            </div>
        </div>
    )
}
export default SideBar;