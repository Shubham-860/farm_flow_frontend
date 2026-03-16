import { useEffect, useState } from "react";
import axiosConfig from "@/api/axiosConfig";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosConfig.get("/user/me")
            .then(res => setUser(res.data))
            // .catch(() => setUser({abc:2}))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};