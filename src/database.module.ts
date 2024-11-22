import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Module({})
export class DatabaseModule {
  static async connect(appService: ConfigService) {
    const client = new Client({
      user: appService.get<string>('DB_USER'),
      host: appService.get<string>('DB_HOST'),
      database: appService.get<string>('DB_NAME'),
      password: appService.get<string>('DB_PASSWORD'),
      port: appService.get<number>('DB_PORT'),
    });

    await client.connect();
    return client;
  }
}

