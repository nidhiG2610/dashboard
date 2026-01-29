import React from "react";
import AuthenticationLayout from "../../components/Layouts/AuthenticationLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { router } from "../../router";

export default function Details() {
    const [form, setForm] = React.useState({
        company_name: "",
        employees: "",
        business_type: "",
        phone_number: "",
    });

    const handleChange = (e) => {
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
            phone_number: "",
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        router.navigate("/registration-completed");
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
                    />
                    <Input
                        type="number"
                        id="phone_number"
                        name="phone_number"
                        label="Phone Number"
                        placeholder="Type your phone number..."
                        onChange={handleChange}
                        required={true}
                        value={form.phone_number}
                        iconName="phone"
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