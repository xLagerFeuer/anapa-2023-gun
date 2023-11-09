import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GatewayModule} from "./gateway/gateway.module";
import {VideoModule} from './video/video.module';
import {StreamModule} from './stream/stream.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { EventModule } from './events/event.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                uri: `mongodb+srv://${config.get("DB_USERNAME")}:${config.get("DB_PASSWORD")}@cluster0.uxj10ek.mongodb.net/?retryWrites=true&w=majority`
            }),
            inject: [ConfigService]
        }),
        GatewayModule,
        VideoModule,
        StreamModule,
        EventModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
