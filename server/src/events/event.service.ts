import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {EventsDto} from "./events.dto";

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {
    }
    async createEvent(dto: EventsDto) : Promise<Event> {
        const event = await this.eventModel.create(dto)
        return event.save()
    }

    async findAllEvents() : Promise<Event[]> {
        return this.eventModel.find().exec()
    }
}
