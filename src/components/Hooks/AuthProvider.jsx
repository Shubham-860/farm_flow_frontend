import {useEffect, useState} from "react";
import axiosConfig from "@/api/axiosConfig";
import AuthContext from "./AuthContext";
import {useLocation} from "react-router";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    console.log(location.pathname)
    useEffect(() => {
        if (location.pathname !== "/login" && location.pathname !== "/register") {
            axiosConfig.get("/user/me")
                .then(res => setUser(res.data))
                // .catch(() => setUser({abc:2}))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        }
    }, [location.pathname, setUser]);
    console.log(user)
    return (
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};