import React from 'react';
import {Badge} from "@/components/ui/badge.jsx";
import {CheckCircle2, EllipsisVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import DeleteConfirm from "@/components/common/DeleteConfirm.jsx";
import {useNavigate} from "react-router";
import axiosConfig from "@/api/axiosConfig.js";
import {toast} from "sonner";

const CropSeason = ({season,fetchFarms,handleEditCropSeason}) => {
    const navigate = useNavigate()

    const formatDate = (dateStr) => {
        // if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
        });
    };

    const handleDeleteCropSeason = (id) => {
        axiosConfig.delete(`/cropseason/${id}`)
            .then(res => {
                console.log(res.data)
                fetchFarms()
                toast.success("Crop season deleted successfully")
            })
            .catch(e => {
                console.log(e)
                toast.error("Failed to delete crop season")
            });
    }
    const handleCompleteCropSeason = (data) => {
        axiosConfig.post(`/cropseason/setcomplete`, data)
            .then(res => {
                console.log(res.data)
                fetchFarms()
                toast.success("Crop season completed successfully")
            })
            .catch(e => {
                console.log(e)
                toast.error("Failed to complete crop season")
            });
    }
    const handleSetActiveCropSeason = (data) => {
        axiosConfig.post("/cropseason/activate", data).then(res => {
            console.log(res.data);
            fetchFarms()
        }).catch(e => console.log(e.response?.data))

    }


    return (
        <div onClick={() => navigate(`/SeasonTransaction/${season.id}`)}
             key={season.id}
             className={`w-64 shrink-0 rounded-xl p-5 border relative bg-white dark:bg-muted ${season.active
                 ? "border-green-600 dark:border-green-500"
                 : "border-neutral-200 dark:border-neutral-700"
             }`}
        >
            {(season.active || season.complete) &&
                <div className={"absolute top-3 right-10"}>

                    {season.complete &&
                        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                        </Badge>
                    }
                    {season.active &&
                        <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border-green-600 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Active
                        </Badge>
                    }
                </div>
            }


            <span className={"absolute top-1 right-1 flex items-center gap-1 p-2.5 "}

                  onClick={(e) => e.stopPropagation()}>


                                            <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                               <EllipsisVertical size={20}/>
                                              </DropdownMenuTrigger>
                                              <DropdownMenuContent>
                                                <DropdownMenuGroup>

                                                   {!season.active &&
                                                       <DropdownMenuItem onClick={() => handleSetActiveCropSeason({
                                                           farmId: season.farmId,
                                                           cropSeasonId: season.id
                                                       })}>
                                                           <Button variant={"ghost"} size={"sm"}>
                                                               Set active
                                                           </Button>
                                                       </DropdownMenuItem>}

                                                    <DropdownMenuItem onClick={() => handleCompleteCropSeason({
                                                        id: season.id,
                                                        bool: !season.complete
                                                    })}>
                                                        <Button variant={"ghost"} size={"sm"}>
                                                        {season.complete ? "Mark incomplete" : "Mark complete"}
                                                        </Button>
                                                    </DropdownMenuItem>

                                                  <DropdownMenuItem onClick={() => handleEditCropSeason(season)}>
                                                      <Button variant={"ghost"} size={"sm"}>
                                                        Edit
                                                      </Button>
                                                  </DropdownMenuItem>
                                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <DeleteConfirm title={"Delete"}
                                                                       onDelete={() => handleDeleteCropSeason(season.id)}/>
                                                  </DropdownMenuItem>

                                                </DropdownMenuGroup>
                                              </DropdownMenuContent>
                                            </DropdownMenu>


                                            </span>

            <p className="font-semibold text-base pr-16 text-neutral-900 dark:text-white">
                {season.cropName}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-300 mb-3">
                {season.unit}
            </p>

            <div
                className="flex items-center gap-1 text-sm text-neutral-500 dark:text-white mb-3">
                <span>{formatDate(season.startDate)}</span>
                <span> {"->"} </span>
                <span>{formatDate(season.endDate)}</span>
            </div>

            <hr className="border-neutral-100 dark:border-neutral-600 mb-3"/>

            <p className="text-sm text-neutral-500 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                {season.notes}
            </p>
        </div>
    );
};

export default CropSeason;