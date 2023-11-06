import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RtspModule } from './rtsp/rtsp.module';

@Module({
  imports: [RtspModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
