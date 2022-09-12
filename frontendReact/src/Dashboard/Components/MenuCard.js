import {MdShortcut} from "react-icons/all";

function MenuCard(props){
    return(
        <>
            <div className="flex justify-center">
                <div className="group rounded-lg shadow-lg bg-white hover:bg-opacity-50 bg-opacity-40 max-w-sm relative">

                    <img className="rounded-t-lg group-hover:opacity-90 opacity-80" src={props.icon}
                             alt=""/>

                    <div className="p-6">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">{props.title}</h5>
                        <p className="text-gray-700 text-base mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porttitor massa non elit placerat, at semper magna lobortis. Nam pellentesque dolor eget urna congue laoreet.
                        </p>
                        <button type="button"
                                onClick={() => {
                                    props.closeMenu(false);
                                    props.openWidget(props.widget);


                                }}
                                className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight
                                uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
                                active:shadow-lg transition duration-150 ease-in-out">
                            Open
                        </button>
                        <button type="button"
                                onClick={()=>{
                                    props.favChanges(props.widget);
                                }}
                                className="absolute top-3 right-3 p-5 ml-2 bg-gray-600 bg-opacity-70 text-white font-medium text-sm leading-tight rounded-full shadow-md"
                                data-bs-toggle="tooltip" data-bs-html="true" title="Add a shortcut to the navbar">
                            <MdShortcut/>
                        </button>
                    </div>
                </div>
            </div></>
    )
}export default MenuCard;