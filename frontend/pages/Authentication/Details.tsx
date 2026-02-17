import React, { useState } from "react";
import AuthenticationLayout from "../../components/Layouts/AuthenticationLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { route } from "ziggy-js";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";

export default function Details() {
    const [form, setForm] = React.useState({
        company_name: "",
        employees: "",
        business_type: "",
        phone: "",
        website: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const resetFormDetails = () => {
        setForm({
            company_name: "",
            employees: "",
            business_type: "",
            phone: "",
            website: "",
        });
    };
     const validate = () => {
        const errors : { company_name?: string; employees?: string; business_type?: string; phone?: string; website?: string } = {
        };
        if (!form.company_name.trim()) errors.company_name = "Company Name is required";
        if (!form.employees.trim()) errors.employees = "Number of Employees is required";
        if (!form.business_type.trim()) errors.business_type = "Business Type is required";
        if (!form.phone.trim()) errors.phone = "Phone Number is required";
        if (!form.website.trim()) errors.website = "Website is required";
        return errors;
    };

    const handleSubmit = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSubmitting(true);
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            // Handle validation errors
            setErrors(errors);
            setSubmitting(false);
            return;
        }

        // Submit the form
        const response = axios.post(route('save-company-details'), form);
        response.then((response: AxiosResponse) => {
            if (response.data.success) {
                window.location.href = response.data.redirect;
            } else {
                setErrors(response.data.errors);
            }
        }).catch((error : AxiosError) => {
            const responseData = error.response?.data;
            if (responseData && typeof responseData === "object" && "errors" in responseData) {
                setErrors((responseData as any).errors);
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
        } 
        subtitle="Enter your details to proceed further"
        image="details"
        >
            <div className='flex flex-col gap-6'>
                <form className="flex flex-col gap-4">
                    <Input
                        type="text"
                        id="company_name"
                        name="company_name"
                        label="Company Name"
                        placeholder="Type your company name..."
                        onChange={handleChange}
                        required={true}
                        value={form.company_name}
                        iconName="building"
                        error={errors.company_name}
                    />
                    <Input
                        type="text"
                        id="employees"
                        name="employees"
                        label="Number of Employees"
                        placeholder="Type the number of employees..."
                        onChange={handleChange}
                        required={true}
                        value={form.employees}
                        iconName="people"
                        error={errors.employees}
                    />
                    <Input
                        type="text"
                        id="business_type"
                        name="business_type"
                        label="Business Type"
                        placeholder="Type your business type..."
                        onChange={handleChange}
                        required={true}
                        value={form.business_type}
                        iconName="arrow-down"
                        error={errors.business_type}
                    />
                    <Input
                        type="number"
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        placeholder="Type your phone number..."
                        onChange={handleChange}
                        required={true}
                        value={form.phone}
                        iconName="phone"
                        error={errors.phone}
                    />
                    <Input
                        type="url"
                        id="website"
                        name="website"
                        label="Website"
                        placeholder="Type your website URL..."
                        onChange={handleChange}
                        required={true}
                        value={form.website}
                        iconName="link"
                        error={errors.website}
                    />
                    <div className='flex flex-row gap-4 mt-4'>
                        <Button
                            type="submit"
                            variant="secondary"
                            onClick={() => resetFormDetails()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            disabled={submitting}
                            onClick={(event) => handleSubmit(event)}
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticationLayout>
    )

}