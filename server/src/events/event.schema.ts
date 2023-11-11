import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {AlertLevelEnum} from "./event.dto";

export type EventDocument = HydratedDocument<Event>
@Schema()
export class Event {
    @Prop({ required: true })
    image_str: string;

    @Prop({ required: true })
    datetime: Date;

    @Prop({ required: true })
    weapon: boolean;

    @Prop({ required: true })
    weapon_pose: boolean;

    @Prop({default: null})
    isConfirmed: boolean | null;

    @Prop({ required: true, enum: AlertLevelEnum })
    level_alert: AlertLevelEnum;
}
export const EventSchema = SchemaFactory.createForClass(Event)