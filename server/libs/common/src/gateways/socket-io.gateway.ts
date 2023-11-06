import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketIoGateway {
    @WebSocketServer() server: Server;

    handleStreamFrame(frameData: any) {

        // Отправьте кадр видеопотока на фронтенд через WebSocket
        this.server.emit('videoFrame', frameData);
    }
}
