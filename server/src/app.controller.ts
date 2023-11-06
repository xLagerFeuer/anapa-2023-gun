import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {SocketIoGateway} from "../libs/common/src/gateways/socket-io.gateway";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly socketIoGateway: SocketIoGateway) {}

  @Get()
  getHello() {
  }
}
