import {DarkThemeToggle} from "flowbite-react";
import {SortingButton} from "@/components";
import {EventLogTypeEnum, SortingTypesEnum} from "@/types";
import {useState} from "react";
import StreamModal from "@components/Toolsbar/StreamModal/StreamModal.tsx";
import VideoModal from "@components/Toolsbar/VideoModal/VideoModal.tsx";

export const Toolsbar = (
    {
        type,
        sortingType,
        setSortingType,
    }: {
        type: EventLogTypeEnum,
        sortingType: SortingTypesEnum,
        setSortingType: (b: string) => void
    }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className="flex flex-grow-0 h-[50px] bg-white dark:bg-bg-primary items-center px-10 py-2 gap-4">
            <button
                onClick={() => setIsOpen(prevState => !prevState)}
                className="px-10 rounded-md transition duration-300 py-1.5 text-white bg-primary-dark
                hover:bg-primary-light
                active:bg-primary-dark
                outline-white">
                Тест
            </button>
            {type === EventLogTypeEnum.STREAM
                ?
                <StreamModal isOpen={isOpen} setIsOpen={setIsOpen}/>
                :
                <VideoModal isOpen={isOpen} setIsOpen={setIsOpen}/>
            }
            <SortingButton sortingType={sortingType} setSortingType={setSortingType}/>
        </div>
    );
};

