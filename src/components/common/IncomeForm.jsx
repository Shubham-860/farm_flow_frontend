import React, {useEffect, useState} from 'react';
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Calendar} from "@/components/ui/calendar.jsx";
import axiosConfig from "@/api/axiosConfig.js";
import {toast} from "sonner";
import {CalendarDays, CheckCircle2, Clock, FileText, IndianRupee, Package, PlusCircle, User} from "lucide-react";
import {cn} from "@/lib/utils.js";

const incomeSchema = z.object({
    sourceOrBuyer: z.string().min(2, "Source or buyer is required"),
    quantity: z.coerce.number().min(0, "Quantity must be a positive number"),
    pricePerUnit: z.coerce.number().min(0, "Price per unit must be a positive number"),
    amount: z.coerce.number(),
    paymentStatus: z.enum(["PENDING", "RECEIVED"]),
    description: z.string().optional(),
    transactionDate: z.coerce.date(),
});

const IncomeForm = ({cropSeason: cs, refresh, transection, onOpenChange}) => {
    const [cropSeason, setCropSeason] = useState(cs);
    const isEdit = !!transection;
    if (!cropSeason) {
        axiosConfig.get(`/cropseason/only/${transection.id}`).then(res => {
            console.log(res.data)
            setCropSeason(res.data)
        }).catch(e => {
            console.log(e)
        })
    }
    const form = useForm({
        resolver: zodResolver(incomeSchema), defaultValues: {
            sourceOrBuyer: transection?.sourceOrBuyer || "",
            quantity: transection?.quantity || "",
            pricePerUnit: transection?.pricePerUnit || "",
            amount: transection?.amount || "",
            paymentStatus: transection?.paymentStatus || "PENDING",
            description: transection?.description || "",
            transactionDate: transection?.transactionDate ?
                new Date(transection.transactionDate) :
                new Date(),
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
        data.unit = cropSeason.unit;
        data.type = "INCOME";
        if (isEdit) {
            // console.log("before transection: ", transection)
            // console.log("before data: ", data)
            data = {...transection, ...data}
            // console.log("after data", data)
            axiosConfig.put(`/seasontransaction/${data.id}`, data).then(() => {
                toast.success("Income updated successfully!");
                form.reset();
                refresh();
                onOpenChange(false)
            }).catch(() => {
                toast.error("Failed to update income. Please try again.");
            })
        } else {
            axiosConfig.post("/seasontransaction/add", data)
                .then(() => {
                    toast.success("Income added successfully!");
                    form.reset();
                    refresh();
                })
                .catch(() => {
                    toast.error("Failed to add income. Please try again.");
                });
        }
    };

    if (!cropSeason) {
        return <div>Loading...</div>
    }
    return (<div className="w-full">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Buyer / Source */}
                <FormField
                    control={form.control}
                    name="sourceOrBuyer"
                    render={({field}) => (<FormItem>
                        <FormLabel className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <User className="w-3.5 h-3.5"/> Buyer / Source
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Enter buyer name (e.g. Market trader, Factory)" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>)}
                />

                {/* Quantity + Price side by side */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({field}) => (<FormItem>
                            <FormLabel className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                <Package className="w-3.5 h-3.5"/> Qty ({cropSeason.unit})
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
                {/* Payment Status — card-style radio */}
                <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({field}) => (<FormItem>
                        <FormLabel className="text-muted-foreground text-sm">Payment Status</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-3 mt-1"
                            >
                                <label
                                    htmlFor="status-pending"
                                    className={cn("flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors", field.value === "PENDING" ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground")}
                                >
                                    <RadioGroupItem value="PENDING" id="status-pending" className="sr-only"/>
                                    <Clock className="w-4 h-4 shrink-0"/>
                                    <span className="text-sm font-medium">Pending</span>
                                </label>

                                <label
                                    htmlFor="status-received"
                                    className={cn("flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors", field.value === "RECEIVED" ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground")}
                                >
                                    <RadioGroupItem value="RECEIVED" id="status-received" className="sr-only"/>
                                    <CheckCircle2 className="w-4 h-4 shrink-0"/>
                                    <span className="text-sm font-medium">Received</span>
                                </label>
                            </RadioGroup>
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
                                placeholder="Add notes (e.g. sold in local market)"
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
                    {form.formState.isSubmitting ? "Saving..." : isEdit ? "Update Income" : "Add Income"}
                </Button>
            </form>
        </Form>
    </div>);
};

export default IncomeForm;