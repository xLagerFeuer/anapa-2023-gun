import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {RtspServer} from "node-rtsp-stream";

const rtspServer = new RtspServer({
    serverPort: 554, // Порт RTSP-сервера
    clientPort: 5554, // Порт клиента (может быть любым)
    width: 640, // Ширина видеопотока
    height: 480, // Высота видеопотока
    fps: 30, // Количество кадров в секунду
    motion: false, // Детекция движения
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    rtspServer.start();
}

bootstrap();
