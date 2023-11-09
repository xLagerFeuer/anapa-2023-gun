import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
// import {Gateway} from "../gateway/gateway";
import { VideoController } from './video.controller';
import {GatewayModule} from "../gateway/gateway.module";

@Module({
  imports: [GatewayModule],
  providers: [VideoService],
  exports: [VideoService],
  controllers: [VideoController]
})
export class VideoModule {}
