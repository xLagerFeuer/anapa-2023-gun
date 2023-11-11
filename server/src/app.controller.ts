import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {EventService} from "./events/event.service";
import {EventDto} from "./events/event.dto";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly eventService: EventService) {
    }

    @Post("test")
    getHello(@Body("event") event: EventDto) {
        this.eventService.createEvent(event)
    }
}
