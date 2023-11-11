import {Link, useLocation} from "react-router-dom";
import cn from "classnames"
import {useEffect, useState} from "react";
import {Badge, DarkThemeToggle} from "flowbite-react";
import {IoIosArrowUp} from "react-icons/io";
import StreamModal from "@components/Toolsbar/StreamModal/StreamModal.tsx";

export const Navbar = ({count}: { count: number }) => {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
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
        <nav
            className="flex flex-grow-0 items-center justify-between bg-neutral-300 dark:bg-bg-navbar flex-row shadow-md px-10">
            <ul className="flex flex-grow-0">
                {links.map((item, i) => (
                    <li key={i} className="relative z-10 flex items-center">
                        {item.value === "/stream"
                            ?
                            <div
                                className={cn("flex cursor-pointer py-4 gap-2 relative items-center px-5 text-black dark:text-white", {
                                    ["bg-neutral-400 dark:bg-bg-tab"]: location.pathname === item.value
                                })}
                                onClick={() => {
                                    setIsOpen(prevState => !prevState)
                                }}
                            >
                                <p>Стрим</p>
                                <IoIosArrowUp className={cn({
                                    ["rotate-180"]: !isOpen
                                })}/>
                                {isOpen &&
                                    <div
                                        className="bg-white dark:bg-bg-navbar border dark:border-gray-400 left-0 w-40 flex flex-col absolute top-16">
                                        <Link className="p-2 dark:hover:bg-bg-tab" to={item.value}>Перейти</Link>
                                        <p onClick={() => setModalOpen(true)} className="p-2 dark:hover:bg-bg-tab">Загрузка ссылок</p>
                                    </div>
                                }
                            </div>
                            :
                            <Link
                                className={cn("px-5 py-4 text-black dark:text-white", {
                                    ["bg-neutral-400 dark:bg-bg-tab"]: location.pathname === item.value
                                })}
                                to={item.value}>{item.label}</Link>
                        }
                        {item.value === "/events" &&
                            <Badge className="absolute z-20 top-0 right-0" color="failure">{count}</Badge>
                        }
                    </li>
                ))}
            </ul>
            <DarkThemeToggle/>
            <StreamModal isOpen={modalOpen} setIsOpen={setModalOpen}/>
        </nav>
    );
};

