import './App.css'
import {Route, Routes} from "react-router";
import ProtectedRoutes from "@/components/common/ProtectedRoutes.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Farms from "@/pages/Farms.jsx";
import SeasonDetails from "@/pages/SeasonDetails.jsx";
import {Navbar1} from "@/components/navbar1.jsx";
import {AuthProvider} from "@/components/Hooks/AuthProvider.jsx";
import Dashboard from "@/pages/Dashboard.jsx";

function App() {

    return (
        <AuthProvider>
            <Navbar1/>

            <Routes>
                {/*<Route path="/" element={"<h1>Home Page</h1>"}/>*/}
                <Route path="/" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
                <Route path="/farms" element={<ProtectedRoutes><Farms/></ProtectedRoutes>}/>
                <Route path="/seasonDetails" element={<ProtectedRoutes><SeasonDetails/></ProtectedRoutes>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>

        </AuthProvider>
    )
}

export default App
