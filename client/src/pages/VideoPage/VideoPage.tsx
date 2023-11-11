import {EventLogList, Toolsbar} from "@/components";
import {EventLogTypeEnum, SortingTypesEnum} from "@/types";
import {FormEvent, useEffect, useState} from "react";
import cn from "classnames"
import {Button, FileInput, Spinner} from "flowbite-react";
import {useUploadFileMutation} from "@/store/services/videoApi.ts";

const VideoPage = () => {
    const [sortingType, setSortingType] = useState<SortingTypesEnum | string | null>(localStorage.getItem("sortingType"))
    useEffect(() => {
        if (localStorage.getItem("sortingType")) return
        localStorage.setItem("sortingType", SortingTypesEnum.GRIDMAX)
    }, [])

    const [mutate, {data}] = useUploadFileMutation();
    const [video, setVideo] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsSuccess(true);
            }, 3000);
        }
    }, [isLoading]);

    const handleFileChange = (event: FormEvent) => {
        event.preventDefault();
        // @ts-ignore
        const formData = new FormData(event.target);
        // @ts-ignore
        setVideo(formData.get("file"));
        uploadFile(formData);
    };

    const handleOpenModal = () => {
        // Reset the state when the modal is opened
        setVideo(null);
        setIsSuccess(false);
        setIsLoading(false);
        setShowForm(true);
    };

    const uploadFile = (data: FormData) => {
        mutate(data);
        setIsLoading(true);
        setShowForm(false); // Hide the form while loading
    };

    const handleVideoEnd = () => {
        // Callback when the video ends
        setIsSuccess(false);
        setIsLoading(false); // Reset loading state
        setShowForm(true); // Show the form again
    };

    return (
        <>
            {/*@ts-ignore*/}
            {/*<Toolsbar sortingType={sortingType} setSortingType={setSortingType} type={EventLogTypeEnum.VIDEO}/>*/}
            <div className="h-[calc(100vh-56px)] bg-white dark:bg-bg-primary">
                <div className={cn(`flex items-center justify-center h-full p-8 gap-4  `)}>
                    {isSuccess && (
                        <div onClick={handleVideoEnd}>
                            {/*@ts-ignore*/}
                            <video className="h-[80vh]" autoPlay={true} src={URL.createObjectURL(video)} onEnded={handleVideoEnd}></video>
                        </div>
                    )}
                    {isLoading && !isSuccess && (
                        <div className="w-full h-[100vh-56px] flex justify-center items-center">
                            <Spinner/>
                        </div>
                    )}
                    {!isLoading && showForm && (
                       <div className="flex-1 max-w-2xl">
                           <form onSubmit={handleFileChange} className="py-4 flex flex-col gap-8">
                               <FileInput accept="video/mp4, video/mkv" name="file" multiple={true}/>
                               <button
                                   className="px-10 rounded-md transition duration-300 py-1.5 text-white bg-primary-dark
                                hover:bg-gray-600
                                active:bg-primary-dark
                                outline-white" type="submit">
                                   Загрузить
                               </button>
                           </form>
                       </div>
                    )}
                </div>

                <EventLogList label={"Журнал событий"} type={EventLogTypeEnum.VIDEO}/>
            </div>
        </>

    );
};

export default VideoPage;