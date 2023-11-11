import {Prop} from "@nestjs/mongoose";
export enum AlertLevelEnum {
    WARN = 'warn',
    ALARM = "alarm"
}
export class EventDto {
    image_str: string
    datetime: Date
    weapon: boolean
    weapon_pose: boolean
    level_alert: AlertLevelEnum
    isConfirmed: boolean | null
}