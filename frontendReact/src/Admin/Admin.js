import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AdminNav from "./Componenets/AdminNav";
import AdminData from "./Componenets/HomeData";
import AdminHome from "./Componenets/AdminHome";
import AuthService from "./auth.admin.service";
import AdminService from "./admin.service";
import LoginForm from "./Componenets/LoginForm";

const Admin = () => {

    const [currentUser, setCurrentUser] = useState(null);


    let { table } = useParams();

    useEffect(() => {
        setCurrentUser(AuthService.getCurrentUser());
    }, []);


    if(currentUser){
        let isAdmin = false;
        currentUser.user.authorities.map(item=>{
            if(item.authority === "ROLE_ADMIN"){
                isAdmin = true;
            }
        });
        if(isAdmin) {
            return (
                <div className="min-h-screen flex flex-col">

                    <div className="flex justify-between flex-grow overflow-hidden" style={{maxWidth: "100vw"}}>
                        <AdminNav data={AdminService.CONFIG}/>
                        <div className="flex-grow bg-gray-200 overflow-auto py-10">
                            {table && AdminService.CONFIG[table] ?
                                <AdminData key={table} data={AdminService.CONFIG[table]}/> :
                                <AdminHome data={AdminService.CONFIG}/>}

                        </div>
                    </div>
                </div>
            )

        }
    }
    return(<LoginForm setCurrentUser={setCurrentUser}/>)


}

export default Admin;