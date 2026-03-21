import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axiosConfig from "@/api/axiosConfig.js";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import IncomeForm from "@/components/common/IncomeForm.jsx";
import ExpenseForm from "@/components/common/ExpenseForm.jsx";
import {CalendarDays, CheckCircle2, Circle, FileText, Sprout} from "lucide-react";
import {Badge} from "@/components/ui/badge.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import SeasonTransactionPage from "@/components/SeasonTransactionTable/SeasonTransactionPage.jsx";

const SeasonTransaction = () => {
    const {id} = useParams();
    const [cropSeason, setCropSeason] = useState({});

    const fetchCropSeason = () => {
        axiosConfig.get(`/cropseason/${id}`)
            .then(res => setCropSeason(res.data))
            .catch(e => console.log(e.response?.data || e.message));
    };
    console.log(cropSeason)
    useEffect(() => {
        fetchCropSeason();
    }, []);

    const formatDate = (dateStr) => {
        // if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
        });
    };

    return (
        <div className="py-6 max-w-7xl mx-auto">

            {/* Crop Season Card */}
            {cropSeason && (
                <div className="bg-card border border-border rounded-2xl p-5 mb-6">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">

                            <div className="bg-muted p-2.5 rounded-xl">
                                <Sprout className="text-primary w-5 h-5"/>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold leading-tight">{cropSeason.cropName || "—"}</h1>
                                <p className="text-sm text-muted-foreground">{cropSeason.unit}</p>
                            </div>

                        </div>

                        {cropSeason.active ? (
                            <Badge variant="outline"
                                   className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border-green-600 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>
                                Active
                            </Badge>
                        ) : cropSeason.complete ? (
                            <Badge variant="secondary"
                                   className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs">
                                <CheckCircle2 className="w-3 h-3"/>
                                Completed
                            </Badge>
                        ) : (
                            <Badge variant="outline"
                                   className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-muted-foreground">
                                <Circle className="w-3 h-3"/>
                                Inactive
                            </Badge>
                        )}
                    </div>

                    <div className="border-t border-border mb-4"/>


                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <CalendarDays className="w-4 h-4 shrink-0"/>
                        <span>{formatDate(cropSeason.startDate)}</span>
                        <span className="opacity-40">→</span>
                        <span>{formatDate(cropSeason.endDate)}</span>
                    </div>

                    {/* Notes */}
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4 shrink-0 mt-0.5"/>
                        <span className="italic">
                            {cropSeason.notes?.trim() ? cropSeason.notes : "No notes added"}
                        </span>
                    </div>
                </div>
            )}

            {/* Forms Section */}
            <Separator/>
            <section>


                <div>
                    <h2 className="text-2xl font-semibold my-4 text-center">
                        Add transaction
                    </h2>
                </div>

                <Tabs>
                    <TabsList
                        className="grid grid-cols-2 border-b border-border rounded-none bg-transparent p-0 pb-4 h-auto">

                        <TabsTrigger
                            value="expenses"
                            className="rounded-none text-base font-medium pb-3 border-b-2 border-transparent
                            text-muted-foreground
                            data-[state=active]:text-foreground data-[state=active]:border-primary
                            data-[state=active]:font-semibold data-[state=active]:shadow-none
                            data-[state=active]:bg-transparent bg-transparent transition-all duration-200"
                        >
                            Expenses
                        </TabsTrigger>
                        <TabsTrigger
                            value="income"
                            className="rounded-none text-base font-medium pb-3 border-b-2 border-transparent
                            text-muted-foreground
                            data-[state=active]:text-foreground data-[state=active]:border-primary
                            data-[state=active]:font-semibold data-[state=active]:shadow-none
                            data-[state=active]:bg-transparent bg-transparent transition-all duration-200"
                        >
                            Income
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="expenses" className="pt-5 mt-0">
                        <ExpenseForm cropSeason={cropSeason} refresh={fetchCropSeason}/>
                    </TabsContent>
                    <TabsContent value="income" className="pt-5 mt-0">
                        <IncomeForm cropSeason={cropSeason} refresh={fetchCropSeason}/>
                    </TabsContent>
                </Tabs>

            </section>
            <Separator/>
            <section className={""}>

                <SeasonTransactionPage
                    data={cropSeason.seasonTransactions}
                    cropSeason={cropSeason}
                    modifiable={true}
                    refresh={fetchCropSeason}/>
            </section>


        </div>
    );
};

export default SeasonTransaction;