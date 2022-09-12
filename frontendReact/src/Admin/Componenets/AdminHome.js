import AdminCardStatus from "./AdminCardStatus";

const AdminHome = (props) => {

    return(
        <>
            <div className="px-5">
                <div className="flex justify-between py-3">

                    <h2 className="text-3xl ml-5 mb-5">Dashboard admin</h2>

                </div>
                <div className="flex flex-wrap w-full">
                    {Object.values(props.data).map(item =>{
                        return(
                            <AdminCardStatus data={item}/>
                        )
                    })}
                </div>
            </div>

        </>
    );
}
export default AdminHome;