import './App.css'
import {ModeToggle} from "@/components/ui/mode-toggle.jsx";
import {Route, Routes} from "react-router";
import ProtectedRoutes from "@/components/common/ProtectedRoutes.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Farms from "@/pages/Farms.jsx";
import SeasonDetails from "@/pages/SeasonDetails.jsx";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={"<h1>Home Page</h1>"}/>
                {/*<Route path="/" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>*/}
                <Route path="/farms" element={<ProtectedRoutes><Farms/></ProtectedRoutes>}/>
                <Route path="/seasonDetails" element={<ProtectedRoutes><SeasonDetails/></ProtectedRoutes>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
            <ModeToggle/>
        </div>
    )
}

export default App
