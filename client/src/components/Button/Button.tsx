import cn from "classnames"
import {ButtonSizeEnum, ButtonTargetEnum, IButtonProps} from "@/types";
import {twMerge} from "tailwind-merge";


const Button = (
    {
        target,
        size,
        border,
        disabled,
        className,
        children,
        ...props
    }: IButtonProps) => {
    return (
        <button disabled={disabled} {...props} className={cn(
            twMerge(
                "block transition duration-300 shadow",
                className,
            ),
            {
                // BORDER
                ["border"]: border,
                ["border-0"]: !border,

                // SIZES
                ["text-md px-4 py-1.5 rounded-lg"]: size === ButtonSizeEnum.SM,
                ["text-xl px-6 py-2 rounded-xl"]: size === ButtonSizeEnum.MD,
                ["text-2xl px-8 py-2.5 rounded-2xl"]: size === ButtonSizeEnum.LG,

                // COLORING
                ["text-white bg-primary-base hover:bg-primary-light border-white"]: target === ButtonTargetEnum.PRIMARY,
                [""]: target === ButtonTargetEnum.SECONDARY,


                ["cursor-not-allowed bg-gray-400 hover:bg-gray-400"]: disabled,
                ["cursor-pointer"]: !disabled
            })}>
            {children}
        </button>
    );
};

export default Button;