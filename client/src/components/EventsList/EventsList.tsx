import {IEventList} from "@/types";
import EventItem from "./EventItem/EventItem.tsx";

const EventsList = ({events} : IEventList) => {
    return (
        <ul className="flex flex-col gap-4">
            {events.map((item) => (
                <li key={item._id}>
                    <EventItem {...item}/>
                </li>
            ))}
            
        </ul>
    );
};

export default EventsList;