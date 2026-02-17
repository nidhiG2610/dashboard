import AppLayout from "../components/Layouts/AppLayout";
import Button from "../components/Button";
import imageFile from '@/assets/images/dashboard_graph.svg';
import { useState } from "react";
import TerminalViewer from "./TerminalViewer";

const Dashboard = () => {
    const [showTerminal, setShowTerminal] = useState(false);

    return <>
            <div className="flex flex-col items-center gap-6">
             {
                showTerminal 
                ? <TerminalViewer /> 
                : <div className="flex flex-col items-center gap-4">
                    <img className="mt-6xl" src={imageFile} alt="Dashboard Image" />
                    <p className="text-3xl font-extrabold"> There is no data to display. </p>
                    <p className="text-3xl font-extrabold">Setup your business.</p>
                    <p className="text-xs text-gray-500">Get started by adding your first project.</p>
                    <Button type="button" variant="primary" onClick={() => setShowTerminal(true)}>Setup</Button>
                </div>
             }
            </div>
    </>;
};
Dashboard.layout = (page: React.ReactNode) => <AppLayout pageTitle="Dashboard" showMessagePanel={true} showConversionHistory={true}>{page}</AppLayout>;
export default Dashboard;