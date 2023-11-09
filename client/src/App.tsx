// import {FormEvent, useState} from "react";
// import {Button, FileInput, Label, Modal} from "flowbite-react";
// import Select from "react-select";
// import {useUploadFileMutation} from "@/store/services/videoApi.ts";

import {Route, Routes} from "react-router-dom";
import VideoPage from "@/pages/VideoPage/VideoPage.tsx";
import StreamPage from "@/pages/StreamPage/StreamPage.tsx";
import {Navbar} from "@/components";
import EventsPage from "@/pages/EventsPage/EventsPage.tsx";

function App() {
    // const handleChange = (value: string) => {
    //     console.log(value);
    // };


    // const options = [
    //     {value: "chocolate", label: "Chocolate"},
    //     {value: "strawberry", label: "Strawberry"},
    //     {value: "vanilla", label: "Vanilla"},
    // ];

    return (
        // <div className="">
        //     <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
        //     <Select
        //         options={options}
        //         placeholder="Выберите"
        //         defaultValue={selectedOption}
        //         onChange={handleChange}
        //     />
        <>

            <Navbar/>
            <Routes>
                <Route path="/" element={<VideoPage/>}/>
                <Route path="/stream" element={<StreamPage/>}/>
                <Route path="/events" element={<EventsPage/>}/>
            </Routes>
        </>

    );
}

export default App;
