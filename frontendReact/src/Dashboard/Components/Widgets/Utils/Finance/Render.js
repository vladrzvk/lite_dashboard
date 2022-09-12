import {useEffect, useState} from "react";
import {FaArrowLeft, FaSpinner} from "react-icons/all";
import FinanceService from "../../../../Services/requests/finances.resquest.service";
import ToastService from "../../../../Services/toast.service";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: false,
        },

    },
};


function Render() {
    const [currentiesList, setCurrentiesList] = useState({});
    const [dataChart, setDataChart] = useState(null);
    const [focusCurrency, setFocusCurrency] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    function getData(list){
        let res = [];
        list.map(item=>{
            res.push(item.close);
        })
        return res;

    }
    function getLabels(list){
        let res = [];
        list.map(item=>{
            res.push( item.date.slice(0, 10));
        })
        return res;
    }
    function closeDetails(){
        setFocusCurrency(null);
        setDataChart(null);

    }
    function changeChartZoom(code){
        if(code === "1M"){
            setDataChart({
                selected : "1M",
                labels: getLabels(focusCurrency.lastMonthHistory),
                datasets : [{
                    label :focusCurrency.name,
                    data: getData(focusCurrency.lastMonthHistory),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',

                }]
            })
        }else{
            setDataChart({
                selected : "1Y",
                labels: getLabels(focusCurrency.lastYearHistory),
                datasets : [{
                    label :focusCurrency.name,
                    data: getData(focusCurrency.lastYearHistory),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',

                }]
            })
        }
    }
    function showDetails(code){
        setIsLoading(true);
        FinanceService.getDetails(code).then(
            (response) => {

                setFocusCurrency(response.data)
                setDataChart({
                    selected : "1M",
                    labels: getLabels(response.data.lastMonthHistory),
                    datasets : [{
                        label :response.data.name,
                        data: getData(response.data.lastMonthHistory),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',

                    }]
                })
                setIsLoading(false);
            },
            (error) => {
                ToastService.error(error.toString());
                setIsLoading(false);
            }
        );




    }
    useEffect(() => {

        FinanceService.getAllCurrenties().then(
            (response) => {
                setCurrentiesList(response.data)
                setIsLoading(false);

            },
            (error) => {
                ToastService.error(error.toString());
            }
        );

    }, []);

    return(
        <div className="p-2 overflow-scroll" style={{minWidth: "400px", height:"420px"}}>
            {isLoading ? (

                <span className="flex flex-col items-center justify-center">
                    <p>This api is very slow please wait</p>

                         <FaSpinner className="animate-spin text-7xl text-gray-300"/>
                    </span>

            ):(
                <>
                    {focusCurrency ? (
                        <div style={{width: "700px"}}>
                            <div className="flex flex-row gap-3">
                                <button
                                    className="flex flex-row items-center p-2 rounded border border-gray-200"
                                    onClick={closeDetails}>
                                    <FaArrowLeft/>
                                </button>

                                <div className="flex  flex-grow  justify-center items-center flex-row gap-3">
                                    <div className="bg-purple-200 p-2 w-fit rounded-md">{focusCurrency.symbol}</div>
                                    <span>{focusCurrency.currentPrice}</span>
                                    <span className={focusCurrency.changePrice > 0 ? "text-green-500" : "text-red-400"}>({focusCurrency.changePrice})</span>
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        onClick={()=>{
                                            changeChartZoom("1M")
                                        }}
                                        className={dataChart.selected === "1M" ? "bg-gray-100 border border-gray-300 p-1 text-sm" : "border border-gray-300 p-1 text-sm"}>
                                        1M
                                    </button>
                                    <button
                                        onClick={()=>{
                                            changeChartZoom("1Y")
                                        }}
                                        className={dataChart.selected === "1Y" ? "bg-gray-100 border border-gray-300 p-1 border-t-0 text-sm" : "border border-gray-300 p-1 border-t-0 text-sm"}>
                                        1Y
                                    </button>
                                </div>


                            </div>


                            <Line
                                options={options}
                                data={dataChart}

                             type={"line"}/>
                        </div>
                    ):(
                        <>
                            <ul className="bg-white rounded-lg text-gray-900">
                            { Object.entries(currentiesList).map(([key,item])=>{
                                return(
                                    <li
                                        onClick={()=>{
                                            showDetails(key);
                                        }}
                                        className="hover:bg-gray-200 px-1 py-2 border-b border-gray-200 w-full rounded-t-lg flex justify-between">

                                        <div className="flex flex-col">
                                            <span className="bg-purple-200 p-2 w-min rounded-md">{item.symbol}</span>
                                            <span>{item.name}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span>{item.currentPrice}</span>
                                            <span className={item.changePrice > 0 ? "text-green-500" : "text-red-400"}>{item.changePrice}</span>
                                        </div>
                                    </li>
                                )
                            })}
                            </ul>
                        </>
                    )}
                </>

            )}


        </div>
    )
}export default Render;