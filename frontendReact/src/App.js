import logo from './logo.svg';
import {
    BrowserRouter,

    Route, Routes
} from "react-router-dom";
import './App.css';
import Admin from "./Admin/Admin";
import Dashboard from "./Dashboard/Dashboard";
import Shutdown from "./Shutdown";


function App() {
  return (

      <BrowserRouter>
        <Routes>
            <Route path={"/admin/:table"} element={<Admin/>} />
            <Route path={"/admin/"} element={<Admin/>} />
            <Route path={"/shutdown"} element={<Shutdown/>}/>

            <Route path={"/*"} element={<Dashboard/>} />

        </Routes>

      </BrowserRouter>


  );
}

export default App;
