import {FaLongArrowAltDown, FaLongArrowAltUp, FaMapPin, FaSearch, FaSpinner, VscGear} from "react-icons/all";
import {useEffect, useState} from "react";
import WeatherService from "../../../../Services/requests/weather.resquest.service";

import JSON_city from "./list_city.json";
import ToastService from "../../../../Services/toast.service";

function Render() {
    const [cities, setCities] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchResult, setSearchResult] = useState(null);


    function findCity(city){
        WeatherService.find(city).then(
            (response) => {
                setCities(response.data)
            },
            (error) => {
                ToastService.error(error.toString())
            }
        );
    }
    function onSearch(e){
        e.preventDefault();
        const form = document.forms.searchBarCitie;
        const search =   form.search.value;
        console.log(search);
        if (search !== '') {
            let results = JSON_city.filter((city) => {
                return city.toLowerCase().startsWith(search.toLowerCase());
            });
            results.splice(5, results.length);
            setSearchResult(results);
        }
        else{
            setSearchResult([])
        }
    }
    useEffect(() => {

        WeatherService.getPrefUser().then(
            (response) => {
                setCities(response.data)
                setIsLoading(false);

            },
            (error) => {
                setCities(null);
                setIsLoading(false);
            }
        );

    }, []);

    return(
        <>
            <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs" style={{minWidth: "300px"}}>
                {isLoading ? (

                    <span className="flex justify-center">

                         <FaSpinner className="animate-spin text-7xl text-gray-300"/>
                    </span>

                ):(
                    <>
                        {!cities ? (
                            <>
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
                                {searchResult ? (
                                    <>
                                        {searchResult.length> 0 ? (
                                            searchResult.map(item=>{
                                                return(
                                                    <div
                                                        onClick={()=>{
                                                            findCity(item)
                                                        }}
                                                        className="group flex flex-row justify-between items-center hover:bg-gray-200 p-1 rounded-md ">
                                                        {item}

                                                        <div className="text-white group-hover:text-gray-800">

                                                            <FaMapPin/>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <p>No cities founded</p>
                                        )}
                                    </>

                                ) : null}
                            </>
                        ) : (
                            <>
                                <div className="relative">
                                    <button
                                        onClick={()=>{
                                            WeatherService.deletePref();
                                            setCities(null)
                                        }}
                                        className="p-2 rounded-full bg-white shadow absolute top-0 -right-2 border border-gray-300">
                                        <VscGear/>
                                    </button>
                                </div>

                                <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs" style={{minWidth:"300px"}}>
                                    <div className="font-bold text-xl">{cities.cityName}</div>
                                    <div className="text-sm text-gray-500">Thursday 10 May 2020</div>
                                    <div
                                        className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-32 w-32">
                                        <img className="w-32 h-32" src={"http://openweathermap.org/img/wn/"+cities.idIcon+"@4x.png" } alt={"loading"}/>
                                    </div>
                                    <div className="flex flex-row items-center justify-center mt-6">
                                        <div className="font-medium text-6xl">{cities.temp |0}°</div>
                                        <div className="flex flex-col items-center ml-6">
                                            <div>Cloudy</div>
                                            <div className="mt-1 flex">
                                                <span className="text-sm"><FaLongArrowAltUp/></span>
                                                <span className="text-sm font-light text-gray-500">{cities.tempMax | 0}°C</span>
                                            </div>
                                            <div className="flex">
                                                <span className="text-sm"><FaLongArrowAltDown/></span>
                                                <span className="text-sm font-light text-gray-500">{cities.tempMin | 0}°C</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between mt-6">
                                        <div className="flex flex-col items-center">
                                            <div className="font-medium text-sm">Wind</div>
                                            <div className="text-sm text-gray-500">{cities.windSpeed}k/h</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="font-medium text-sm">Humidity</div>
                                            <div className="text-sm text-gray-500">{cities.humidity}%</div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="font-medium text-sm">Pressure</div>
                                            <div className="text-sm text-gray-500">{cities.pressure}hPa</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                        }
                    </>

                )}


            </div>
        </>
    )
}export default Render;