import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeService implements OnApplicationBootstrap {
  private basicURL: string = 'https://api.mexc.com';
  private symbols: string[];

  constructor(private readonly httpService: HttpService) {}

  async onApplicationBootstrap(): Promise<void> {
    this.symbols = await this.getSymbols();
  }

  public isSymbolExists(symbol: string): boolean {
    return this.symbols.includes(symbol);
  }

  private async getSymbols(): Promise<Array<string>> {
    const url = '/api/v3/defaultSymbols';

    const [err, response] = await this.makeGetRequest<string[]>(url);

    if (err) throw new Error(`Getting default symbols error:\n${err}`);

    return response;
  }

  private async makeGetRequest<T>(url: string): Promise<[AxiosError, T]> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(this.basicURL + url),
      );

      return [, response.data.data];
    } catch (err) {
      return [err, null];
    }
  }
}
