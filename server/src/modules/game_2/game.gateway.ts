import {WebSocketGateway} from '@nestjs/websockets/utils/socket-gateway.decorator';
import {OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketServer} from '@nestjs/websockets';
import {Player} from './player';


@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;

    players: Map<string, Player> = new Map();

    async handleConnection(socket: SocketIO.Socket) {
        //
    }

    async handleDisconnect(socket: SocketIO.Socket) {
        //
    }


    private allPlayers(): string {
        return JSON.stringify(Array.from((this.players)));
    }

    private fromMap(player: Player): string {
        return JSON.stringify(player);
    }

    private randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}
