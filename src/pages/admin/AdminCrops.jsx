import React, {useEffect, useState} from 'react';
import axiosConfig from "@/api/axiosConfig.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from "@/components/ui/command.jsx";
import {Check, ChevronsUpDown} from "lucide-react";

const AdminCrops = () => {

    const [cropNames, setCropNames] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [comboOpen, setComboOpen] = useState(false);
    const [analytics, setAnalytics] = useState(null);
    const [loadingNames, setLoadingNames] = useState(true);
    const [loadingAnalytics, setLoadingAnalytics] = useState(false);

    const fetchCropNames = () => {
        axiosConfig.get("/admin/cropnames")
            .then(res => setCropNames(res.data))
            .catch(e => console.log(e))
            .finally(() => setLoadingNames(false));
    };

    const fetchAnalytics = (crop) => {
        setLoadingAnalytics(true);
        axiosConfig.get(`/admin/cropanalytics?cropName=${crop}`)
            .then(res => setAnalytics(res.data))
            .catch(e => console.log(e))
            .finally(() => setLoadingAnalytics(false));
    };

    useEffect(() => {
        fetchCropNames();
    }, []);

    useEffect(() => {
        if (!selectedCrop) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAnalytics(selectedCrop);
    }, [selectedCrop]);

    const summary = analytics?.summary;
    const topFarms = analytics?.topFarms ?? [];

    const avgPrice = summary?.totalQuantity > 0
        ? (Number(summary.totalIncome) / Number(summary.totalQuantity)).toFixed(2)
        : 0;

    return (
        <div className="space-y-6">

            <h1 className="text-3xl font-semibold">Crop Analytics</h1>

            {/* Selector */}
            {loadingNames ? (
                <Skeleton className="h-10 w-64"/>
            ) : (
                <Popover open={comboOpen} onOpenChange={setComboOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-64 justify-between">
                            {selectedCrop || "Select crop"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50"/>
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-64 p-0">
                        <Command>
                            <CommandInput placeholder="Search crop..."/>
                            <CommandList>
                                <CommandEmpty>No crop found</CommandEmpty>

                                {cropNames.map(name => (
                                    <CommandItem
                                        key={name}
                                        value={name}
                                        onSelect={(val) => {
                                            setSelectedCrop(val);
                                            setComboOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={`mr-2 h-4 w-4 ${selectedCrop === name ? "opacity-100" : "opacity-0"}`}
                                        />
                                        {name}
                                    </CommandItem>
                                ))}

                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}

            {!selectedCrop && (
                <p className="text-muted-foreground text-sm">
                    Select a crop to view analytics
                </p>
            )}

            {loadingAnalytics && (
                <Skeleton className="h-40 w-full"/>
            )}

            {!loadingAnalytics && analytics && (
                <div className="space-y-6">

                    {/* Summary */}
                    <div className="flex flex-wrap gap-4">

                        <Card className="flex-1 min-w-44 text-center border border-green-500">
                            <CardHeader>
                                <CardTitle className="text-green-500">Total Income</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-green-500">
                                    ₹{Number(summary?.totalIncome ?? 0).toLocaleString("en-IN")}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="flex-1 min-w-44 text-center border border-blue-500">
                            <CardHeader>
                                <CardTitle className="text-blue-500">Production</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-blue-500">
                                    {Number(summary?.totalQuantity ?? 0).toLocaleString("en-IN")} kg
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="flex-1 min-w-44 text-center border border-purple-500">
                            <CardHeader>
                                <CardTitle className="text-purple-500">Farms</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-purple-500">
                                    {summary?.farmCount ?? 0}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="flex-1 min-w-44 text-center border border-orange-500">
                            <CardHeader>
                                <CardTitle className="text-orange-500">Avg Price</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-orange-500">
                                    ₹{avgPrice}
                                </p>
                            </CardContent>
                        </Card>

                    </div>

                    <Separator/>

                    {/* Tables */}
                    <div className="flex flex-wrap gap-4">

                        {/* Top Farms */}
                        <Card className="flex-1 min-w-64">
                            <CardHeader>
                                <CardTitle className="text-2xl">Top Farms</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Farm</TableHead>
                                            <TableHead>Income</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {topFarms.length > 0 ? (
                                            topFarms.map((f, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{i + 1}</TableCell>
                                                    <TableCell className="font-medium">{f.farmName}</TableCell>
                                                    <TableCell className="text-green-500 font-semibold">
                                                        ₹{Number(f.totalIncome).toLocaleString("en-IN")}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3}
                                                           className="text-center text-muted-foreground py-6">
                                                    No farm data
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Production */}
                        <Card className="flex-1 min-w-64">
                            <CardHeader>
                                <CardTitle className="text-2xl">Production by Farm</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Farm</TableHead>
                                            <TableHead>Qty</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {analytics.productionByFarm?.length > 0 ? (
                                            analytics.productionByFarm.map((f, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{i + 1}</TableCell>
                                                    <TableCell className="font-medium">{f.farmName}</TableCell>
                                                    <TableCell className="text-blue-500 font-semibold">
                                                        {Number(f.totalQuantity).toLocaleString("en-IN")} kg
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3}
                                                           className="text-center text-muted-foreground py-6">
                                                    No production data
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                    </div>

                </div>
            )}

        </div>
    );
};

export default AdminCrops;