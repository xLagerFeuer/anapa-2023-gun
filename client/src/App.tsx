import {Route, Routes} from "react-router-dom";
import VideoPage from "@/pages/VideoPage/VideoPage.tsx";
import StreamPage from "@/pages/StreamPage/StreamPage.tsx";
import {Navbar} from "@/components";
import EventsPage from "@/pages/EventsPage/EventsPage.tsx";
import {useEffect, useState} from "react";
import {useGetAllEventsQuery} from "@/store/services/eventsApi.ts";
function App() {
    const [notificationCount, setNotificationCount] = useState<number>(0)
    const { data, error, isLoading, refetch } = useGetAllEventsQuery({
        staleTime: 10000, // Set the staleTime to 10 seconds
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Trigger a background re-fetch every 10 seconds
            refetch();
        }, 10000);

        // Clear the interval when the component is unmounted
        return () => {
            clearInterval(intervalId);
        };
    }, [refetch]);


    useEffect(() => {
        if (data) {
            let count = 0
            data.forEach((item, i) => {
                if (item.isConfirmed === null) {
                    count += 1;
                }
            })
            setNotificationCount(count)
        }
    }, [data, refetch])
    return (
        <>
            <Navbar count={notificationCount}/>
            <Routes>
                <Route
                    path="/"
                    element={<VideoPage/>}/>
                <Route
                    path="/stream"
                    element={<StreamPage/>}/>
                <Route
                    path="/events"
                    element={<EventsPage data={data}/>}
                />
            </Routes>
        </>

    );
}

export default App;
