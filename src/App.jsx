import {Route, Routes} from "react-router";
import ProtectedRoutes from "@/components/common/ProtectedRoutes.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Farms from "@/pages/Farms.jsx";
import SeasonTransaction from "@/pages/SeasonTransaction.jsx";
import {Navbar} from "@/components/navbar.jsx";
import {AuthProvider} from "@/components/Hooks/AuthProvider.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import Footer from "@/components/common/Footer.jsx";
import {Toaster} from "sonner";
import {useTheme} from "next-themes";
import About from "@/pages/About.jsx";
import Reports from "@/pages/Reports.jsx";
import AdminRoutes from "@/components/common/AdminRoutes.jsx";
import AdminDashboard from "@/pages/admin/AdminDashboard.jsx";
import AddAdmin from "@/pages/admin/AddAdmin.jsx";
import Users from "@/pages/admin/Users.jsx";
import AdminCrops from "@/pages/admin/AdminCrops.jsx";
import ReactGA from "react-ga4";
import {useEffect} from "react";

function App() {
    const {theme = "system"} = useTheme()

    useEffect(() => {
        ReactGA.initialize("G-YBT8YHHPRZ");
        ReactGA.send({hitType: "pageview", page: window.location.pathname, title: "App.jsx"});

    })
    return (
        <AuthProvider>
            <div className={"w-full flex flex-col justify-between min-h-screen bg-background"}>

                <Navbar className={"bg-background"}/>

                <main className="flex-1 flex">
                    <div className={"max-w-7xl mx-auto px-6 py-3 w-full"}>
                        <Routes>
                            <Route path="/" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
                            <Route path="/farms" element={<ProtectedRoutes><Farms/></ProtectedRoutes>}/>
                            <Route path="/reports" element={<ProtectedRoutes><Reports/></ProtectedRoutes>}/>
                            <Route path="/SeasonTransaction/:id"
                                   element={<ProtectedRoutes><SeasonTransaction/></ProtectedRoutes>}/>


                            <Route path="/dashboard" element={<AdminRoutes><AdminDashboard/></AdminRoutes>}/>
                            <Route path="/addadmin" element={<AdminRoutes><AddAdmin/></AdminRoutes>}/>
                            <Route path="/users" element={<AdminRoutes><Users/></AdminRoutes>}/>
                            <Route path="/crops" element={<AdminRoutes><AdminCrops/></AdminRoutes>}/>


                            <Route path="/about" element={<About/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                        </Routes>
                    </div>
                </main>

                <Footer/>

            </div>

            <Toaster theme={theme}/>

        </AuthProvider>
    )
}

export default App
