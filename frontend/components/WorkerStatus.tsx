import { useEffect, useState } from "react";
import { route } from "ziggy-js";

interface WorkerStatusResponse {
    running: boolean;
}

interface WorkerStatusProps {
    showLabel?: boolean;
}
export default function WorkerStatus({ showLabel = false }: WorkerStatusProps) {
    const [running, setRunning] = useState(false);

    const fetchStatus = async () => {
        try {
            const res = await fetch(route('setup.status'));
            const data: WorkerStatusResponse = await res.json();

            setRunning(data.running);
        } catch (err) {
            setRunning(false);
        }
    };

    useEffect(() => {
        fetchStatus();

        const interval = setInterval(() => {
            fetchStatus();
        }, 3000); // check every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-end items-center gap-2">
            {/* Status Dot */}
            <span
                className={`w-3 h-3 rounded-full transition-all duration-300 ${running
                        ? "bg-green-500 animate-pulse"
                        : "bg-red-500"
                    }`}
            />
            {
                showLabel &&
                <span className="text-sm text-gray-300">
                    Queue Worker {running ? "Running" : "Stopped"}
                </span>
            }
        </div>
    );
}