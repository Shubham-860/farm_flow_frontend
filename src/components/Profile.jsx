import React, {useEffect, useState} from 'react';
import axiosConfig from "@/api/axiosConfig.js";

const Profile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        axiosConfig.get("/user/me").then(res => {
            setUser(res.data);
            setLoading(false)
        }).catch(() => {
            setUser(null);
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchUser().then(r => console.log(r));
    }, []);
    if (loading) return <div>Loading...</div>
    return (
        <div>
            Profile
            {user && <div>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>}
        </div>
    );
};

export default Profile;