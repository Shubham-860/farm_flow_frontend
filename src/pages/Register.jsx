import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import axiosConfig from "@/api/axiosConfig.js";
import {Link, useNavigate} from "react-router";
import {useEffect} from "react";
import {toast} from "sonner";


const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long."),
    email: z.email("Invalid email address."),
    password: z.string().min(3, "Password must be at least 3 characters long."),
});

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) navigate("/");
    }, [navigate]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })
    const onSubmit = async (data) => {

        axiosConfig.post("/auth/register", data).then(res => {
            console.log("data:", res.data.status);
            const message = res?.response?.data?.message
            if (res.data.status) {
                toast.success("Registered successfully!");
                navigate("/login");
            } else {
                form.setError("root", {message});
                toast.error(message || "Registration failed. Please try again.");
            }
        }).catch(e => {
            const message = e.response?.data?.message || "Something went wrong";
            console.log("error:", message);
        })

    }


    return (
        <div className="flex items-center justify-center w-full min-h-full px-4">
            <div className="w-full max-w-sm bg-muted rounded-2xl shadow-md border border-border p-8 space-y-6">

                {/* Header */}
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Create your account
                    </h1>
                    <p className="text-sm text-muted-foreground">Get started.</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your name" {...field}
                                               className={"dark:bg-neutral-900 dark:text-white"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@example.com" {...field}
                                               className={"dark:bg-neutral-900 dark:text-white"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>Password</FormLabel>
                                        {/*<a href="#"*/}
                                        {/*   className="text-xs text-muted-foreground hover:text-foreground transition-colors">*/}
                                        {/*    Forgot password?*/}
                                        {/*</a>*/}
                                    </div>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field}
                                               className={"dark:bg-neutral-900 dark:text-white"}/>
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

                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-full mt-2"
                            size="lg"
                        >
                            {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
                        </Button>

                    </form>
                </Form>

                <p className="text-center text-sm text-muted-foreground">
                    Have an account?{" "}
                    <Link to="/login" className="text-foreground font-medium hover:underline underline-offset-4">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;