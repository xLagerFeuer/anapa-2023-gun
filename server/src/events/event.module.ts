import {Module} from '@nestjs/common';
import {EventService} from './event.service';
import {MongooseModule} from "@nestjs/mongoose";
import {EventSchema} from "./event.schema";
import { EventController } from './event.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: Event.name, schema: EventSchema}])],
    providers: [EventService],
    controllers: [EventController],
    exports: [EventService]
})
export class EventModule {
}
