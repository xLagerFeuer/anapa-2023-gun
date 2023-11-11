import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {EventDto} from "./event.dto";
import {EventUpdateDto} from "./event.update.dto";

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {
    }
    async createEvent(dto: EventDto) : Promise<Event> {
        const event = await this.eventModel.create(dto)
        return event.save()
    }
    async findAllEvents() : Promise<Event[]> {
        return this.eventModel.find().exec()
    }


    async findEventById(id: string) : Promise<Event> {
        const event = await this.eventModel.findById(id)
        return event;
    }

    async setConfirm(body: EventUpdateDto) {
        return this.eventModel.findByIdAndUpdate(body.id, {
            isConfirmed: body.status
        });
    }
}
