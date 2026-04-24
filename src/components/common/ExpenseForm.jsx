import React, {useEffect, useState} from 'react';
import * as z from "zod";
import {categories} from "@/constants/constants.js";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, useWatch} from "react-hook-form";
import axiosConfig from "@/api/axiosConfig.js";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Calendar} from "@/components/ui/calendar.jsx";
import {CalendarDays, FileText, IndianRupee, Package, PlusCircle, Tag, User} from "lucide-react";
import {cn} from "@/lib/utils.js";

const categoryIds = categories.map(item => item.id);

const expenseSchema = z.object({
    category: z.enum(categoryIds, "Invalid category"),
    sourceOrBuyer: z.string().min(2, "Source or buyer is required"),
    quantity: z.coerce.number().min(0, "Quantity must be a positive number"),
    pricePerUnit: z.coerce.number().min(0, "Price per unit must be a positive number"),
    amount: z.coerce.number().min(0, "Amount must be a positive number"),
    description: z.string().optional(),
    transactionDate: z.coerce.date(),
});

const ExpenseForm = ({cropSeason: cs, refresh, transection, onOpenChange}) => {
    const [cropSeason, setCropSeason] = useState(cs);
    const isEdit = !!transection;
    if (!cropSeason) {
        console.log(transection.id)
        axiosConfig.get(`/cropseason/only/${transection.id}`).then(res => {
            console.log(res.data)
            setCropSeason(res.data)
        }).catch(e => {
            console.log(e)
        })
    }

    const form = useForm({
        resolver: zodResolver(expenseSchema), defaultValues: {
            category: transection?.category || "",
            sourceOrBuyer: transection?.sourceOrBuyer || "",
            quantity: transection?.quantity || "",
            pricePerUnit: transection?.pricePerUnit || "",
            amount: transection?.amount || "",
            description: transection?.description || "",
            transactionDate: transection?.transactionDate ? new Date(transection.transactionDate) : new Date(),
        },
    });

    const quantity = useWatch({control: form.control, name: "quantity"});
    const pricePerUnit = useWatch({control: form.control, name: "pricePerUnit"});
    useEffect(() => {
        const q = parseFloat(quantity) || 0;
        const p = parseFloat(pricePerUnit) || 0;
        form.setValue("amount", q * p);
    }, [quantity, pricePerUnit]);

    const onSubmit = async (data) => {
        data.cropSeason = {id: cropSeason.id};
        data.farm = {id: cropSeason.farmId};
        data.unit = cropSeason?.unit;
        data.type = "EXPENSE";
        if (isEdit) {
            data = {...transection, ...data}
            axiosConfig.put(`/seasontransaction/${data.id}`, data).then(() => {
                toast.success("Expense updated successfully!");
                form.reset();
                refresh();
                onOpenChange(false)
            }).catch(() => {
                toast.error("Failed to update expense. Please try again.");
            })
        } else {
            axiosConfig.post("/seasontransaction/add", data)
                .then(() => {
                    toast.success("Expense added successfully!");
                    form.reset();
                    refresh();
                })
                .catch(() => {
                    toast.error("Failed to add expense. Please try again.");
                });
        }
    };


    if (!cropSeason) {
        return <div>Loading...</div>
    }
    return (<div className="w-full">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <div className="grid grid-cols-2 gap-4">


                    {/* Buyer / Source */}
                    <FormField
                        control={form.control}
                        name="sourceOrBuyer"
                        render={({field}) => (<FormItem>
                            <FormLabel className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                <User className="w-3.5 h-3.5"/> Source
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter source name (e.g. Market trader, Factory)" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>)}
                    />
                    {/* Category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (<FormItem>
                            <FormLabel className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                <Tag className="w-3.5 h-3.5"/> Category
                            </FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {categories.map(category => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.value}
                                                </SelectItem>))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>)}
                    />
                </div>

                {/* Quantity + Price side by side */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({field}) => (<FormItem>
                            <FormLabel className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                <Package className="w-3.5 h-3.5"/> Qty
                            </FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g. 40" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>)}
                    />

                    <FormField
                        control={form.control}
                        name="pricePerUnit"
                        render={({field}) => (<FormItem>
                            <FormLabel className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                <IndianRupee className="w-3.5 h-3.5"/> Price / Unit (₹)
                            </FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g. 30" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>)}
                    />
                </div>

                {/* Amount */}
                <FormField
                    control={form.control}
                    name="amount"
                    render={({field}) => (<FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <IndianRupee className="w-3.5 h-3.5"/> Amount
                        </FormLabel>
                        <FormControl>
                            <Input
                                disabled={true}
                                type="number"
                                placeholder="Enter amount (e.g. 4000)"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>)}
                />


                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (<FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <FileText className="w-3.5 h-3.5"/> Description
                            <span className="font-normal text-muted-foreground/60">(optional)</span>
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Add notes (e.g. purchased from local supplier)"
                                className="resize-none min-h-20"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>)}
                />

                {/* Transaction Date */}
                <FormField
                    control={form.control}
                    name="transactionDate"
                    render={({field}) => (<FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <CalendarDays className="w-3.5 h-3.5"/> Transaction Date
                        </FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                                >
                                    <CalendarDays className="mr-2 w-4 h-4"/>
                                    {field.value ? field.value.toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    }) : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage/>
                    </FormItem>)}
                />

                {/* Root error */}
                {form.formState.errors.root && (<p className="text-sm text-destructive text-center">
                    {form.formState.errors.root.message}
                </p>)}

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full flex items-center gap-2"
                >
                    <PlusCircle className="w-4 h-4"/>
                    {form.formState.isSubmitting ? "Saving..." : isEdit ? "Update Expense" : "Add Expense"}
                </Button>
            </form>
        </Form>
    </div>);
};

export default ExpenseForm;