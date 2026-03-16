import React, {useEffect, useState} from 'react';
import axiosConfig from "@/api/axiosConfig.js";
import {Trees} from "lucide-react";

const Farms = () => {
    const [farms, setFarms] = useState([])
    const [cropSeasons, setCropSeasons] = useState(
        [
            {
                "id": 1,
                "cropName": "Wheat",
                "unit": "Quintal",
                "startDate": "2026-01-10",
                "endDate": "2026-06-15",
                "isActive": false,
                "notes": "Rabi crop. Fertilizer applied in February. Expected yield 40 quintals.",
                "createdAt": "2026-01-10T10:00:00",
                "updatedAt": "2026-01-10T10:00:00",
                "farmId": 1,
                "farmName": "Farm 1",
                "seasonTransactions": []
            },
            {
                "id": 2,
                "cropName": "Rice",
                "unit": "Kg",
                "startDate": "2025-07-01",
                "endDate": "2025-11-30",
                "isActive": true,
                "notes": "Kharif season. Good rainfall this year. Sold to local market.",
                "createdAt": "2025-07-01T10:00:00",
                "updatedAt": "2025-11-30T10:00:00",
                "farmId": 1,
                "farmName": "Farm 1",
                "seasonTransactions": []
            },
            {
                "id": 3,
                "cropName": "Sugarcane",
                "unit": "Tonne",
                "startDate": "2025-03-01",
                "endDate": "2026-01-31",
                "isActive": false,
                "notes": "Long duration crop. Sold to sugar mill at 3200 per tonne.",
                "createdAt": "2025-03-01T10:00:00",
                "updatedAt": "2026-01-31T10:00:00",
                "farmId": 1,
                "farmName": "Farm 1",
                "seasonTransactions": []
            },
            {
                "id": 4,
                "cropName": "Onion",
                "unit": "Kg",
                "startDate": "2025-12-01",
                "endDate": "2026-04-30",
                "isActive": true,
                "notes": "Rabi onion. Drip irrigation installed. Target 200 bags.",
                "createdAt": "2025-12-01T10:00:00",
                "updatedAt": "2025-12-01T10:00:00",
                "farmId": 6,
                "farmName": "Farm 2",
                "seasonTransactions": []
            },
            {
                "id": 5,
                "cropName": "Soybean",
                "unit": "Quintal",
                "startDate": "2025-06-15",
                "endDate": "2025-10-20",
                "isActive": false,
                "notes": "Good market price this year. Sold at 4800 per quintal.",
                "createdAt": "2025-06-15T10:00:00",
                "updatedAt": "2025-10-20T10:00:00",
                "farmId": 6,
                "farmName": "Farm 2",
                "seasonTransactions": []
            },
            {
                "id": 6,
                "cropName": "Tomato",
                "unit": "Kg",
                "startDate": "2025-09-01",
                "endDate": "2025-12-31",
                "isActive": false,
                "notes": "Summer crop. Sold at local mandi. Price dropped mid season.",
                "createdAt": "2025-09-01T10:00:00",
                "updatedAt": "2025-12-31T10:00:00",
                "farmId": 6,
                "farmName": "Farm 2",
                "seasonTransactions": []
            },

            {
                "id": 1,
                "cropName": "Wheat",
                "unit": "Quintal",
                "startDate": "2026-01-10",
                "endDate": "2026-06-15",
                "isActive": false,
                "notes": "Rabi crop. Fertilizer applied in February. Expected yield 40 quintals.",
                "createdAt": "2026-01-10T10:00:00",
                "updatedAt": "2026-01-10T10:00:00",
                "farmId": 1,
                "farmName": "Farm 1",
                "seasonTransactions": []
            },
            {
                "id": 2,
                "cropName": "Rice",
                "unit": "Kg",
                "startDate": "2025-07-01",
                "endDate": "2025-11-30",
                "isActive": false,
                "notes": "Kharif season. Good rainfall this year. Sold to local market.",
                "createdAt": "2025-07-01T10:00:00",
                "updatedAt": "2025-11-30T10:00:00",
                "farmId": 1,
                "farmName": "Farm 1",
                "seasonTransactions": []
            },
            {
                "id": 3,
                "cropName": "Sugarcane",
                "unit": "Tonne",
                "startDate": "2025-03-01",
                "endDate": "2026-01-31",
                "isActive": false,
                "notes": "Long duration crop. Sold to sugar mill at 3200 per tonne.",
                "createdAt": "2025-03-01T10:00:00",
                "updatedAt": "2026-01-31T10:00:00",
                "farmId": 1,
                "farmName": "Farm 1",
                "seasonTransactions": []
            },
            {
                "id": 4,
                "cropName": "Onion",
                "unit": "Kg",
                "startDate": "2025-12-01",
                "endDate": "2026-04-30",
                "isActive": false,
                "notes": "Rabi onion. Drip irrigation installed. Target 200 bags.",
                "createdAt": "2025-12-01T10:00:00",
                "updatedAt": "2025-12-01T10:00:00",
                "farmId": 6,
                "farmName": "Farm 2",
                "seasonTransactions": []
            },
            {
                "id": 5,
                "cropName": "Soybean",
                "unit": "Quintal",
                "startDate": "2025-06-15",
                "endDate": "2025-10-20",
                "isActive": false,
                "notes": "Good market price this year. Sold at 4800 per quintal.",
                "createdAt": "2025-06-15T10:00:00",
                "updatedAt": "2025-10-20T10:00:00",
                "farmId": 6,
                "farmName": "Farm 2",
                "seasonTransactions": []
            },
            {
                "id": 6,
                "cropName": "Tomato",
                "unit": "Kg",
                "startDate": "2025-09-01",
                "endDate": "2025-12-31",
                "isActive": false,
                "notes": "Summer crop. Sold at local mandi. Price dropped mid season.",
                "createdAt": "2025-09-01T10:00:00",
                "updatedAt": "2025-12-31T10:00:00",
                "farmId": 6,
                "farmName": "Farm 2",
                "seasonTransactions": []
            }
        ]
    )
    useEffect(() => {
        axiosConfig.get("/farm/all")
            .then(res => {
                // console.log(res.data)
                setFarms(res.data)
            });
    }, []);

    console.log(farms)
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-semibold mb-8 text-neutral-900 dark:text-white">Farms</h1>

            {farms.map(farm => (
                <div key={farm.id} className="mb-10">


                    {/* Farm header */}
                    <div
                        className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-500">
                        <div
                            className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <Trees className="w-6 h-6 text-green-700 dark:text-green-400"/>
                        </div>
                        <div>
                            <p className="font-semibold text-lg text-neutral-900 dark:text-white">{farm.name}</p>
                            <p className="text-base text-neutral-500 dark:text-neutral-300">{farm.areaAcre} acres</p>
                        </div>
                    </div>


                    {/* Crop seasons */}
                    <p className="text-base font-semibold text-neutral-800 dark:text-neutral-100 mb-3">Crop seasons</p>
                    <div className="overflow-x-auto pb-2">
                        <div className="flex gap-3 w-max">


                            {cropSeasons
                                .filter(s => s.farmId === farm.id)
                                .map(season => (
                                    <div
                                        key={season.id}
                                        className={`w-64 shrink-0 rounded-xl p-5 border relative bg-white dark:bg-muted ${season.isActive
                                            ? "border-green-600 dark:border-green-500"
                                            : "border-neutral-200 dark:border-neutral-700"
                                        }`}
                                    >
                                        {season.isActive && (
                                            <span className="absolute top-3 right-3 flex items-center gap-1
                                        bg-green-100 dark:bg-green-900
                                        text-green-700 dark:text-green-300
                                        text-xs font-medium px-2.5 py-1 rounded-full">
                                        <span
                                            className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-300 inline-block"/>
                                        Active
                                    </span>
                                        )}

                                        <p className="font-semibold text-base pr-16 text-neutral-900 dark:text-white">
                                            {season.cropName}
                                        </p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-3">
                                            {season.unit}
                                        </p>

                                        <div
                                            className="flex items-center gap-1 text-sm text-neutral-500 dark:text-white mb-3">
                                            <span>{season.startDate}</span>
                                            <span>→</span>
                                            <span>{season.endDate}</span>
                                        </div>

                                        <hr className="border-neutral-100 dark:border-neutral-600 mb-3"/>

                                        <p className="text-sm text-neutral-500 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                                            {season.notes}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Farms;