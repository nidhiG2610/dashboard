import React from 'react';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { router } from '../../router';

const RegistrationCompleted = () => {
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
        router.navigate('/');
        // Handle form submission
    };

    return <AuthenticationLayout title={
            <>
                Registration Complete. <br />
                Subscribe to our newsletters.
            </>
        } subtitle={
            <>Now you can setup projects and teams.</>
        }
        image={'registration_complete'}
        >
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Type your email..."
                    onChange={handleChange}
                    value={form.email}
                    iconName="envelope"
                />
                <div className='flex flex-row gap-4 mt-4'>
                    <Button type="submit" variant="primary" >
                        Finish
                    </Button>
                </div>
            </form>
        </AuthenticationLayout>;
};

export default RegistrationCompleted;