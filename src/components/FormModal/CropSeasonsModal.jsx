import React, {useEffect, useState} from 'react';
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
import {Command, CommandEmpty, CommandInput, CommandItem, CommandList} from "@/components/ui/command.jsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils.js";
import {crops} from "@/constants/constants.js";


// --- Crop Combobox ---
const CropCombobox = ({value, onChange}) => {
    const [comboOpen, setComboOpen] = useState(false);

    return (
        <Popover open={comboOpen} onOpenChange={setComboOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    {value || "Select crop..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search crop..."/>
                    <CommandList>
                        <CommandEmpty>No crop found.</CommandEmpty>
                        {crops.map(crop => (
                            <CommandItem
                                key={crop.name}
                                value={crop.name}
                                onSelect={(val) => {
                                    onChange(val);
                                    setComboOpen(false);
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", value === crop.name ? "opacity-100" : "opacity-0")}/>
                                {crop.name}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

// --- Main Modal ---
const CropSeasonsModal = ({open, onOpenChange, cropSeason, onSuccess, farmId}) => {
    const isEdit = !!cropSeason;

    const form = useForm({
        defaultValues: {
            cropName: "",
            startDate: "",
            endDate: "",
            notes: "",
        }
    });

    useEffect(() => {
        if (cropSeason) {
            form.reset({
                cropName: cropSeason.cropName || "",
                startDate: cropSeason.startDate ? new Date(cropSeason.startDate) : "",
                endDate: cropSeason.endDate ? new Date(cropSeason.endDate) : "",
                notes: cropSeason.notes || "",
            });
        }
    }, [cropSeason]);

    const onSubmit = async (data) => {
        data.farm = {id: farmId};
        data.unit = crops.find(crop => crop.name === data.cropName).unit;
        if (isEdit) {
            data.active = false;
            await axiosConfig.put(`/cropseason/${cropSeason.id}`, data)
                .then(() => toast.success("CropSeason updated successfully!"))
                .catch(e => {
                    console.log(e.response?.data || e.message);
                    toast.error("Failed to update cropSeason. Please try again.");
                });
        } else {
            await axiosConfig.post("/cropseason/add", data)
                .then(() => toast.success("CropSeason added successfully!"))
                .catch(e => {
                    console.log(e.response?.data || e.message);
                    toast.error("Failed to add cropSeason. Please try again.");
                });
        }
        onOpenChange(false);
        onSuccess();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Crop Season" : "Add New Crop Season"}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-3">

                        {/* Crop Name */}
                        <FormField
                            control={form.control}
                            name="cropName"
                            rules={{required: "Crop name is required"}}
                            render={({field}) => (
                                <FormItem>
                                    <FieldLabel>Crop Name</FieldLabel>
                                    <CropCombobox value={field.value} onChange={field.onChange}/>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />


                        {/* Start Date */}
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

                        {/* End Date */}
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

                        {/* Notes */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({field}) => (
                                <FormItem>
                                    <FieldLabel>Notes</FieldLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter notes..."
                                            className="min-h-25"
                                            {...field}
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

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={form.formState.isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="outline"
                                disabled={form.formState.isSubmitting}
                            >
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