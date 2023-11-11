// EVENT LOG


export enum EventLogTypeEnum {
    STREAM = 'stream',
    VIDEO = "video"
}
export interface IEventLogProps {
    label: string
    type: EventLogTypeEnum
}

// SORTING TYPES
export enum SortingTypesEnum {
    GRIDMAX = '3',
    GRIDLIST = '1',
    GRIDHALF = '2',
}

export enum AlertLevelEnum {
    WARN = 'warn',
    ALARM = "alarm"
}
export interface IEventItem {
    _id: string
    image_str: string
    datetime: Date
    weapon: boolean
    weapon_pose: boolean
    level_alert: AlertLevelEnum
}
export interface IEventList {
    events: IEventItem[]
}