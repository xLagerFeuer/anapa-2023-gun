import {Link, useLocation} from "react-router-dom";
import cn from "classnames"
import {useEffect} from "react";
import {Badge, DarkThemeToggle} from "flowbite-react";

export const Navbar = ({count}: { count: number }) => {
    const location = useLocation()
    const links = [
        {
            label: "Видео",
            value: "/"
        },
        {
            label: "Стрим",
            value: "/stream"
        },
        {
            label: "События",
            value: "/events"
        }
    ]
    return (
        <nav className="flex flex-grow-0 items-center justify-between bg-neutral-300 dark:bg-bg-navbar flex-row shadow-md px-10">
            <ul className="flex flex-grow-0">
                {links.map((item, i) => (
                    <li key={i} className="py-4 relative z-10">
                        <Link
                            className={cn("pb-4 pt-5 px-5 text-black dark:text-white", {
                                ["bg-neutral-400 dark:bg-bg-tab"]: location.pathname === item.value
                            })}
                            to={item.value}>{item.label}</Link>
                        {item.value === "/events" &&
                            <Badge className="absolute z-20 top-0 right-0" color="failure">{count}</Badge>
                        }
                    </li>
                ))}
            </ul>
            <DarkThemeToggle/>
        </nav>
    );
};

