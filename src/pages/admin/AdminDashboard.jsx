import React, {useEffect, useState} from 'react';
import axiosConfig from "@/api/axiosConfig.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";

const AdminDashboard = () => {
    const [summary, setSummary] = useState(null);
    const [topCrops, setTopCrops] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [summaryRes, cropsRes, activityRes] = await Promise.all([
                    axiosConfig.get("/admin/summary"),
                    axiosConfig.get("/admin/topcops"),
                    axiosConfig.get("/admin/recentactivity"),
                ]);
                setSummary(summaryRes.data);
                setTopCrops(cropsRes.data);
                setRecentActivity(activityRes.data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    return (
        <section className="py-6 space-y-6">
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

            {loading && (
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                        {Array.from({length: 3}).map((_, i) => (
                            <Skeleton key={i} className="h-28 flex-1 min-w-44 rounded-xl"/>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-48 flex-1 min-w-64 rounded-xl"/>
                        <Skeleton className="h-48 flex-1 min-w-64 rounded-xl"/>
                    </div>
                </div>
            )}

            {!loading && (
                <div className="space-y-6">

                    {/* Summary Cards */}
                    <div className="flex flex-wrap gap-4">
                        <Card className="border border-blue-500 text-center flex-1 min-w-44 bg-muted">
                            <CardHeader>
                                <CardTitle className="text-blue-500 text-xl">Total Users</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-blue-500">
                                    {summary?.totalUsers ?? 0}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border border-green-500 text-center flex-1 min-w-44 bg-muted">
                            <CardHeader>
                                <CardTitle className="text-green-500 text-xl">Total Farms</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-green-500">
                                    {summary?.totalFarms ?? 0}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border border-purple-500 text-center flex-1 min-w-44 bg-muted">
                            <CardHeader>
                                <CardTitle className="text-purple-500 text-xl">Total Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold text-purple-500">
                                    {summary?.totalTransactions ?? 0}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Separator/>

                    {/* Top Crops & Recent Activity */}
                    <div className="flex flex-wrap gap-4">

                        {/* Top Crops */}
                        <Card className="flex-1 min-w-64">
                            <CardHeader>
                                <CardTitle className="text-2xl">Top Crops</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Crop</TableHead>
                                            <TableHead>Total Income</TableHead>
                                            <TableHead>Total Quantity</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {topCrops.length > 0 ? (
                                            topCrops.map((crop, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                                                    <TableCell className="font-medium">{crop.cropname}</TableCell>
                                                    <TableCell
                                                        className="text-green-500 font-semibold">₹{crop.totalIncome}</TableCell>
                                                    <TableCell
                                                        className="text-muted-foreground">{crop.totalQuantity} {crop.unit}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4}
                                                           className="text-center text-muted-foreground py-6">
                                                    No data found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="flex-1 min-w-64">
                            <CardHeader>
                                <CardTitle className="text-2xl">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Farm</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Date</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentActivity.length > 0 ? (
                                            recentActivity.map((tx) => (
                                                <TableRow key={tx.id}>
                                                    <TableCell className="font-medium">{tx.farmName}</TableCell>
                                                    <TableCell>
                                <span
                                    className={`font-semibold ${tx.type === "INCOME" ? "text-green-500" : "text-red-500"}`}>
                                    {tx.type}
                                </span>
                                                    </TableCell>
                                                    <TableCell
                                                        className={`font-semibold ${tx.type === "INCOME" ? "text-green-500" : "text-red-500"}`}>
                                                        {tx.type === "INCOME" ? "+" : "-"}₹{tx.amount}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {new Date(tx.transactionDate).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4}
                                                           className="text-center text-muted-foreground py-6">
                                                    No recent activity.
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

        </section>
    );
};

export default AdminDashboard;