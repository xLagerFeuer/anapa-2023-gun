import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";


// BUTTON
export enum ButtonTargetEnum {
    PRIMARY = "primary",
    SECONDARY = "secondary"
}

export enum ButtonSizeEnum {
    SM = "sm",
    MD = "md",
    LG = "lg"
}

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    target: ButtonTargetEnum
    border: boolean
    size: ButtonSizeEnum
    disabled: boolean
    children: ReactNode
}


