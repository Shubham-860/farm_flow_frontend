import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import axiosConfig from "@/api/axiosConfig.js";
import {toast} from "sonner";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.jsx";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {FieldLabel} from "@/components/ui/field.jsx";
import {Input} from "@/components/ui/input.jsx";
import {format} from "date-fns"
import {Textarea} from "@/components/ui/textarea.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Calendar} from "@/components/ui/calendar.jsx";


const CropSeasonsModal = ({open, onOpenChange, cropSeason, onSuccess, farmId}) => {
    const isEdit = !!cropSeason;

    const form = useForm({
        defaultValues: {
            cropName: "",
            unit: "",
            startDate: "",
            endDate: "",
            notes: "",
        }
    })
    useEffect(() => {
        if (cropSeason) {
            form.reset({
                cropName: cropSeason.cropName,
                unit: cropSeason.unit,
                startDate: cropSeason.startDate,
                endDate: cropSeason.endDate,
                notes: cropSeason.notes
            })
        } else {
            form.reset({
                cropName: "", unit: "", startDate: "", endDate: "", notes: "",
            })
        }
    }, [cropSeason]);

    const onSubmit = async (data) => {
        data.farm = {id: farmId}
        data.active = true;
        console.log("data:", data);
        if (isEdit) {
            await axiosConfig.put(`/cropseason/${cropSeason.id}`, data).then(res => {
                console.log("edit cropSeason res:", res.data);
                toast.success("CropSeason updated successfully!");
            }).catch(e => {
                console.log("edit cropSeason error:", e.response?.data || e.message);
                toast.error("Failed to update cropSeason. Please try again.");
            })
        } else {
            await axiosConfig.post("/cropseason/add", data).then(res => {
                console.log("add cropSeason res:", res.data);
                toast.success("CropSeason added successfully!");
            }).catch(e => {
                console.log("add cropSeason error:", e.response?.data || e.message);
                toast.error("Failed to add cropSeason. Please try again.");
            })
        }
        onOpenChange(false);
        onSuccess();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent>

                {/*head*/}

                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit cropSeason" : "Add new cropSeason"}
                    </DialogTitle>
                </DialogHeader>

                {/*{form}*/}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">


                        <FormField
                            control={form.control}
                            name={"cropName"}
                            rules={{required: "Crop name is required"}}
                            render={({field}) => (
                                <FormItem>
                                    <FieldLabel>Crop name</FieldLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="eg. Corn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                        <FormField
                            control={form.control}
                            name={"unit"}
                            rules={{required: "Crop unit is required"}}
                            render={({field}) => (
                                <FormItem>
                                    <FieldLabel>Unit</FieldLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="how to measure them eg. Kg, crate, boxes"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>


                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({field}) => (
                                <FormItem>
                                    <FieldLabel>Start Date</FieldLabel>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start">
                                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({field}) => (
                                <FormItem>
                                    <FieldLabel>End Date</FieldLabel>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start">
                                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name={"notes"}
                            render={({field}) => (
                                <FormItem>
                                    <FieldLabel>Unit</FieldLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter notes..."
                                            className="min-h-25"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                        {form.formState.errors.root && (
                            <p className="text-sm font-medium text-destructive text-center">
                                {form.formState.errors.root.message}
                            </p>
                        )}

                        <div className={"flex justify-end gap-2 pt-2"}>
                            <Button type={"button"} variant={"outline"}
                                    onClick={() => onOpenChange(false)}
                                    disabled={form.formState.isSubmitting}>
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

export default CropSeasonsModal;