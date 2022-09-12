
function WindowHeader(props) {
    return(
        <div className="w-full flex items-center justify-start relative border-b dark:border-gray-800">
            <div className="flex items-center justify-center p-1">
                <button onClick={props.close} className="z-10">

                    <div className="bg-red-500 m-1 w-3 h-3 rounded-full"> </div>
                </button>

                <div className="bg-yellow-500 m-1 w-3 h-3 rounded-full"> </div>
                <button onClick={props.maxSize} className="z-10">

                    <div className="bg-green-500 m-1 w-3 h-3 rounded-full"> </div>
                </button>

            </div>
            <div className="w-full flex items-center justify-center p-1 absolute left-0">
                <span className="font-sans text-xs text-gray-500 dark:text-gray-400">{props.title ? props.title : "Window"}</span>
            </div>
        </div>
    );
}export default WindowHeader;