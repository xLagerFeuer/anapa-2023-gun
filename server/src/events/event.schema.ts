import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type EventDocument = HydratedDocument<Event>
@Schema()
export class Event {
    @Prop()
    imageUrl: string

    @Prop({
        type: {
            weapon: Boolean,
            weapon_pose: Boolean,
        },
    })
    alerts: {
        weapon: boolean,
        weapon_pose: boolean
    }

    @Prop()
    alert_level: string

    @Prop()
    time: string
}
export const EventSchema = SchemaFactory.createForClass(Event)