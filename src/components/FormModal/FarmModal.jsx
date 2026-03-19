import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import axiosConfig from "@/api/axiosConfig.js";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.jsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {toast} from "sonner";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long."),
    areaAcre: z.coerce.number().min(0, "Area must be a positive number."),
});

const FarmModal = ({open, onOpenChange, farm, onSuccess}) => {
    const isEdit = !!farm;
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            areaAcre: null,
        }
    })

    useEffect(() => {
        if (farm) {
            form.reset({name: farm.name, areaAcre: farm.areaAcre})
        } else {
            form.reset({name: "", areaAcre: 0})
        }
    }, [farm]);


    const onSubmit = async (data) => {
        if (isEdit) {
            await axiosConfig.put(`/farm/${farm.id}`, data).then(res => {
                console.log("edit farm res:", res.data);
                toast.success("Farm updated successfully!");
            }).catch(e => {
                console.log("edit farm error:", e.response?.data || e.message);
                toast.error("Failed to update farm. Please try again.");
            })
        } else {
            await axiosConfig.post("/farm/add", data).then(res => {
                console.log("add farm res:", res.data);
                toast.success("Farm added successfully!");
            }).catch(e => {
                console.log("add farm error:", e.response?.data || e.message);
                toast.error("Failed to add farm. Please try again.");
            })
        }
        onOpenChange(false);
        onSuccess();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent>
                {/*head*/}
                <DialogHeader>
                    <DialogTitle> {isEdit ? "Edit farm" : "Add new farm"}</DialogTitle>
                </DialogHeader>

                {/*form*/}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">
                        {/*name*/}


                        <FormField
                            control={form.control}
                            name={"name"}
                            rules={{required: "Name is required"}}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Farm name</FormLabel>

                                    <FormControl>
                                        <Input placeholder="eg. North field" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name={"areaAcre"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Area (acres)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="eg 2" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {form.formState.errors.root && (
                            <p className="text-sm font-medium text-destructive text-center">
                                {form.formState.errors.root.message}
                            </p>
                        )}
                        <div className={" flex justify-end gap-2 pt-2"}>
                            <Button type={"button"} variant={"outline"}
                                    disabled={form.formState.isSubmitting}
                                    onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type={"submit"} variant={"outline"}
                                    disabled={form.formState.isSubmitting}>
                                {isEdit ? "Update" : "Add"}
                            </Button>
                        </div>

                    </form>

                </Form>


            </DialogContent>

        </Dialog>
    );
};

export default FarmModal;