import {useEffect, useState} from "react";
import AdminService from "../admin.service"
const AdminCardStatus = (props) => {

    const [count, setCount] = useState("?");

    async function fetchCount(){
         AdminService.getAll(props.data.route.get_all).then(
             (response) => {
                 setCount( response.data.length);
             },
             (error) => {
                 console.log(JSON.stringify(error));
             }
         );
    }


    useEffect(() => {
        fetchCount();
    }, []);

    return(
        <div className="flex-grow flex flex-warp justify-between m-5 relative rounded bg-white shadow h-20 sm:w-1/3">
            <div className="h-32 w-32">
                <div
                    className={["pl-10 pr-10 p-8 pb-8 ml-3 absolute top-0 -mt-4 -mr-4 rounded text-white fill-current shadow " +props.data.color_bg]}>

                    {props.data.icon}
                </div>
            </div>


            <div className="m-3 flex-grow ">
                <div className="text-right">{props.data.link_text}</div>
                <div className="text-right text-3xl">{count}</div>
            </div>
        </div>
    )
}
export default AdminCardStatus;