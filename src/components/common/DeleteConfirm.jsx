import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {Trash2} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx";


const DeleteConfirm = ({onDelete, title = "not provided"}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {title === "not provided" ?
                    <Button variant="outline"
                            className="text-red-900 border-red-900 hover:border-red-600 bg-transparent" size="sm">

                        <Trash2 className="w-4 h-4"/>
                    </Button>
                    :
                    <Button variant={"ghost"} size={"sm"}>
                        {title}
                    </Button>}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    );
};

export default DeleteConfirm;