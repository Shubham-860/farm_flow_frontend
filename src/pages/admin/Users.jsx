import React, { useEffect, useState } from "react";
import axiosConfig from "@/api/axiosConfig.js";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import DeleteConfirm from "@/components/common/DeleteConfirm.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        axiosConfig
            .get("/admin/users")
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (id) => {
        axiosConfig
            .delete(`/admin/delete/${id}`)
            .then((res) => {
                console.log(res.data);
                toast.success("User deleted successfully");
                fetchUsers();
            })
            .catch((e) => {
                console.log("error", e.response?.data);
                e.response?.data
                    ? toast.error(e.response.data)
                    : toast.error("Failed to delete user");
            });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Users</h1>

            {/* Loading */}
            {loading && (
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-28 flex-1 min-w-44 rounded-xl" />
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-48 flex-1 min-w-64 rounded-xl" />
                        <Skeleton className="h-48 flex-1 min-w-64 rounded-xl" />
                    </div>
                </div>
            )}

            {/* Table */}
            {!loading && (
                <Card className="flex-1 min-w-64">
                    <CardHeader>
                        <CardTitle className="text-2xl flex justify-end">
                            <Button variant="outline" className="bg-transparent">
                                <Link to="/addadmin">Add admin</Link>
                            </Button>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Id</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="text-muted-foreground">
                                                {user.id}
                                            </TableCell>

                                            <TableCell>{user.role}</TableCell>

                                            <TableCell className="font-medium">
                                                {user.name}
                                            </TableCell>

                                            <TableCell className="font-semibold">
                                                {user.email}
                                            </TableCell>

                                            <TableCell className="text-muted-foreground">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </TableCell>

                                            <TableCell>
                                                <DeleteConfirm
                                                    onDelete={() => handleDeleteUser(user.id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center text-muted-foreground py-6"
                                        >
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Users;