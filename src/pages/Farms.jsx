import React, {useEffect, useState} from 'react';
import axiosConfig from "@/api/axiosConfig.js";
import {PenLine, Plus, Trees} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import FarmModal from "@/components/FormModal/FarmModal.jsx";
import {toast} from "sonner";
import DeleteConfirm from "@/components/common/DeleteConfirm.jsx";
import CropSeasonsModal from "@/components/FormModal/CropSeasonsModal.jsx";
import {useNavigate} from "react-router";
import CropSeason from "@/components/common/CropSeason.jsx";

const Farms = () => {
    const [farms, setFarms] = useState([])
    const [openFarmModal, setOpenFarmModal] = useState(false)
    const [openCropSeasonModal, setOpenCropSeasonModal] = useState(false)
    const [selectedFarm, setSelectedFarm] = useState(null)  // null = add, farm obj = edit
    const [selectedCropSeason, setSelectedCropSeason] = useState(null)
    const [farmId, setFarmId] = useState(null)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchFarms();
    }, []);

    const fetchFarms = () => {
        axiosConfig.get("/farm/all")
            .then(res => {
                setFarms(res.data)
            })
            .catch(e => console.log(e));
        setOpenFarmModal(false)
        setOpenCropSeasonModal(false)
        setFarmId(null)
    }
    // crop season functions
    const handleAddCropSeason = (id) => {
        setFarmId(id)
        setSelectedCropSeason(null)
        setOpenCropSeasonModal(true)
    }
    const handleEditCropSeason = (seasonCrop) => {
        setFarmId(seasonCrop.farmId)
        setSelectedCropSeason(seasonCrop)
        setOpenCropSeasonModal(true)
    }

// farm functions
    const handleEditFarm = (farm) => {
        setSelectedFarm(farm)
        setOpenFarmModal(true)
    }

    const handleAddFarm = () => {
        setSelectedFarm(null)  // clear so modal knows it's add mode
        setOpenFarmModal(true)
    }

    const handleDeleteFarm = (id) => {
        axiosConfig.delete(`/farm/${id}`)
            .then(res => {
                console.log(res.data)
                fetchFarms()
                toast.success("Farm deleted successfully")
            })
            .catch(e => {
                console.log(e)
                toast.error("Failed to delete farm")
            });

    }
    console.log(farms)
    return (
        <div className="">
            <div className={"flex justify-start items-center gap-4 mb-5"}>

                <h1 className="text-3xl font-semibold ">Farms</h1>
                <Button variant="outline" size="sm" onClick={handleAddFarm}>
                    <Plus/>
                </Button>

            </div>

            {farms.map(farm => (
                <div key={farm.id} className="mb-10">


                    {/* Farm header */}

                    <div
                        className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-500">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <Trees className="w-6 h-6 text-green-700 dark:text-green-400"/>
                            </div>
                            <div>
                                <p className="font-semibold text-lg">{farm.name}</p>
                                <p className="text-base text-neutral-500 dark:text-neutral-300">{farm.areaAcre} acres</p>
                            </div>
                        </div>
                        {/* Edit button per farm */}
                        <div>

                            <Button variant="outline" size="sm" className={"me-5"} onClick={() => handleEditFarm(farm)}>
                                <PenLine/>
                            </Button>
                            <DeleteConfirm onDelete={() => handleDeleteFarm(farm.id)}/>

                        </div>

                    </div>
                    {/* Crop seasons */}
                    <div className={"flex justify-start items-center gap-4 mb-2"}>

                        <p className="text-base font-semibold text-neutral-800 dark:text-neutral-100 ">
                            Crop seasons
                        </p>
                        <Button variant="outline" size="sm" className={"py-0 px-2 m-0 "}
                                onClick={() => handleAddCropSeason(farm.id)}>
                            <Plus/>
                        </Button>
                    </div>
                    <div className="overflow-x-auto pb-2">
                        <div className="flex gap-3 w-max">


                            {farm.cropSeasons?.length !== 0 ? farm.cropSeasons
                                    // .filter(s => s.farmId === farm.id)
                                    .map(season => (
                                        <CropSeason
                                            key={season.id}
                                            season={season}
                                            handleEditCropSeason={handleEditCropSeason}
                                            fetchFarms={fetchFarms}
                                        />
                                    ))
                                :
                                <p>No crop seasons available. Add one</p>
                            }
                        </div>
                    </div>

                </div>
            ))}

            {/*Farm modal open, onOpenChange, farm, onSuccess*/}
            <FarmModal
                open={openFarmModal}
                onOpenChange={setOpenFarmModal}
                farm={selectedFarm}
                onSuccess={fetchFarms}
            />

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

export default Farms;