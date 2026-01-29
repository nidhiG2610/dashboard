import React, { useState } from "react";
import AuthenticationLayout from "../../components/Layouts/AuthenticationLayout";
import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
import SocialMedia from "../../components/SocialMedia";
import Button from "../../components/Button";
import { router } from "../../router";

export default function SignIn() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [isUserAgreedToBeRemembered, setIsUserAgreedToBeRemembered] = useState(false);

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const validate = () => {
        const e = {};
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
            router.navigate("/");
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
                Sign In to see latest Updates.
            </>
        } subtitle={
            <>Enter your details to proceed further</>
        }
        image={'signIn'}
        >
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
                <div className="flex flex-row  justify-between">
                    <RadioButton
                        id="isUserAgreedToBeRemembered"
                        name="isUserAgreedToBeRemembered"
                        value="true"
                        label="Remember me"
                        onChange={(e) => setIsUserAgreedToBeRemembered(e.target.checked)}
                        checked={isUserAgreedToBeRemembered}
                        size="sm"
                    />
                    <a href="/reset-password" className="text-primary">Recover password</a>

                </div>
                <div className='flex flex-row gap-4 mt-4'>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={(event) => handleSubmit(event)}
                    >
                        Sign In
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => router.navigate("/signup")}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
            <SocialMedia className="mt-6" />
        </AuthenticationLayout>
    );
}