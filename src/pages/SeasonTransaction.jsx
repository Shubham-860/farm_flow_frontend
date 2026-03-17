import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axiosConfig from "@/api/axiosConfig.js";

const SeasonTransaction = () => {
    const {id} = useParams();
    const [cropSeason, setCropSeason] = useState({});

    const fetchCropSeason = () => {
        axiosConfig.get(`/cropseason/${id}`)
            .then(res => {
                setCropSeason(res.data);
            }).catch(e => {
                console.log(e.response?.data || e.message);
            }
        )
    }
    useEffect(() => {
fetchCropSeason();
    }, []);
    console.log(id)
    return (
        <div>
            CropSeason
        </div>
    );
};

export default SeasonTransaction;