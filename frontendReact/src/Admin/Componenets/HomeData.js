import {useEffect, useState} from "react";
import AdminService from "../admin.service";
import ToastService from "../../Dashboard/Services/toast.service";

const AdminData = (props) => {

    const [dataList, setListData] = useState([]);
    const [currentItemId, setCurrentItemId] = useState(null);

    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState(null);

    //modals
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalForm, setShowModalForm] = useState(false);


    function fetchData() {
        AdminService.getAll(props.data.route.get_all).then(
            (response) => {
                setListData(response.data);
            },
            (error) => {
                console.log(JSON.stringify(error));
            }
        );
    }

    function submitDelete(e) {
        e.preventDefault();
        if (currentItemId) {
            AdminService.deleteItem(props.data.route.delete, currentItemId).then(
                (response) => {
                    ToastService.success("Item successfully deleted");
                    fetchData()
                },
                (error) => {
                    ToastService.error(error.toString());
                }
            );

        } else {
            ToastService.error("Error:  Id item not found");
        }
        setCurrentItemId(null)
        setShowModalDelete(false)
    }

    function submit(e){
        e.preventDefault();
        const form = e.target;

        //recuper toute les data du form
        let data = {};
        props.data.columns.map(item=>{
            if(item.editable){
                data[item.name] = form[item.name].value;
            }
        });


        console.log()
        if(isEdit){
            AdminService.updateItem(props.data.route.update, currentItemId, data).then(
                (response) => {
                    ToastService.success("Item successfully updated");
                    fetchData()
                },
                (error) => {
                    ToastService.error(error.toString());
                }
            );
        }else{
            if(props.data.route.add === "/signup"){
                data["password_confirm"] = data.password
            }

            AdminService.addItem(props.data.route.add, data).then(
                (response) => {
                    ToastService.success("Item successfully added");
                    fetchData()
                },
                (error) => {
                    ToastService.error(error.response.data.error);
                }
            );
        }

        closeFormModal();
    }

    function closeFormModal (){
        setEditData(null);
        setIsEdit(false);
        setCurrentItemId(null)
        setShowModalForm(false);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className="flex flex-col text-left">
                <div className=" overflow-x-auto ">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <button
                            className="bg-gray-100 hover:bg-gray-200 p-1 rounded my-2"
                            onClick={()=>{
                                setShowModalForm(true);
                            }}
                        >
                            Add a row
                        </button>
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>

                                    {props.data.columns.map(item => {
                                        return (
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {item.name}
                                            </th>
                                        );
                                    })}


                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">

                                {dataList && dataList.map(line => {

                                    return (
                                        <>
                                            <tr className="">
                                                {props.data.columns.map(key => {

                                                        return (

                                                            <td className="px-6 py-4">
                                                                <div className="overflow-ellipsis overflow-hidden h-10">
                                                                    {line[key.name] ? line[key.name] : "/error/"}
                                                                </div>
                                                            </td>
                                                        )
                                                    }
                                                )}
                                                <td className="px-6 py-4 text-right text-sm font-medium">
                                                    <button
                                                        className="text-red-500 hover:text-red-700 mr-5"
                                                        onClick={() => {
                                                            setCurrentItemId(line.id);
                                                            setShowModalDelete(true)
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                       className="text-indigo-600 hover:text-indigo-900"
                                                       onClick={()=>{
                                                           setEditData(line);
                                                           setCurrentItemId(line.id);
                                                           setIsEdit(true);
                                                           setShowModalForm(true);
                                                       }}
                                                    >Edit</button>
                                                </td>
                                            </tr>
                                        </>

                                    )
                                })}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {(showModalForm) ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto lg:w-2/3 w-full">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {isEdit ? "Update an item" : "Add a row"}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => closeFormModal()}
                                    >
                                            <span
                                                className="text-gray-800 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                              ×
                                            </span>
                                    </button>
                                </div>

                                <form onSubmit={submit}>


                                    <div className="gr px-4">
                                        {props.data.columns.map(item =>{
                                            if(item.editable){
                                                if(item.type == "textarea"){
                                                    return (
                                                        <div className="my-2 gr">
                                                            <label htmlFor={item.name} className="block text-sm font-medium text-gray-700">
                                                                {item.name}
                                                            </label>
                                                            <div className="mt-1">
                                                          <textarea
                                                              id={item.name}
                                                              name={item.name}
                                                              /*defaultValue={savedForm && savedForm.description}*/
                                                              rows={4}
                                                              defaultValue={isEdit ? editData[item.name] : null}
                                                              className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"

                                                          />
                                                            </div>
                                                        </div>
                                                    )
                                                }else{
                                                    return(
                                                        <div className="my-2">
                                                            <label htmlFor={item.name} className="block text-sm font-medium text-gray-700">
                                                                {item.name}
                                                            </label>
                                                            <input
                                                                type={item.type}
                                                                name={item.name}
                                                                defaultValue={isEdit ? editData[item.name] : null}
                                                                /*defaultValue={savedForm && savedForm.title}*/
                                                                id={item.name}
                                                                className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
                                                            />
                                                        </div>
                                                    )
                                                }
                                            }

                                        })}
                                    </div>


                                    <div
                                        className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                                        <button
                                            className="text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => closeFormModal()}
                                        >
                                            close
                                        </button>
                                        <button
                                            className="bg-indigo-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            {isEdit ? "Update" : "Add"}
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            {(showModalDelete) ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Remove this Item ?
                                    </h3>
                                    <button
                                        className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModalDelete(false)}
                                    >
                                            <span
                                                className="text-gray-800 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                              ×
                                            </span>
                                    </button>
                                </div>

                                <form onSubmit={submitDelete}>

                                    <div
                                        className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                                        <button
                                            className="text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            onClick={() => setShowModalDelete(false)}
                                        >
                                            No
                                        </button>
                                        <button
                                            className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>

    );
}
export default AdminData;