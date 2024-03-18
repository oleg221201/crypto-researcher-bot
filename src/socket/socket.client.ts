import { Injectable } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class SocketClient {
  public wsClient: WebSocket;

  private interval: NodeJS.Timeout | undefined;

  start() {
    this.wsClient = new WebSocket('wss://wbs.mexc.com/ws');

    this.wsClient.onopen = this.handleOpen.bind(this);
    this.wsClient.onmessage = this.handleMessage.bind(this);
  }

  destroy() {
    if (this.wsClient) this.wsClient.close();

    if (this.interval) clearInterval(this.interval);

    console.log('Cosed connection to MEXC ws!');
  }

  private handleOpen() {
    console.log('Connected to MEXC ws!');

    if (this.wsClient) {
      this.getKline('BTCUSDT', 'Min1');

      this.interval = setInterval(() => {
        this.ping();
      }, 30_000);
    }
  }

  private async handleMessage(msg: any) {
    const data = JSON.parse(msg.data);
    console.log(data);
  }

  public getKline(symbol: string, interval: string) {
    this.wsClient.send(
      JSON.stringify({
        method: 'SUBSCRIPTION',
        params: [`spot@public.kline.v3.api@${symbol}@${interval}`],
      }),
    );
    setInterval(() => {
      this.ping();
    }, 30 * 1000);
  }

  private ping(): void {
    this.wsClient.send('{"method": "PING"}');
  }
}
