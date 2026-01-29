import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import Dot from "./Dot";
import { getFirstChar } from "../Helpers/utitlies";
import { router } from "../router";

// interface SidebarProps {
//     items: Array<{
//         id: string;
//         label: string;
//         href: string;
//     }>;
//     defaultOpen: boolean;
//     onSelect: (item: { id: string; label: string; href: string }) => void;
// }
const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "graph", badgeColor: "bg-warning", href: "/dashboard" },
    { id: "business", label: "Business", icon: "briefcase", badgeColor: "bg-primary", href: "/business" },
    { id: "tasks", label: "Tasks", icon: "task", badgeColor: "bg-success", href: "/tasks" },
    { id: "notes", label: "Notes", icon: "note", href: "/notes" },
    { id: "calendar", label: "Calendar", icon: "calendar", badgeColor: "bg-warning", href: "/calendar" },
    { id: "messages", label: "Messages", icon: "chat", badgeColor: "bg-primary", href: "/messages" },
    { id: "files", label: "Files", icon: "file", badgeColor: "bg-success", href: "/files" },
    { id: "help", label: "Help", icon: "help", href: "/help" },
];
function Sidebar({ items = null, defaultOpen = true, onSelect = () => { } }) {

    return (
        <aside className={twMerge("fixed h-screen overflow-hidden w-16 p-4 bg-white flex flex-col gap-4 justify-between")} aria-label="Sidebar navigation">
            <div>
                <div className={twMerge("flex items-center justify-center")}>
                    <h2 className="bg-primary rounded-full h-10 font-semibold p-4 flex items-center justify-center text-white cursor-pointer" onClick={() => router.navigate('/')}>
                        {getFirstChar("Logo")}
                    </h2>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center mt-6">
                    <nav role="navigation" aria-label="Main">
                        <ul className={twMerge('list-none grid gap-4')} >
                            {menuItems.map((item) => (
                                <li key={item.id} className="hover:bg-primary-light rounded p-2">
                                    {item.badgeColor && <Dot color={twMerge(item.badgeColor)} />}
                                    <a href={item.href} className="">
                                        <Icon name={item.icon} size={8} withwrapper={false} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className={twMerge("flex items-center justify-center bottom-0")}>
                <a href={'/signup'} className="flex items-center gap-2">
                    {/* User image */}
                    <span className="text-sm">Profile</span>
                </a>
            </div>
        </aside>
    );
}

export default Sidebar;