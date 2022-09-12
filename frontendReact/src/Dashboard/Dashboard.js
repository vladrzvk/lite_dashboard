import {Route, Routes} from "react-router-dom";
import Desktop from "./Pages/Desktop";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Page404 from "./Pages/Page404";


function Dashboard() {
    return(
        <>

                <Routes>
                    <Route path={"/login"} element={<Login/>}/>

                    <Route path={"/register"} element={<Register/>}/>


                    <Route path={"/"} element={<Desktop/>}/>

                   <Route path={"/*"} element={<Page404/>}/>
                </Routes>

        </>

    )
}export default Dashboard;