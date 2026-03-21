import React, {useState} from "react";
import axiosConfig from "@/api/axiosConfig";

import {Dialog, DialogContent, DialogTitle,} from "@/components/ui/dialog";
import ExpenseForm from "@/components/common/ExpenseForm.jsx";
import IncomeForm from "@/components/common/IncomeForm.jsx";
import {toast} from "sonner";
import TransactionDataTable from "@/components/SeasonTransactionTable/TransactionDataTable.jsx";

const SeasonTransactionPage = ({data, refresh, cropSeason, modifiable = false, title}) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);


    //  EDIT
    const handleEdit = (tx) => {
        console.log("tx:", tx)
        setSelected(tx);
        setOpen(true);
    };

    //  DELETE
    const handleDelete = async (id) => {
        await axiosConfig.delete(`/seasontransaction/${id}`).then(res => {
            console.log("delete res:", res.data);
            toast.success("Transaction deleted successfully");
            refresh();
        }).catch(e => {
            console.log("delete error:", e.response?.data || e.message);
            toast.error("Failed to delete transaction. Please try again.");
        });
    };

    return (
        <div className="p-4">

            <TransactionDataTable
                data={data}
                modifiable={modifiable}
                onEdit={handleEdit}
                onDelete={handleDelete}
                title={title}
            />

            {/* EDIT MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogTitle></DialogTitle>
                    {selected?.type === "INCOME" ? (
                        <IncomeForm
                            transection={selected}
                            refresh={refresh}
                            cropSeason={cropSeason}
                            onOpenChange={setOpen}
                        />
                    ) : (
                        <ExpenseForm
                            transection={selected}
                            refresh={refresh}
                            cropSeason={cropSeason}
                            onOpenChange={setOpen}

                        />
                    )}

                </DialogContent>
            </Dialog>

        </div>
    );
};

export default SeasonTransactionPage;