import React, { useEffect, useRef, useState } from "react";
import Updates from "../Updates";
import { twMerge } from "tailwind-merge";
import Sidebar from "../Sidebar";
import WelcomeCard from "../WelcomeCard";
import Messages from "../Messages";
import LatestUpdates from "../LatestUpdates";
import Events from "../Events";
import ConversionHistory from "../ConversionHistory";
import Icon from "../Icon";
import { Head, router } from "@inertiajs/react";

interface AppLayoutProps {
    children: React.ReactNode;
    pageTitle: string;
    showMessagePanel?: boolean;
    showLatestUpdatesPanel?: boolean;
    showEventsPanel?: boolean;
    showConversionHistory?: boolean;
}

export default function AppLayout(
    {
        children,
        pageTitle,
        showMessagePanel = false,
        showLatestUpdatesPanel = false,
        showEventsPanel = false,
        showConversionHistory = false
    }: AppLayoutProps) {
    const [showUpdatesPanel, setShowUpdatesPanel] = useState(false);
    const [style, setStyle] = useState({
        gridAdjustment: 'grid-cols-[1fr_3fr]'
    });
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);

    //design link-https://www.figma.com/proto/Meo91HH1tOJwcY9WA2U5qW/CRM-UI-Kit-for-SaaS-Dashboards--Community-?node-id=9071-3607&p=f&t=D8s6MTugQDaVC1Os-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1664
    const handleMenuToggle = () => {
        setShowUpdatesPanel((prev) => !prev);
        setStyle((prev) => {
            if (showUpdatesPanel) {
                return {
                    ...prev,
                    gridAdjustment: 'grid-cols-[1fr_3fr] translate-x-0'
                };
            } else {
                return {
                    ...prev,
                    gridAdjustment: 'grid-cols-[4fr] -translate-x-0 border-l border-inset border-gray-200'
                };
            }
        });
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;
        const scTop = e?.currentTarget?.scrollTop ?? scrollRef.current.scrollTop ?? 0;
        console.log("Scroll position:", scTop);
        setScrolled(scTop > 0);
    };

    useEffect(() => {
        console.log("AppLayout mounted", scrolled);
    }, [scrolled]);

    return (
        <div className={twMerge("h-screen grid grid-cols-[1fr_4fr] grid-flow-col ")}>
            <Sidebar items={[]} onSelect={() => { }} defaultOpen />
            <div className={twMerge("grid w-[calc(100vw-4rem)] transition-all duration-500 ml-[4rem] border-l border-inset border-gray-200", style.gridAdjustment)}>
                <div className={twMerge("flex flex-col gap-12 p-8 min-h-0 overflow-y-scroll", showUpdatesPanel ? "hidden" : "")}>
                    <WelcomeCard />
                    {showMessagePanel && <Messages />}
                    {showLatestUpdatesPanel && <LatestUpdates />}
                    {showEventsPanel && <Events />}
                    {showConversionHistory && <ConversionHistory />}
                </div>

                <main className="flex flex-col gap-6 min-w-0 p-6 pt-0 bg-primary-lightest">
                    <div className={twMerge("sticky flex flex-row justify-between pt-6 top-0 bg-primary-lightest transition-shadow duration-600", scrolled ? "shadow-lg shadow-gray-300" : "shadow-none")}>
                        <div className="flex flex-row gap-4">
                            <span className="" onClick={handleMenuToggle}>
                                <Icon svgClass="bg-secondary rounded" name="menu" size={5} withwrapper={true} />
                            </span>
                            <h1 className="text-2xl font-semibold"> 
                                <Head title={pageTitle} />
                            </h1>
                        </div>
                        <div className="flex flex-row gap-4">
                            <Icon svgClass="bg-secondary rounded" name="search" size={5} withwrapper={true} />
                            <Icon svgClass="bg-secondary rounded" name="add" size={5} withwrapper={true} />
                        </div>
                    </div>
                    <div className="overflow-y-scroll flex-1 min-h-0 max-h-full" ref={scrollRef} onScroll={(e) => handleScroll(e)}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}