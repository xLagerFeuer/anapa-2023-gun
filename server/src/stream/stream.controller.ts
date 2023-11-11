import {Body, Controller, Post} from '@nestjs/common';
import {StreamDto} from "./stream.dto";
import {StreamService} from "./stream.service";

@Controller('stream')
export class StreamController {
    constructor(
        private readonly streamService: StreamService) {
    }
    @Post("/new")
    async setNewStreams(@Body() body: StreamDto) {
        return await this.streamService.setNewStreams(body)
    }
}
