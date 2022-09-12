import {FaPlay, FaSearch} from "react-icons/all";
import {useState} from "react";

import DailymotionService from "../../../../Services/requests/dailymotion.request.service";

function Render() {

    const [videoFocus, setVideoFocus] = useState(null);
    const [videoList, setVideoList] = useState([]);

    function searchMethod(res)  {

        DailymotionService.search(res).then(
            (response) => {
                setVideoList(response.data["list"])
                console.log(videoList[0])
            },
            (error) => {
                setVideoList([])
            }
        );
    }

    function onSearch(e){
        e.preventDefault();
        const form = document.forms.searchBarCitie;
        const search =   form.search.value;
        console.log(search);
        if (search !== '') {
            setVideoFocus(null);
            searchMethod(search);

        }
        else{
            searchMethod([]);
        }
    }
    return(
        <>
            <div className="flex flex-col bg-white rounded p-1 w-full max-w-xs" style={{minWidth: "500px"}}>
                <div className="flex justify-center">
                    <div className="mb-3 xl:w-96">
                        <form name="searchBarCitie" onChange={onSearch} onSubmit={onSearch}>
                            <div className="input-group relative flex flex-row items-stretch w-full mb-4 rounded">
                                <input type="search"

                                       name={"search"}
                                       className="form-control flew-grow relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                       placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                <button
                                    type="submit"
                                    className="hover:bg-gray-200 flex justify-center items-center p-2 rounded-md">
                                    <FaSearch/>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

                        {!videoFocus ? (
                            <>
                                {videoList.length> 0 ? (
                                    videoList.map(item=>{
                                        return(
                                            <div
                                                onClick={()=>{
                                                    setVideoFocus(item);
                                                }}
                                                className="group flex flex-row justify-between items-center hover:bg-gray-200 p-1 rounded-md gap-2">
                                                <img className={"h-16 w-20 rounded-sm"}
                                                    src={item.thumbnail_240_url}
                                                alt={"nop"}/>
                                                <div className="flex flex-col flex-grow">
                                                    <span>{item.title}</span>
                                                    <span className={"text-sm"}>{item["owner.username"]}</span>
                                                </div>


                                                <div className="text-gray-400 group-hover:text-gray-800">

                                                    <FaPlay/>
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>No videos found yet</p>
                                )}


                            </>
                        ) : (
                            <div style={{height : "300px"}}>
                                <iframe
                                    frameBorder="0" type="text/html"
                                    src={videoFocus.embed_url} width="100%"
                                    height="100%" allowFullScreen allow="autoplay"></iframe>
                            </div>
                        )
                        }





            </div>
        </>
    )
}export default Render;

