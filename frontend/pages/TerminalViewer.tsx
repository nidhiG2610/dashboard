import { useRef, useState, useEffect, JSX } from 'react';
import axios from 'axios';
import { route } from 'ziggy-js';
import { useEcho, useConnectionStatus, useEchoPublic } from '@laravel/echo-react'
import '../echo.js';
import Button from '../components/Button.js';
import { ucFirst } from '../Helpers/utilities.js';
import ProgressBar from '../components/ProgressBar.js';
import WorkerStatus from '../components/WorkerStatus.js';

declare global {
    interface CommandOutputEvent {
        output: Array<string> | string;
        current?: number;
        total?: number;
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

type sessionStatus = 'idle' | 'waiting' | 'processing' | 'running' | 'finished' | 'error';
type connectionStatus = 'connected' | 'connecting' | 'reconnecting' | 'failed' | 'disconnected';

export default function TerminalViewer(): JSX.Element {
    const [logs, setLogs] = useState<string[]>([]);
    const channelRef = useRef<EchoChannel | null>(null);
    const status: connectionStatus = useConnectionStatus(); // Automatically updates when status changes
    const [currentProcess, setCurrentProcess] = useState<number>(0);
    const [totalProcess, setTotalProcess] = useState<number>(0);
    const [currentSessionStatus, setCurrentSessionStatus] = useState<sessionStatus>('idle');

    const getStatusColor = (status: connectionStatus) => {
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
        const { output, total, current, finished } = e;

        if (total !== undefined) setTotalProcess(total);
        if (current !== undefined) setCurrentProcess(current);

        current && total && updateCurrentSessionStatus(); // Move to running from processing when we get the first progress update.
        
        if (Array.isArray(output)) {
            setLogs((prev) => [...prev, ...output]);
        } else {
            setLogs((prev) => [...prev, output as string]);
        }

        finished && setCurrentSessionStatus('finished'); // Move to finished when we get the finished flag.
    });

    function updateCurrentSessionStatus() {
        currentSessionStatus === 'idle' && setCurrentSessionStatus('waiting');
        currentSessionStatus === 'waiting' && setCurrentSessionStatus('processing');
        currentSessionStatus === 'processing' && setCurrentSessionStatus('running');
        currentSessionStatus === 'running' && setCurrentSessionStatus('finished'); // Clear session on backend when we move to finished.
    }

    useEffect(() => { 
        currentSessionStatus === 'waiting' && axios.post(route('setup')).then(res => res.status === 200 && updateCurrentSessionStatus());
    }, [currentSessionStatus]);

    return (
        <>
            <Button
                onClick={() =>  updateCurrentSessionStatus()}  // Move from idle to waiting
                disabled={currentSessionStatus !== 'idle'}
                className="mb-3 bg-blue-600 px-3 py-1 rounded text-white disabled:opacity-50"
            > Run Command to Generate Data
            </Button>
            <div className="w-full h-[70vh] bg-black text-green-400 font-mono p-4 rounded overflow-y-auto">
                <WorkerStatus />
                <p style={{ color: getStatusColor(status) }}> {ucFirst(status)} to server...
                    <br />Please click on the button to generate data.</p>
                
                {
                    currentSessionStatus === 'waiting' &&
                    <div className='animate-pulse text-yellow-500'>
                        Waiting for command output...
                    </div>
                }
                {
                    currentSessionStatus === 'processing' &&
                    <>
                        <div className='animate-pulse text-blue-500'>
                            Processing command output...
                        </div>
                        <div>
                            <ProgressBar
                                value={(currentProcess / totalProcess) * 100}
                                className="my-2"
                                height='h-4'
                                colorClass='bg-green-500'
                            />
                            {logs.map((log, i) => (
                                <div key={i} className='whitespace-pre-wrap'> {log}</div>
                            ))}
                        </div>
                    </>
                }
                {

                }

                {
                    currentSessionStatus === 'finished' && <div className='text-green-500'>
                        Command finished successfully.
                        You can now refresh the page to see the updated dashboard.
                    </div>
                }
            </div>
        </>
    );
}
