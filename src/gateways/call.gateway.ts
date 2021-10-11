import { Logger, ValidationPipe } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  MessageBody,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

const options = {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://digi-surv-ui.vercel.app',
      'http://ff42-2401-4900-230b-e255-25d9-f724-63a0-6f32.ngrok.io',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
};

@WebSocketGateway(options)
export class CallGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(CallGateway.name);

  @WebSocketServer()
  server: Server;

  private users = {};

  async handleConnection(socket: Socket) {
    const url = new URL(`http:/${socket.request.url}`);
    const id = url.searchParams.get('id');
    console.log(id);
    // const id = Math.floor(Math.random() * 10000);
    this.users[id] = socket.id;
    console.log(this.users);
    this.logger.log(`New Socket >> user: ${id} , socket ${socket.id}`);
  }

  async handleDisconnect(socket: Socket) {
    this.logger.log(`Socket Disconnect >> ${socket.id}`);
    console.log(this.users);
    for (const f in this.users) {
      if (this.users.hasOwnProperty(f) && this.users[f] === socket.id) {
        delete this.users[f];
      }
    }
  }

  @SubscribeMessage('call.user')
  callUser(@MessageBody(ValidationPipe) data: any) {
    this.logger.log(`Call User Event `);
    this.logger.log(`Sharing SDP: `);
    this.server
      .to(this.users[data.user_to_call])
      .emit('user.calling', { signal: data.signal, from: data.from });
  }

  @SubscribeMessage('answer.call')
  answerCall(@MessageBody(ValidationPipe) data: any) {
    this.logger.log(`Answer Call Event `);
    this.logger.log(`Sharing SDP`);
    this.server
      .to(this.users[data.to])
      .emit('call.accepted', { signal: data.signal });
  }

  // @SubscribeMessage('reject.call')
  // rejectCall(@MessageBody(ValidationPipe) data: any) {
  //   this.logger.log(`Reject Call Event Event `);
  //   this.logger.log(`Emitting Call Rejected Event`);
  //   // this.server.to(this.users[data.to]).emit('call.rejected', {from: data.from})
  // }

  // @SubscribeMessage('cancel.call')
  // cancelCall(@MessageBody(ValidationPipe) data: any) {
  //   this.logger.log(`Cancel Call Event  `);
  //   this.logger.log(`Emitting Call Cancelled Event`);
  //   // this.server.to(this.users[data.to]).emit('call.cancelled', {from: data.from})
  // }

  // @SubscribeMessage('end.call')
  // endCall(@MessageBody(ValidationPipe) data: any) {
  //   this.logger.log(`End Call Event `);
  //   this.logger.log(`Emitting Call Ended Event`);
  //   // this.server.to(this.users[data.to]).emit('call.ended', {from: data.from})
  // }
}
