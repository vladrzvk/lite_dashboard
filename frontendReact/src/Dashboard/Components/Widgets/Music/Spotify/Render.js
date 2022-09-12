import {FaSearch} from "react-icons/all";
import { useState } from "react";
import PlayWidget from "react-spotify-widgets";
import SoptifyService from "../../../../Services/spotify.service";
import ToastService from "../../../../Services/toast.service";

function Render() {
	const [haveAlbum, setHaveAlbum] = useState(false);
	const [currentAlbum, setCurrentAlbum] = useState(null);
	const [isLoggedSpotify, setIsLoggedSpotify] = useState(false);
	const [searchResult, setSearchResult] = useState([]);

	function onSearch(e){
        e.preventDefault();
        SoptifyService.searchAlbums(document.forms.searchBarAlbum.searchAlbum.value)
        .then(
			(response) => {

				let albumsResult = [];
				let albums = response.data;
				console.log(albums);
				albums.albums.items.forEach(album => {
					albumsResult.push({
						name: album.name,
						image: album.images[1].url,
						albumId: album.id
					})
				})
				console.log(albumsResult);
				setSearchResult(albumsResult);

			},
			(error) => {
				ToastService.error(error.toString());
			}
        )

    }



	return (
		<>
            <div className="flex flex-col bg-white" style={{minWidth:"300px"}}>
                {!isLoggedSpotify ? (

                	<>
                		<div>
	                    	<button
		                        onClick={()=>{
		                            SoptifyService.login();
		                            setIsLoggedSpotify(true);
		                        }}
		                        className="p-2 rounded-full bg-green-500 shadow text-white">
		                        Login to Spotify
	                        </button>
                		</div>
                	</>

                ):(
                    <>
                        {!haveAlbum ? (
                            <>
                                <div className="flex justify-center mb-2">
									<div className="xl:w-96">
						                <form name="searchBarAlbum" onChange={onSearch} onSubmit={onSearch}>
						                    <div className="input-group relative flex flex-row items-stretch w-full rounded">
						                        <input type="search"
						                        	   name={"searchAlbum"}
						                               className="form-control flew-grow relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						                               placeholder="Search album" aria-label="Search" aria-describedby="button-addon2" />
						                        <button type="submit"
						                                className="hover:bg-gray-200 flex justify-center items-center p-2 rounded-md">
						                            <FaSearch/>
						                        </button>
						                    </div>
						                </form>
						            </div>
				        		</div>
                                {searchResult ? (
                                    <>
                                        {searchResult.length > 0 ? (
                                            searchResult.map((item) => {
                                                return(
                                                    <div
                                                        onClick={()=>{
                                                        	setCurrentAlbum(item);
                                                            setHaveAlbum(true);

                                                        }}
                                                        className="flex flex-row justify-between items-center hover:bg-gray-200 p-1 rounded-md gap-3">
														<img
															className="w-10 h-10 rounded-sm"
															src={item.image}
															alt="img"
														/>
                                                        <div className="text-left flex-grow flex flex-row text-xl">
                                                      	   {item.name}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <p>No albums founded</p>
                                        )}
                                    </>

                                ) : null}
                            </>
                        ) : (
                            <>
                            	<div className="relative">
                                    <button
                                        onClick={()=>{
                                            setHaveAlbum(false)
                                        }}
                                        className="p-2 rounded-full bg-white shadow absolute top-0 right-0 border border-gray-300">
                                        <FaSearch/>
                                    </button>
                                </div>
                                <div className="flex justify-center">
									<PlayWidget width={370}
												height={420}
												uri={`spotify:album:${currentAlbum.albumId}`}
												lightTheme={true}
									/>
						        </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
		)
}export default Render;