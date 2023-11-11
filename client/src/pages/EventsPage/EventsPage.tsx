import EventsList from "@components/EventsList/EventsList.tsx";
import {Spinner, Tabs} from "flowbite-react";

const EventsPage = ({data}) => {
    console.log(data)
    if (data) {
        return (
            <Tabs.Group className="text-white" aria-label="Tabs with underline" style="underline">
                <Tabs.Item active className="text-white" title="Profile">
                    <EventsList events={data}/>
                </Tabs.Item>
                <Tabs.Item title="Dashboard">
                    This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps
                    classes to
                    control the content visibility and styling.
                </Tabs.Item>
            </Tabs.Group>
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