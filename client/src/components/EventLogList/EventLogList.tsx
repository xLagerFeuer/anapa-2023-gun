import {IEventLogProps} from "@/types";
import {useState} from "react";
import cn from "classnames";
import EventLogItem from "./EventLogItem/EventLogItem.tsx";
import {IoIosArrowUp} from "react-icons/io";

export const EventLogList = ({label}: IEventLogProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const obj = [
        {
            img: "none",
            text: "text 1"
        },
        {
            img: "none",
            text: "text 2"
        },
        {
            img: "none",
            text: "text 1"
        },
        {
            img: "none",
            text: "text 2"
        },
        {
            img: "none",
            text: "text 1"
        },
        {
            img: "none",
            text: "text 2"
        },

    ]
    return (
        <div className={cn(
            "flex flex-col absolute bottom-0 right-0",
            {}
        )}>
            <div
                className="rounded-none w-full py-2 px-4 min-w-[300px]
                 flex flex-row items-center justify-between text-white bg-gray-700 hover:bg-gray-600
                 cursor-pointer
                 "
                onClick={() => setIsOpen(prevState => !prevState)}
            >
                <p>
                    {label}
                </p>
                <IoIosArrowUp className={cn({
                    ["rotate-180"]: isOpen
                })}/>
            </div>
            <div
                className={cn(
                    "bg-gray-400 p-2 transition min-h-[50vh]",
                    {
                        ["block"]: isOpen,
                        ["hidden"]: !isOpen
                    })}
            >
                {obj.map((item, i) => (
                    <EventLogItem key={i} imgLink={item.img} text={item.text}/>
                ))}
            </div>
        </div>
    );
};

