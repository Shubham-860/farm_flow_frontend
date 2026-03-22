import React, {useMemo, useState} from 'react';
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ArrowDown, ArrowUp, ArrowUpDown, EllipsisVertical} from "lucide-react";
import DeleteConfirm from "@/components/common/DeleteConfirm.jsx";

// Sorting Icon
const SortIcon = ({column}) => {
    if (!column.getCanSort()) return null;
    if (column.getIsSorted() === "asc") return <ArrowUp className="ml-1 w-3.5 h-3.5 inline"/>;
    if (column.getIsSorted() === "desc") return <ArrowDown className="ml-1 w-3.5 h-3.5 inline"/>;
    return <ArrowUpDown className="ml-1 w-3.5 h-3.5 inline text-muted-foreground"/>;
};

const TransactionDataTable = ({data = [], modifiable = false, onEdit, onDelete, title}) => {

    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 5});


    const filteredData = useMemo(() => {
        const safeData = Array.isArray(data) ? data : [];
        return safeData.filter((row) => {
            if (typeFilter === "ALL") return true;
            return row.type === typeFilter;
        });
    }, [data, typeFilter]);

    const columns = useMemo(() => {
        const baseCols = [
            {
                accessorKey: "type",
                header: "Type",
            },
            {
                accessorKey: "sourceOrBuyer",
                header: "Source",
            },
            {
                accessorKey: "quantity",
                header: "Quantity",
            },
            {
                accessorKey: "pricePerUnit",
                header: "Price",
            },
            {
                accessorKey: "unit",
                header: "Unit",
            },
            {
                accessorKey: "amount",
                header: "Amount",
                cell: ({row}) => (
                    <span
                        className={row.original.type === "INCOME" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                        ₹{row.original.quantity * row.original.pricePerUnit || row.original.amount}
                    </span>
                ),
            },
            {
                accessorKey: "transactionDate",
                header: "Date",
                cell: ({row}) => new Date(row.original.transactionDate).toLocaleDateString(),
            },
        ];

        if (modifiable) {
            baseCols.push({
                id: "actions",
                header: "",
                enableSorting: false,
                cell: ({row}) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <EllipsisVertical size={20}/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => onEdit(row.original)}>
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <DeleteConfirm
                                            title="Delete"
                                            onDelete={() => onDelete(row.original.id)}
                                        />
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            });
        }

        return baseCols;
    }, [modifiable, onDelete, onEdit]);

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {sorting, pagination},
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
    });

    return (
        <div className="flex flex-col items-center py-6 justify-center">

            <h2 className="text-2xl">{title ?? "Transactions table"}</h2>

            <div className="flex items-center justify-end w-full my-6">
                <div className="flex items-center gap-2 me-6">
                    <span>Filter by:</span>
                    <Button variant="outline" onClick={() => setTypeFilter("ALL")}>All</Button>
                    <Button variant="outline" onClick={() => setTypeFilter("INCOME")}>Income</Button>
                    <Button variant="outline" onClick={() => setTypeFilter("EXPENSE")}>Expense</Button>
                </div>
                <Input
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="border px-2 w-full max-w-xs"
                />
            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup =>
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header =>
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="cursor-pointer select-none"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    <SortIcon column={header.column}/>
                                </TableHead>
                            )}
                        </TableRow>
                    )}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map(row =>
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell =>
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                )}
                            </TableRow>
                        )
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-8">
                                No transactions found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between w-full mt-4">
                <span className="text-sm text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default TransactionDataTable;