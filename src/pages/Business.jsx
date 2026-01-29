import React from "react";
import Sidebar from "../components/Sidebar";
import AppLayout from "../components/Layouts/AppLayout";
import Button from "../components/Button";

const Business = () => {
    return <>
        <AppLayout pageTitle="Sales" showLatestUpdatesPanel={true} showEventsPanel={true}>
            <div className="flex flex-col items-center gap-6">
                <p className="text-3xl font-extrabold"> There is no data to display. </p>
                <p className="text-3xl font-extrabold">Setup your business.</p>
                <p className="text-xs text-gray-500">Get started by adding your first project.</p>
                <Button type="button" variant="primary">Setup</Button>
            </div>
        </AppLayout>
    </>;
};

export default Business;