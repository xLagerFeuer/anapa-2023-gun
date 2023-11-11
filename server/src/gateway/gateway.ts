import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from "socket.io"

@WebSocketGateway()
export class Gateway {
    @WebSocketServer()
    server: Server;
    onModuleInit() {
        this.server.on("connection", (socket) => {
            console.log(socket.id)
            console.log("connected", socket.id)
        })
    }


    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log(body)
    }


    @SubscribeMessage("test")
    onTest(@MessageBody() body: any) {
        this.server.send(body)
    }
}