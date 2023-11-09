import {Link, useLocation} from "react-router-dom";
import cn from "classnames"
import {useEffect} from "react";

export const Navbar = () => {
    const location = useLocation()
    useEffect(() => {
        console.log(location)
    }, [])
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
        <nav>
            <ul className="flex flex-grow-0 h-[56px] bg-bg-navbar flex-row shadow-md px-10">
                {links.map((item, i) => (
                    <li key={i} className="py-4">
                        <Link
                            className={cn("py-4 px-5 text-white", {
                                ["bg-bg-tab"]: location.pathname === item.value
                            })}
                            to={item.value}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

