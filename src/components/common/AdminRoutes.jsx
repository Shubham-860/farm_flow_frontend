import React from 'react';
import {Navigate} from "react-router";
import {useAuth} from "@/components/Hooks/useAuth.js";

const AdminRoutes = ({children}) => {
    const {user, loading} = useAuth();
    if (loading) return <div>Checking authentication...</div>;
    if (!user) return <Navigate to={"/login"}/>;
    if (user.role !== "ADMIN") return <Navigate to={"/"}/>;
    return children;
};
export default AdminRoutes;