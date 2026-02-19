import React, { useState } from "react";
import AuthenticationLayout from "../../components/Layouts/AuthenticationLayout";
import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
import SocialMedia from "../../components/SocialMedia";
import Button from "../../components/Button";
import { router } from '@inertiajs/react';
import axios, { AxiosError, AxiosResponse } from "axios";
import { route } from "ziggy-js";

export default function SignUp() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [isUserAgreedToTerms, setIsUserAgreedToTerms] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const validate = () => {
        const e : { first_name?: string; last_name?: string; email?: string; password?: string; password_confirmation?: string } = {};
        if (!form.first_name.trim()) e.first_name = "First Name is required";
        if (!form.last_name.trim()) e.last_name = "Last Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email is invalid";
        if (!form.password) e.password = "Password is required";
        else if (form.password.length < 6)
            e.password = "Password must be at least 6 characters";
        if (form.password !== form.password_confirmation)
            e.password_confirmation = "Passwords do not match";
        return e;
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const validation = validate();
        console.log("Validation errors:", validation);
        setErrors(validation);
        if (Object.keys(validation).length) return;

        setSubmitting(true);

        const response = axios.post(route('admin.register'), {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            password: form.password,
            password_confirmation: form.password_confirmation,
        })

        response.then((res: AxiosResponse) => {
            setForm({ first_name: "", last_name: "", email: "", password: "", password_confirmation: "" });
            setErrors({});
            if (res.data.success) {
                window.location.href = res.data.redirect;
            }
        }).catch((error:AxiosError) => {
            const responseData = (error.response?.data) as any;
            if (responseData && responseData.errors) {
                setErrors(responseData.errors as Record<string, string>);
            } else if (responseData && typeof responseData === "object") {
                // some APIs return an object of errors directly
                setErrors(responseData as Record<string, string>);
            } else {
                setErrors({ submit: "Sign Up failed" });
            }
        }).finally(() => {
            setSubmitting(false);
        });
    };

    return (
        <AuthenticationLayout title={
            <>
                Welcome to our CRM. <br />
                Sign Up to getting started.
            </>
        } subtitle={
            'Enter your details to proceed further'
        }
            image="authentication"
        >
            <div className='flex flex-col gap-4'>
                <Input
                    type="text"
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    placeholder="Type your first name..."
                    onChange={handleChange}
                    required={true}
                    value={form.first_name}
                    error={errors.first_name}
                />
                <Input
                    type="text"
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    placeholder="Type your last name..."
                    onChange={handleChange}
                    required={true}
                    value={form.last_name}
                    error={errors.last_name}
                />
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
                    error={errors.email}
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
                    error={errors.password}
                />
                <Input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    label="Confirm Password"
                    placeholder="Type your password again..."
                    onChange={handleChange}
                    required={true}
                    showPasswordToggle={true}
                    value={form.password_confirmation}
                    iconName="lock"
                    error={errors.password_confirmation}
                />
                <RadioButton
                    id="isUserAgreedToTerms"
                    name="isUserAgreedToTerms"
                    value="true"
                    label="I agree to the terms and conditions"
                    onChange={(e) => setIsUserAgreedToTerms(e.target.checked)}
                    checked={isUserAgreedToTerms}
                    type="sm"
                />
                <div className='flex flex-row gap-4 mt-4'>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleSubmit(event)}
                    >
                        Sign Up
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.visit(route('admin.login'))}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
            <SocialMedia className="mt-6" />
        </AuthenticationLayout>
    );
}