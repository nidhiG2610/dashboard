import React from "react";
import Sidebar from "../components/Sidebar";
import AppLayout from "../components/Layouts/AppLayout";
import Button from "../components/Button";

const Tasks = () => {
    return <>
        <AppLayout pageTitle="Tasks" showMessagePanel={true} showConversionHistory={true}>
            <div className="flex flex-col items-center gap-6">
                <img className="mt-6xl" src={`../../../src/assets/images/dashboard_graph.svg`} alt="Dashboard Image" />
                <p className="text-3xl font-extrabold"> There is no data to display. </p>
                <p className="text-3xl font-extrabold">Setup your business.</p>
                <p className="text-xs text-gray-500">Get started by adding your first project.</p>
                <Button type="button" variant="primary">Setup</Button>
            </div>
        </AppLayout>
    </>;
};

export default Tasks;