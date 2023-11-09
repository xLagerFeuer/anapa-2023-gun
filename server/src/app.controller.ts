import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {EventService} from "./events/event.service";
import {EventsDto} from "./events/events.dto";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly eventService: EventService) {
    }

    @Post("test")
    getHello(@Body("event") event: EventsDto) {
        this.eventService.createEvent(event)
    }
}
