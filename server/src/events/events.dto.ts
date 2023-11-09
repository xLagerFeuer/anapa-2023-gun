import {Prop} from "@nestjs/mongoose";

export class EventsDto {
    imageUrl: string

    alerts: {
        weapon: boolean,
        weapon_pose: boolean
    }

    alert_level: string
    time: string
}