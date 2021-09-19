
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';


@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');
    private client: Socket

    @SubscribeMessage('msgToServer')
    async handleMessage(@MessageBody() data: { payload: string, room: any, }) {
        this.server.to(data.room).emit('msgToClient', data.payload);
    }

    @SubscribeMessage('socketConnection')
    handleSocketConnection(@ConnectedSocket() client: Socket) {
        this.client = client
    }


    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() room: any) {
        this.client.join(room)
        console.log(this.client.id + "joined room " + room)
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@MessageBody() room: any) {
        this.client.leave(room)
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}