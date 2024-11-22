import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Module({})
export class DatabaseModule {
  static async connect(configService: ConfigService) {
    const client = new Client({
      user: configService.get<string>('DB_USER'),
      host: configService.get<string>('DB_HOST'),
      database: configService.get<string>('DB_NAME'),
      password: configService.get<string>('DB_PASSWORD'),
      port: configService.get<number>('DB_PORT'),
    });

    await client.connect();
    return client;
  }
}
