import EventsList from "@components/EventsList/EventsList.tsx";
import {Spinner, Tabs} from "flowbite-react";
import {useState} from "react";
import cn from "classnames";

const EventsPage = ({data}) => {
    const [currentTab, setCurrentTab] = useState(1)
    if (data) {
        return (

            <div className="flex flex-col">
                <div className="flex gap-1 px-10 bg-gray-100 dark:bg-bg-tab">
                    <button
                        onClick={() => setCurrentTab(1)}
                        className={cn("border-b-2 py-2 px-4 text-black bg-gray-100 transition duration-300 dark:bg-bg-tab dark:hover:bg-bg-primary dark:border-white dark:text-white  hover:bg-gray-200 border-black", {
                            ["bg-gray-300 dark:bg-neutral-800"]: currentTab === 1
                        })}>Активные
                    </button>
                    <button
                        onClick={() => setCurrentTab(2)}
                        className={cn("border-b-2 py-2 px-4 text-black bg-gray-100 transition duration-300 dark:bg-bg-tab dark:hover:bg-bg-primary dark:border-white dark:text-white  hover:bg-gray-200 border-black", {
                            ["bg-gray-300 dark:bg-neutral-800"]: currentTab === 2
                        })}>В архиве
                    </button>
                </div>
                {currentTab === 1
                    ? <div className="px-10 py-4 bg-white dark:bg-bg-primary min-h-[calc(100vh-56px)]">
                        <EventsList events={data}/>
                    </div>
                    : currentTab === 2
                        ? <div className="px-10 py-4 bg-white dark:bg-bg-primary min-h-[calc(100vh-56px)]">some</div>
                        : null
                }
            </div>
        );
    } else {
        return (
            <div className="bg-white dark:bg-bg-primary flex items-center justify-center">
                <Spinner/>
            </div>
        )
    }
};

export default EventsPage;