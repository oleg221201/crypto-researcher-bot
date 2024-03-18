import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExchangeService } from './exchange.service';
import { SocketModule } from '../socket/socket.module';
import { ExchangeController } from './exchange.controller';

@Module({
  imports: [HttpModule, SocketModule],
  providers: [ExchangeService],
  controllers: [ExchangeController],
})
export class ExchangeModule {}
