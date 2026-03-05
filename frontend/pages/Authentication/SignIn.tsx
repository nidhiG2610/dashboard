import React, { useState } from "react";
import AuthenticationLayout from "../../components/Layouts/AuthenticationLayout";
import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
import SocialMedia from "../../components/SocialMedia";
import Button from "../../components/Button";
import { route } from "ziggy-js";
import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "@inertiajs/react";

export default function SignIn() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [isUserAgreedToBeRemembered, setIsUserAgreedToBeRemembered] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
        const validation = validate();
        setErrors(validation);

    }

    const validate = () => {
        const errors: { email?: string; password?: string } = {};
        if (!form.email.trim()) errors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Email is invalid";
        if (!form.password) errors.password = "Password is required";
        else if (form.password.length < 6)
            errors.password = "Password must be at least 6 characters";
        console.log(errors);
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validation = validate();
        setErrors(validation);
        if (Object.keys(validation).length) return;

        setSubmitting(true);      

            axios.post(route('admin.save-login'), {
                email: form.email,
                password: form.password,
            }).then((response: AxiosResponse) => {
                if (response.data.success) {
                    router.visit(response.data.redirect);
                }
            }).catch((error: AxiosError) => {
                // how to extract error messages from AxiosError
                const responseData = (error.response?.data) as any;
                if (responseData && responseData.errors) {
                    setErrors(responseData.errors as Record<string, string>);
            } else if (responseData && typeof responseData === "object") {
                // some APIs return an object of errors directly
                setErrors(responseData as Record<string, string>);
            } else {
                setErrors({ submit: "Sign in failed" });
            }
        }).finally(() => {
            setSubmitting(false);
        });
    };

    return (
        <AuthenticationLayout title={
            <>
                Welcome to our CRM. <br />
                Sign In to see latest Updates.
            </>
        } subtitle={
            'Enter your details to proceed further'
        }
            image={'signIn'}
        >
            <form method="POST" onSubmit={handleSubmit} noValidate>
                <div className='flex flex-col gap-4'>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Type your email..."
                        onChange={handleChange}
                        required={true}
                        value={form.email}
                        iconName="envelope"
                        error={errors?.email}
                    />
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="Type your password..."
                        onChange={handleChange}
                        required={true}
                        showPasswordToggle={true}
                        value={form.password}
                        iconName="lock"
                        error={errors?.password}
                    />
                    <div className="flex flex-row  justify-between">
                        <RadioButton
                            id="isUserAgreedToBeRemembered"
                            name="isUserAgreedToBeRemembered"
                            value="true"
                            label="Remember me"
                            onChange={(e) => setIsUserAgreedToBeRemembered(e.target.checked)}
                            checked={isUserAgreedToBeRemembered}
                            type="sm"
                        />
                        <a href={route('admin.reset-password')} className="text-primary">Recover password</a>

                    </div>
                    <div className='flex flex-row gap-4 mt-4'>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={submitting || Object.keys(errors).length > 0}
                        // onClick={(event : React.FormEvent<HTMLFormElement>) => handleSubmit(event)}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() =>  router.visit(route('admin.signup'))}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </form>
            <SocialMedia className="mt-6" />
        </AuthenticationLayout>
    );
}