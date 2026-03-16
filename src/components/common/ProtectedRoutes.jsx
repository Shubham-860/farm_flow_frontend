import React, {useEffect, useState} from 'react';
import axiosConfig from "@/api/axiosConfig.js";
import {Navigate} from "react-router";

const ProtectedRoutes = ({children}) => {
    const [auth, setAuth] = useState(null)
    useEffect(() => {
        axiosConfig.get("/user/me")
            .then(res => {
                setAuth(!!res.data)
            })
            .catch(() => setAuth(false))
    }, []);

    if (auth === null) return <div>Checking authentication...</div>
    return auth ? children : <Navigate to={"/login"}/>;
};

export default ProtectedRoutes;