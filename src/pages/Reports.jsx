import React, {useEffect, useState} from 'react';
import axiosConfig from "@/api/axiosConfig.js";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import SeasonTransactionPage from "@/components/SeasonTransactionTable/SeasonTransactionPage.jsx";
import {Separator} from "@/components/ui/separator.jsx";

const DateRange = [
    {label: "All time", value: "ALL_TIME"},
    {label: "This month", value: "THIS_MONTH"},
    {label: "Last 3 months", value: "LAST_3_MONTHS"},
    {label: "Last 6 months", value: "LAST_6_MONTHS"},
    {label: "This year", value: "THIS_YEAR"},
    {label: "Custom", value: "CUSTOM"}
];

const getDateRange = (option) => {
    const now = new Date();
    switch (option) {
        case "THIS_MONTH":
            return {
                startDate: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
                endDate: now.toISOString()
            };
        case "LAST_3_MONTHS":
            return {
                startDate: new Date(now.getFullYear(), now.getMonth() - 3, 1).toISOString(),
                endDate: now.toISOString()
            };
        case "LAST_6_MONTHS":
            return {
                startDate: new Date(now.getFullYear(), now.getMonth() - 6, 1).toISOString(),
                endDate: now.toISOString()
            };
        case "THIS_YEAR":
            return {
                startDate: new Date(now.getFullYear(), 0, 1).toISOString(),
                endDate: now.toISOString()
            };
        default:
            return {startDate: null, endDate: null};
    }
};

const Reports = () => {
    const [farms, setFarms] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedRange, setSelectedRange] = useState("ALL_TIME");
    const [customStart, setCustomStart] = useState("");
    const [customEnd, setCustomEnd] = useState("");
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosConfig.get("/report/farms")
            .then(res => setFarms(res.data))
            .catch(err => console.log(err));
    }, []);

    const seasons = farms.find(f => f.id === selectedFarm)?.cropSeasons || [];

    const handleFarmChange = (farmId) => {
        setSelectedFarm(Number(farmId));
        setSelectedSeason(null);
    };

    const handleApply = () => {
        setLoading(true);

        let startDate, endDate;
        if (selectedRange === "CUSTOM") {
            startDate = customStart ? new Date(customStart).toISOString() : null;
            endDate = customEnd ? new Date(customEnd).toISOString() : null;
        } else {
            ({startDate, endDate} = getDateRange(selectedRange));
        }

        const params = new URLSearchParams();
        if (selectedFarm) params.append("farmId", selectedFarm);
        if (selectedSeason) params.append("cropSeasonId", selectedSeason);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        axiosConfig.get(`/report/filter?${params.toString()}`)
            .then(res => setReportData(res.data))
            .catch(e => console.log(e))
            .finally(() => setLoading(false));
    };

    return (
        <section className="py-6 space-y-6">
            <h1 className="text-3xl font-semibold">Reports</h1>

            {/* Filters */}
            <div className="flex flex-wrap items-end gap-4">

                {/* Farm */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">Farm</span>
                    <Select
                        onValueChange={value => {
                            if (value === "ALL") {
                                setSelectedFarm(null);
                                setSelectedSeason(null);
                            } else {
                                handleFarmChange(value);
                            }
                        }}
                        value={selectedFarm === null ? "ALL" : String(selectedFarm)}
                    >
                        <SelectTrigger className="w-44">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ALL">All Farms</SelectItem>
                                {farms.map(farm => (
                                    <SelectItem key={farm.id} value={String(farm.id)}>
                                        {farm.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Crop Season */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">Crop Season</span>
                    <Select
                        onValueChange={value => setSelectedSeason(value === "ALL" ? null : Number(value))}
                        disabled={!selectedFarm}
                        value={selectedSeason === null ? "ALL" : String(selectedSeason)}
                    >
                        <SelectTrigger className="w-44">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ALL">All Seasons</SelectItem>
                                {seasons.map(season => (
                                    <SelectItem key={season.id} value={String(season.id)}>
                                        {season.cropName}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Date Range */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm text-muted-foreground">Date Range</span>
                    <Select onValueChange={setSelectedRange} defaultValue="ALL_TIME">
                        <SelectTrigger className="w-44">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {DateRange.map(range => (
                                    <SelectItem key={range.value} value={range.value}>
                                        {range.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Custom Date Range */}
                {selectedRange === "CUSTOM" && (
                    <>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">Start Date</span>
                            <Input type="date" className="w-44" onChange={e => setCustomStart(e.target.value)}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted-foreground">End Date</span>
                            <Input type="date" className="w-44" onChange={e => setCustomEnd(e.target.value)}/>
                        </div>
                    </>
                )}

                <Button variant="outline" onClick={handleApply} disabled={loading}>
                    Apply
                </Button>

            </div>

            {/* Skeletons */}
            {loading && (
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                        {Array.from({length: 5}).map((_, i) => (
                            <Skeleton key={i} className="h-28 flex-1 min-w-44 rounded-xl"/>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-48 flex-1 min-w-64 rounded-xl"/>
                        <Skeleton className="h-48 flex-1 min-w-64 rounded-xl"/>
                    </div>
                    <Skeleton className="h-64 w-full rounded-xl"/>
                </div>
            )}

            <Separator/>

            {/* Report Data */}
            {!loading && reportData && (
                <div className="space-y-6">

                    {/* Summary Cards */}
                    <div className="flex flex-wrap gap-4">

                        <Card className="border-green-500 text-center flex-1 min-w-44">
                            <CardHeader>
                                <CardTitle className="text-green-500 text-base">Total Income</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-green-500">₹{reportData.totalIncome ?? 0}</p>
                            </CardContent>
                        </Card>

                        <Card className="border-red-500 text-center flex-1 min-w-44">
                            <CardHeader>
                                <CardTitle className="text-red-500 text-base">Total Expense</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-red-500">₹{reportData.totalExpense ?? 0}</p>
                            </CardContent>
                        </Card>

                        <Card className={`text-center flex-1 min-w-44 ${reportData.netProfit >= 0 ? "border-blue-500" : "border-red-500"}`}>
                            <CardHeader>
                                <CardTitle className={`text-base ${reportData.netProfit >= 0 ? "text-blue-500" : "text-red-500"}`}>
                                    {reportData.netProfit >= 0 ? "Net Profit" : "Net Loss"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className={`text-2xl font-bold ${reportData.netProfit >= 0 ? "text-blue-500" : "text-red-500"}`}>
                                    ₹{reportData.netProfit ?? 0}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className={`text-center flex-1 min-w-44 ${reportData.anticipatedProfit >= 0 ? "border-purple-500" : "border-red-500"}`}>
                            <CardHeader>
                                <CardTitle className={`text-base ${reportData.anticipatedProfit >= 0 ? "text-purple-500" : "text-red-500"}`}>
                                    {reportData.anticipatedProfit >= 0 ? "Anticipated Profit" : "Anticipated Loss"}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className={`text-2xl font-bold ${reportData.anticipatedProfit >= 0 ? "text-purple-500" : "text-red-500"}`}>
                                    ₹{reportData.anticipatedProfit ?? 0}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-yellow-500 text-center flex-1 min-w-44">
                            <CardHeader>
                                <CardTitle className="text-yellow-500 text-base">Pending Income</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-yellow-500">₹{reportData.pendingIncome ?? 0}</p>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Expense Breakdown & Income Analysis */}
                    <div className="flex flex-wrap gap-4">

                        <Card className="flex-1 min-w-64">
                            <CardHeader>
                                <CardTitle className="text-2xl">Expense Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {reportData.expenseBreakdown && Object.keys(reportData.expenseBreakdown).length > 0 ? (
                                    Object.entries(reportData.expenseBreakdown).map(([category, amount]) => (
                                        <div key={category} className="flex items-center justify-between">
                                            <span className="text-base text-muted-foreground capitalize">
                                                {category.toLowerCase().replace("_", " ")}
                                            </span>
                                            <span className="text-base font-semibold text-red-500">₹{amount}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-base text-muted-foreground">No expenses found.</p>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="flex-1 min-w-64">
                            <CardHeader>
                                <CardTitle className="text-2xl">Income Analysis</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {reportData.report ? (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <span className="text-base text-muted-foreground">Total Sales</span>
                                            <span className="text-base font-semibold">{reportData.report.totalSales}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-base text-muted-foreground">Avg Price / Unit</span>
                                            <span className="text-base font-semibold">₹{reportData.report.avgPrice?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-base text-muted-foreground">Total Production</span>
                                            <span className="text-base font-semibold">{reportData.report.totalProduction}</span>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-base text-muted-foreground">No income found.</p>
                                )}
                            </CardContent>
                        </Card>

                    </div>

                    <Separator/>

                    {/* Transactions Table */}
                    <SeasonTransactionPage
                        data={reportData?.transactions}
                        modifiable={false}
                        title="Transactions"
                        refresh={() => {}}
                    />

                </div>
            )}

        </section>
    );
};

export default Reports;