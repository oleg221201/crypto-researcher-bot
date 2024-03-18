import { Controller, Get } from '@nestjs/common';
import { SocketClient } from '../socket/socket.client';

@Controller('client')
export class ExchangeController {
  constructor(private readonly socketClient: SocketClient) {}

  @Get('start')
  start() {
    this.socketClient.start();
  }

  @Get('destroy')
  destroy() {
    this.socketClient.destroy();
  }
}
