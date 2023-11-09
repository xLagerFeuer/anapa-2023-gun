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