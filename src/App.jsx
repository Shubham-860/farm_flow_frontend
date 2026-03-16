import './App.css'
import {Route, Routes} from "react-router";
import ProtectedRoutes from "@/components/common/ProtectedRoutes.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Farms from "@/pages/Farms.jsx";
import SeasonDetails from "@/pages/SeasonDetails.jsx";
import {Navbar} from "@/components/navbar.jsx";
import {AuthProvider} from "@/components/Hooks/AuthProvider.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import Footer from "@/components/common/Footer.jsx";
import {Toaster} from "sonner";
import {useTheme} from "next-themes";

<Toaster/>

function App() {
    const {theme = "system"} = useTheme()
    return (
        <AuthProvider>
            <div className={"flex flex-col justify-between min-h-screen bg-background"}>

                <Navbar className={"bg-background"}/>

                <main className="flex-1 flex">
                    <Routes>
                        <Route path="/" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
                        <Route path="/farms" element={<ProtectedRoutes><Farms/></ProtectedRoutes>}/>
                        <Route path="/seasonDetails" element={<ProtectedRoutes><SeasonDetails/></ProtectedRoutes>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </main>

                <Footer/>

            </div>

            <Toaster theme={theme}/>

        </AuthProvider>
    )
}

export default App
