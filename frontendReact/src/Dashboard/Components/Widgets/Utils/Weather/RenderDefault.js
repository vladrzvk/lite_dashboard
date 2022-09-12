import {FaLongArrowAltDown, FaLongArrowAltUp} from "react-icons/all";
import {useEffect, useState} from "react";
import WeatherService from "../../../../Services/requests/weather.resquest.service";
import ToastService from "../../../../Services/toast.service";

function Render() {

    const [data, setData] = useState(null);

    useEffect(() => {
        WeatherService.getDefaultWeather().then(
            (response) => {
                setData(response.data);
            },
            (error) => {
                ToastService.error(error.toString());
            }
        );


    }, []);


    return(
        <>

            {data ? (
                <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs" style={{minWidth:"300px"}}>
                    <div className="font-bold text-xl">{data.cityName}</div>
                    <div className="text-sm text-gray-500">Thursday 10 May 2020</div>
                    <div
                        className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-32 w-32">
                        <img className="w-32 h-32" src={"http://openweathermap.org/img/wn/"+data.idIcon+"@4x.png" } alt={"loading"}/>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-6">
                        <div className="font-medium text-6xl">{data.temp |0}°</div>
                        <div className="flex flex-col items-center ml-6">
                            <div>Cloudy</div>
                            <div className="mt-1 flex">
                                <span className="text-sm"><FaLongArrowAltUp/></span>
                                <span className="text-sm font-light text-gray-500">{data.tempMax | 0}°C</span>
                            </div>
                            <div className="flex">
                                <span className="text-sm"><FaLongArrowAltDown/></span>
                                <span className="text-sm font-light text-gray-500">{data.tempMin | 0}°C</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mt-6">
                        <div className="flex flex-col items-center">
                            <div className="font-medium text-sm">Wind</div>
                            <div className="text-sm text-gray-500">{data.windSpeed}k/h</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-medium text-sm">Humidity</div>
                            <div className="text-sm text-gray-500">{data.humidity}%</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="font-medium text-sm">Pressure</div>
                            <div className="text-sm text-gray-500">{data.pressure}hPa</div>
                        </div>
                    </div>
                </div>
            ) : null}

        </>
    )
}export default Render;