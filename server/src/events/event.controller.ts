import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {EventDto} from "./event.dto";
import {EventService} from "./event.service";
import {EventUpdateDto} from "./event.update.dto";

@Controller('event')
export class EventController {
    constructor(
        private readonly eventService: EventService
    ) {
    }
    @Post("new")
    async createNewEvent(@Body() dto: EventDto) {
        return await this.eventService.createEvent(dto)
    }

    @Get("all")
    async getAllEvents() {
        return await this.eventService.findAllEvents()
    }

    @Get(":id")
    async getEventById(@Param("id") id: string) {
        return await this.eventService.findEventById(id)
    }

    @Post('confirm')
    async setConfirm(@Body() body: EventUpdateDto) {
        return await this.eventService.setConfirm(body)
    }
}
