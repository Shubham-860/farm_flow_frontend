import React, {useEffect, useState} from 'react';
import axiosConfig from "@/api/axiosConfig.js";
import CropSeason from "@/components/common/CropSeason.jsx";
import CropSeasonsModal from "@/components/FormModal/CropSeasonsModal.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import SeasonTransactionPage from "@/components/SeasonTransactionTable/SeasonTransactionPage.jsx";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"

const Dashboard = () => {
    const [farms, setFarms] = useState([]);
    const [openCropSeasonModal, setOpenCropSeasonModal] = useState(false)
    const [selectedCropSeason, setSelectedCropSeason] = useState(null)
    const [farmId, setFarmId] = useState(null)
    const [data, setData] = useState(null);

    const fetchFarms = () => {
        axiosConfig.get("/farm/allinfo")
            .then(res => setFarms(res.data))
            .catch(e => console.log(e.response?.data || e.message));
        setOpenCropSeasonModal(false)
        setFarmId(null)

        axiosConfig.get("/report/dashboard").then(res => {
            console.log(res.data)
            setData(res.data)
        }).catch(e => console.log(e.response?.data || e.message));
    }
    const handleEditCropSeason = (seasonCrop) => {
        setFarmId(seasonCrop.farmId)
        setSelectedCropSeason(seasonCrop)
        setOpenCropSeasonModal(true)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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

            <section className={"grid grid-cols-4 gap-4"}>

                {/*pending*/}
                {/*profit*/}
                {/*totalExpense*/}
                {/*totalIncome*/}


                <Card size="sm" className="mx-auto w-full max-w-xs border border-green-500 text-center">
                    <CardHeader>
                        <CardTitle className={"text-green-500"}>Total Income </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={""}>
                            {data?.totalIncome}
                        </p>
                    </CardContent>
                </Card>

                <Card size="sm" className="mx-auto w-full max-w-xs border border-red-500 text-center">
                    <CardHeader>
                        <CardTitle className={"text-red-500"}>Total Expense </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            {data?.totalExpense}
                        </p>
                    </CardContent>

                </Card>

                <Card size="sm"
                      className={`mx-auto w-full max-w-xs border text-center ${data?.profit > 0 ? "border-blue-500 " : "border-orange-500"}`}>
                    <CardHeader>
                        <CardTitle
                            className={data?.profit > 0 ? "text-blue-500 " : "text-orange-500"}>Profit </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            {data?.profit}
                        </p>
                    </CardContent>

                </Card>

                <Card size="sm" className="mx-auto w-full max-w-xs border border-yellow-500 text-center">
                    <CardHeader>
                        <CardTitle className={"text-yellow-500"}>Pending </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            {data?.pending}
                        </p>
                    </CardContent>

                </Card>


            </section>
            <Separator className="my-6"/>
            <section>


                <h2 className="text-2xl font-semibold mb-4">Active crop seasons</h2>

                {activeSeasons.length === 0 ? (
                    <p className="text-neutral-500">No active crop seasons. Go to Farms to add one.</p>
                ) : (
                    <div className="flex overflow-x-auto justify-center pb-2 gap-4">
                        {activeSeasons.map(season => (

                            <CropSeason
                                key={season.id}
                                season={season}
                                handleEditCropSeason={handleEditCropSeason}
                                fetchFarms={fetchFarms}
                            />
                        ))}
                    </div>
                )}


            </section>

            <Separator className="my-8"/>

            <section>
                <SeasonTransactionPage
                    modifiable={true}
                    data={data?.latestTransactions}
                    refresh={fetchFarms}
                    title={"Latest transactions"}
                />

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