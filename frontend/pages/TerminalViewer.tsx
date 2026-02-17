import { useRef, useState, useEffect, JSX } from 'react';
import axios from 'axios';
import { route } from 'ziggy-js';
import { useEcho, useConnectionStatus, useEchoPublic } from '@laravel/echo-react'
import '../echo.js';
import Button from '../components/Button.js';
import { ucFirst } from '../Helpers/utilities.js';

declare global {
    interface CommandOutputEvent {
        output: string;
        finished?: boolean;
    }

    interface EchoChannel {
        listen(event: string, cb: (e: CommandOutputEvent) => void): EchoChannel;
        stopListening?(event?: string): void;
        leave?(): void;
    }

    interface Window {
        Echo?: {
            channel(name: string): EchoChannel;
        };
    }
}

export default function TerminalViewer(): JSX.Element {
    const [logs, setLogs] = useState<string[]>([]);
    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    const [running, setRunning] = useState<boolean>(false);
    const [isProcessFinished, setIsProcessFinished] = useState<boolean>(false);
    const channelRef = useRef<EchoChannel | null>(null);
    const status = useConnectionStatus(); // Automatically updates when status changes

    const getStatusColor = (status: string) => {
        switch (status) {
            case "connected":
                return "green";
            case "connecting":
                return "yellow";
            case "reconnecting":
                return "orange";
            case "failed":
                return "red";
            default:
                return "gray";
        }
    };

    useEchoPublic(`command-output`, "CommandOutput", (e: CommandOutputEvent) => {
        setIsWaiting(false);
        setLogs((prev) => [...prev, e.output]);
        setRunning(!e.finished);
        e.finished && setIsProcessFinished(true);
    });
    console.log('TerminalViewer mounted 2', status);
    const startCommand = async (): Promise<void> => {
        setLogs([]);
        setRunning(true);

        // Trigger backend command
        await axios.post(route('setup'));
        setIsWaiting(true);
    };

    useEffect(() => {
        // // Remove any previous listener, then subscribe to channel
        // channelRef.current?.stopListening?.('CommandOutput');
        // const ch = window.Echo?.channel('command-output') ?? null;
        // channelRef.current = ch;
        // console.log('Subscribed to command-output channel', ch);
        // ch?.listen('CommandOutput', (e: CommandOutputEvent) => {
        //     console.log('Received CommandOutput event', e);
        //     setLogs((prev) => [...prev, e.output]);
        //     if (e.finished) setRunning(false);
        // });



    }, []);

    return (
        <>
            <Button
                onClick={startCommand}
                disabled={running}
                className="mb-3 bg-blue-600 px-3 py-1 rounded text-white disabled:opacity-50"
            > Run Command </Button>
            <div className="w-full h-[100vh] bg-black text-green-400 font-mono p-4  rounded overflow-y-auto">

                <p style={{ color: getStatusColor(status) }}> {ucFirst(status)} to server...</p>
                {
                    isWaiting && <div className='animate-pulse text-yellow-500'>
                        Waiting for command output...
                    </div>
                }
                <div>
                    {logs.map((log, i) => (
                        <div key={i}>{log}</div>
                    ))}
                </div>
                {
                    isProcessFinished && <div className='text-green-500'>
                        Command finished successfully.
                        You can now refresh the page to see the updated dashboard.
                    </div>
                }
            </div>
        </>
    );
}
