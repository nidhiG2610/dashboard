import React from 'react';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SocialMedia from '../../components/SocialMedia';

export default function ResetPassword() {

    const [form, setForm] = React.useState({
        email: '',
    });
    const [errors, setErrors] = React.useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <AuthenticationLayout title={
            <>
                Lost your password? <br />
                Enter your details to recover.
            </>
        } subtitle={
            <>Enter your details to proceed further</>
        }
        image={'lostPassword'}
        >
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
                    errorMessage={errors.email}
                />
                <div className='flex flex-row gap-4 mt-4 text-center'>
                    <Button type="submit" variant="primary">
                        Recover
                    </Button>
                </div>
            </form>
            <SocialMedia className="mt-6" />
        </AuthenticationLayout>
    );
}