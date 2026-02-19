import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import Dot from "./Dot";
import { getFirstChar } from "../Helpers/utilities";
import { route } from "ziggy-js";
import { Link, usePage, router } from "@inertiajs/react";
import { PageProps } from "../interfaces/PageProps";

interface SidebarProps {
    items: Array<{
        id: string;
        label: string;
        href: string;
    }>;
    defaultOpen: boolean;
    onSelect: (item: { id: string; label: string; href: string }) => void;
}

type menuItem = {
    id: string;
    label: string;
    icon: string;
    badgeColor?: string;
    href: string;
};

const menuItems: menuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "graph", badgeColor: "bg-warning", href: route('dashboard') },
    { id: "business", label: "Business", icon: "briefcase", badgeColor: "bg-primary", href: route('business') },
    { id: "tasks", label: "Tasks", icon: "task", badgeColor: "bg-success", href: route('tasks') },
    { id: "notes", label: "Notes", icon: "note", href: route('notes') },
    { id: "calendar", label: "Calendar", icon: "calendar", badgeColor: "bg-warning", href: route('calendar') },
    { id: "messages", label: "Messages", icon: "chat", badgeColor: "bg-primary", href: route('messages') },
    { id: "files", label: "Files", icon: "file", badgeColor: "bg-success", href: route('files') },
    { id: "help", label: "Help", icon: "help", href: route('help') },
];
function Sidebar(
    {
        items = menuItems,
        defaultOpen = true,
        onSelect = () => { }
    }: SidebarProps) {

    const { user } = usePage<PageProps & Record<string, any>>().props;

    return (
        <aside className={twMerge("fixed h-screen overflow-hidden w-16 p-4 bg-white flex flex-col gap-4 justify-between")} aria-label="Sidebar navigation">
            <div>
                <div className={twMerge("flex items-center justify-center")}>
                    <h2 className="bg-primary rounded-full h-10 font-semibold p-4 flex items-center justify-center text-white cursor-pointer" onClick={() => router.visit(route('dashboard'))}>
                        {getFirstChar(user.fullname)}
                    </h2>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center mt-6">
                    <nav role="navigation" aria-label="Main">
                        <ul className={twMerge('list-none grid gap-4')} >
                            {
                                menuItems.map((item) => {
                                    const isActive = String(item.href).endsWith(usePage().url);
                                    return (
                                        <li key={item.id} className={twMerge(`hover:bg-primary-light rounded p-2  ${isActive ? 'bg-primary-light rounded p-2' : ''}`)}>
                                            {item.badgeColor && <Dot color={twMerge(item.badgeColor)} />}
                                            <Link href={item.href} className="">
                                                <Icon name={item.icon} size={8} withwrapper={false} />
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </div>

            <div className={twMerge("flex flex-col items-center justify-center bottom-0")}>
                <a href={route('logout')} className="flex items-center gap-2">
                    <span className="text-sm">Logout</span>
                </a>
                <a href={route('admin.signup')} className="flex items-center gap-2">
                    {/* User image */}
                    <span className="text-sm">Profile</span>
                </a>
            </div>
        </aside>
    );
}

export default Sidebar;