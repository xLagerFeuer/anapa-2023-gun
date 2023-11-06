import { Module } from '@nestjs/common';
import { RtspController } from './rtsp.controller';
import { RtspService } from './rtsp.service';

@Module({
  controllers: [RtspController],
  providers: [RtspService]
})
export class RtspModule {}
