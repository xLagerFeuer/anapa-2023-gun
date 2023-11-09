import {EventLogList, Toolsbar} from "@/components";
import {EventLogTypeEnum, SortingTypesEnum} from "@/types";
import {useEffect, useState} from "react";
import cn from "classnames";

const StreamPage = () => {
    const [sortingType, setSortingType] = useState<SortingTypesEnum | string | null>(localStorage.getItem("sortingType"))
    useEffect(() => {
        if (localStorage.getItem("sortingType")) return
        localStorage.setItem("sortingType", SortingTypesEnum.GRIDMAX)
    }, [])

    return (
        <>
            {/*@ts-ignore*/}
            <Toolsbar sortingType={sortingType} setSortingType={setSortingType} type={EventLogTypeEnum.STREAM}/>
            <div className="flex flex-row h-[calc(100vh-106px)] items-end pr-72 bg-bg-primary flex-grow">
                <div className={cn(`flex-1 h-full grid p-8 gap-4`, {
                    ["grid-cols-3"] : sortingType === SortingTypesEnum.GRIDMAX,
                    ["grid-cols-2"] : sortingType === SortingTypesEnum.GRIDHALF,
                    ["grid-cols-1"] : sortingType === SortingTypesEnum.GRIDLIST,
                })}>
                    <div className="border border-black">124</div>
                    <div className="border border-black">124</div>
                    <div className="border border-black">124</div>
                    <div className="border border-black">124</div>
                    <div className="border border-black">124</div>
                    <div className="border border-black">124</div>
                </div>
                <EventLogList label={"Журнал событий"} type={EventLogTypeEnum.VIDEO}/>
            </div>
        </>

    );
};

export default StreamPage;