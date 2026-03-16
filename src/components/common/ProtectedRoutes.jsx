import React from 'react';
import {Navigate} from "react-router";
import {useAuth} from "@/components/Hooks/useAuth.js";

const ProtectedRoutes = ({children}) => {
    const {user, loading} = useAuth();
    if (loading) return <div>Checking authentication...</div>
    return user ? children : <Navigate to={"/login"}/>;
};

export default ProtectedRoutes;