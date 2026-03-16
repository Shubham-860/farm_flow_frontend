import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import axiosConfig from "@/api/axiosConfig.js";
import {useAuth} from "@/components/Hooks/useAuth.js";
import {useNavigate} from "react-router";
import {useEffect} from "react";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

const Login = () => {

    const {setUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) navigate("/");
    }, [navigate]);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = async (data) => {

        axiosConfig.post("/auth/login", data).then(res => {
            console.log("data:", res.data);
            setUser({name: res.data.name, email: res.data.email, id: res.data.id});
            localStorage.setItem("token", res.data.token);
            navigate("/");
        }).catch(e => {
            const message = e.response?.data?.message || "Something went wrong";
            form.setError("root", {message});
            console.log(message);
        })

    }

    return (
        <div className={"container mx-auto pt-28"}>
            <h1 className={"text-center my-3 mb-5 text-3xl"}>Login</h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-6 max-w-sm ">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className={"flex flex-col gap-1 items-center"}>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem className={"flex flex-col gap-1 items-center"}>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
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
                    <span className="flex justify-center">
                    <Button type="submit" disabled={form.formState.isSubmitting} size={"lg"} >Login</Button>
                    </span>

                </form>
            </Form>
        </div>
    );
};

export default Login;
