import React from 'react';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SocialMedia from '../../components/SocialMedia';
import axios from 'axios';

export default function VerifyEmail() {

    const [form, setForm] = React.useState({
        email: '',
    });

    const [errors, setErrors] = React.useState({
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/email/verify', form)
            .then(response => {
                // Handle successful verification
            })
            .catch(error => {
                // Handle errors
                setErrors({
                    email: error.response.data.errors.email || '',
                });
            });
    };

    return (
        <AuthenticationLayout title={
            <>
                Verify your email address
            </>
        } subtitle='Enter your details to proceed further'
        image={'lostPassword'}
        >
           Please check your inbox for a verification email. If you did not receive the email, click the button below to resend it.
        </AuthenticationLayout>
    );
}