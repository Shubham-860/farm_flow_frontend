import React, {useEffect, useState} from 'react';
import axiosConfig from "@/api/axiosConfig.js";
import CropSeason from "@/components/common/CropSeason.jsx";
import CropSeasonsModal from "@/components/FormModal/CropSeasonsModal.jsx";

const Dashboard = () => {
    const [farms, setFarms] = useState([]);
    const [openCropSeasonModal, setOpenCropSeasonModal] = useState(false)
    const [selectedCropSeason, setSelectedCropSeason] = useState(null)
    const [farmId, setFarmId] = useState(null)


    const fetchFarms = () => {
        axiosConfig.get("/farm/allinfo")
            .then(res => setFarms(res.data))
            .catch(e => console.log(e.response?.data || e.message));
    }
    const handleEditCropSeason = (seasonCrop) => {
        setFarmId(seasonCrop.farmId)
        setSelectedCropSeason(seasonCrop)
        setOpenCropSeasonModal(true)
    }

    useEffect(() => {
        fetchFarms()
    }, []);

    // get only active seasons across all farms
    let activeSeasons = farms.flatMap(farm =>
        (farm.cropSeasons || [])
            .filter(season => season.active)
            .map(season => ({...season, farmName: farm.name}))
    );

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-5">Dashboard</h1>

            <section className="mb-8">

                <h2 className="text-2xl font-semibold mb-4">Active crop seasons</h2>

                {activeSeasons.length === 0 ? (
                    <p className="text-neutral-500">No active crop seasons. Go to Farms to add one.</p>
                ) : (
                    <div className="flex overflow-x-auto pb-2 gap-4">
                        {activeSeasons.map(season => (

                            <CropSeason
                                key={season.id}
                                season={season}
                                handleEditCropSeason={handleEditCropSeason}
                                fetchFarms={fetchFarms}
                            />
                            //     <div
                            //         key={season.id}
                            //         onClick={() => navigate(`/SeasonTransaction/${season.id}`)}
                            //         className="w-64  rounded-xl p-5 border relative bg-white dark:bg-muted border-green-600 dark:border-green-500 cursor-pointer hover:shadow-md transition-shadow"
                            //     >
                            //         {/* Active badge */}
                            //         <span
                            //             className="absolute top-3 right-3 flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium px-2.5 py-1 rounded-full">
                            //     <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-300 inline-block"/>
                            //     Active
                            // </span>
                            //
                            //         <p className="font-semibold text-base pr-16 text-neutral-900 dark:text-white">
                            //             {season.cropName}
                            //         </p>
                            //         <p className="text-xs text-neutral-400 dark:text-neutral-400 mb-1">
                            //             {season.farmName}
                            //         </p>
                            //         <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-3">
                            //             {season.unit}
                            //         </p>
                            //
                            //         <div
                            //             className="flex items-center gap-1 text-sm text-neutral-500 dark:text-white mb-3">
                            //             <span>{new Date(season.startDate).toLocaleDateString()}</span>
                            //             <span>→</span>
                            //             <span>{new Date(season.endDate).toLocaleDateString()}</span>
                            //         </div>
                            //
                            //         <hr className="border-neutral-100 dark:border-neutral-600 mb-3"/>
                            //
                            //         <p className="text-sm text-neutral-500 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                            //             {season.notes || "No notes"}
                            //         </p>
                            //     </div>
                        ))}
                    </div>
                )}
            </section>

            <CropSeasonsModal
                open={openCropSeasonModal}
                onOpenChange={setOpenCropSeasonModal}
                cropSeason={selectedCropSeason}
                onSuccess={fetchFarms}
                farmId={farmId}
            />
        </div>
    );
};

export default Dashboard;