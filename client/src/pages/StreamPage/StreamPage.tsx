import {EventLogList, Toolsbar} from "@/components";
import {EventLogTypeEnum, SortingTypesEnum} from "@/types";
import {useEffect, useState} from "react";
import cn from "classnames";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import {useAppSelector} from "@/store";

const StreamPage = () => {
    const [sortingType, setSortingType] = useState<SortingTypesEnum | string | null>(localStorage.getItem("sortingType"))
    const success = useAppSelector(state => state.stream.isSuccess)
    useEffect(() => {
        if (success) {
            var firstPlayer = new JSMpeg.VideoElement("#video-canvas-first", "ws://localhost:3001/", {
                autoplay: true,
            });
            // var secondPlayer = new JSMpeg.VideoElement("#video-canvas-second", "ws://localhost:3002/", {
            //     autoplay: true,
            // });
            // var thirdPlayer = new JSMpeg.VideoElement("#video-canvas-third", "ws://localhost:3003/", {
            //     autoplay: true,
            // });
        }
    });

    useEffect(() => {
        if (localStorage.getItem("sortingType")) return
        localStorage.setItem("sortingType", SortingTypesEnum.GRIDMAX)
    }, [])


    return (
        <>
            {/*@ts-ignore*/}
            {/*<Toolsbar sortingType={sortingType} setSortingType={setSortingType} type={EventLogTypeEnum.STREAM}/>*/}
            <div className="flex flex-row h-[calc(100vh-56px)] items-end bg-white dark:bg-bg-primary flex-grow">
                <div className={cn(`flex-1 h-full grid p-8 gap-4`, {
                    ["grid-cols-3"]: sortingType === SortingTypesEnum.GRIDMAX,
                    ["grid-cols-2"]: sortingType === SortingTypesEnum.GRIDHALF,
                    ["grid-cols-1"]: sortingType === SortingTypesEnum.GRIDLIST,
                })}>
                    <div id="video-canvas-first" className="canvas"></div>
                    {/*<div id="video-canvas-second" style={{height: "480px", width: "640px"}}></div>*/}
                    {/*<div id="video-canvas-third" style={{height: "480px", width: "640px"}}></div>*/}

                </div>
                <EventLogList label={"Журнал событий"} type={EventLogTypeEnum.VIDEO}/>
            </div>
        </>

    );
};

export default StreamPage;