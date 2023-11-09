import {MdViewCompact} from "react-icons/md";
import {HiOutlineViewGrid, HiViewList} from "react-icons/hi";
import {CgBorderAll} from "react-icons/cg";
import {SortingTypesEnum} from "@/types";
import cn from "classnames"
import {BsFillGrid3X3GapFill, BsFillGridFill, BsSquare, BsSquareFill} from "react-icons/bs";
import {BiMinusFront} from "react-icons/bi";

export const SortingButton = ({setSortingType, sortingType}: {
    setSortingType: (b: string) => void,
    sortingType: SortingTypesEnum
}) => {

    const handleSorting = (type: SortingTypesEnum) => {
        localStorage.setItem("sortingType", type)
        setSortingType(type)
    }
    return (
        <div className="flex flex-row items-center gap-4">
            <BsFillGrid3X3GapFill onClick={() => handleSorting(SortingTypesEnum.GRIDMAX)}
                           className={cn("text-3xl text-gray-500 cursor-pointer transition duration-300 hover:text-gray-600", {
                               ["text-red-600 hover:text-red-700"]: sortingType === SortingTypesEnum.GRIDMAX
                           })}/>
            <HiViewList onClick={() => handleSorting(SortingTypesEnum.GRIDLIST)}
                        className={cn("text-4xl text-gray-500 cursor-pointer transition duration-300 hover:text-gray-600", {
                            ["text-red-600 hover:text-red-700"]: sortingType === SortingTypesEnum.GRIDLIST
                        })}/>
            <BsFillGridFill onClick={() => handleSorting(SortingTypesEnum.GRIDHALF)}
                               className={cn("text-3xl text-gray-500 cursor-pointer transition duration-300 hover:text-gray-600", {
                                   ["text-red-600 hover:text-red-700"]: sortingType === SortingTypesEnum.GRIDHALF
                               })}/>
            <BiMinusFront className="text-4xl text-gray-500 cursor-pointer transition duration-300 hover:text-gray-600"/>
        </div>
    );
};

