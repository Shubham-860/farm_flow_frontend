import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router";
import {useAuth} from "@/components/Hooks/useAuth.js";

const Logout = () => {
    const navigate = useNavigate();
    const {setUser} = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <Button variant="outline" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default Logout;