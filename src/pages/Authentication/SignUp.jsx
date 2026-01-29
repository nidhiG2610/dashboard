import React, { useState } from "react";
import AuthenticationLayout from "../../components/Layouts/AuthenticationLayout";
import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
import SocialMedia from "../../components/SocialMedia";
import Button from "../../components/Button";
import { router } from "../../router";

export default function SignUp() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [isUserAgreedToTerms, setIsUserAgreedToTerms] = useState(false);

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email is invalid";
        if (!form.password) e.password = "Password is required";
        else if (form.password.length < 6)
            e.password = "Password must be at least 6 characters";
        if (form.password !== form.confirmPassword)
            e.confirmPassword = "Passwords do not match";
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        router.navigate("/details");
        const validation = validate();
        setErrors(validation);
        if (Object.keys(validation).length) return;

        setSubmitting(true);
        try {
            // Replace with real API call
            await new Promise((res) => setTimeout(res, 900));
            // on success: reset form (or navigate)
            setForm({ name: "", email: "", password: "", confirmPassword: "" });
            setErrors({});
            alert("Account created");

        } catch (err) {
            setErrors({ submit: err?.message || "Sign up failed" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AuthenticationLayout title={
            <>
                Welcome to our CRM. <br />
                Sign Up to getting started.
            </>
        } subtitle={
            <>Enter your details to proceed further</>
        }
            image="authentication"
        >
            <div className='flex flex-col gap-4'>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    label="Name"
                    placeholder="Type your name..."
                    onChange={handleChange}
                    required={true}
                    value={form.name}
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
                />
                <RadioButton
                    id="isUserAgreedToTerms"
                    name="isUserAgreedToTerms"
                    value="true"
                    label="I agree to the terms and conditions"
                    onChange={(e) => setIsUserAgreedToTerms(e.target.checked)}
                    checked={isUserAgreedToTerms}
                    size="sm"
                />
                <div className='flex flex-row gap-4 mt-4'>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={(event) => handleSubmit(event)}
                    >
                        Sign Up
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.navigate("/signin")}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
            <SocialMedia className="mt-6" />
        </AuthenticationLayout>
    );
}