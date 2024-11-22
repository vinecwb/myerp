import { Module } from '@nestjs/common';
import { Client } from 'pg';

@Module({})
export class DatabaseModule {
  static async connect() {
    const client = new Client({
      user: 'vinicius.santos', // substitua pelo usuário do seu banco de dados
      host: 'localhost',
      database: 'myerp_crud', // nome do banco de dados
      password: '456789', // substitua pela sua senha
      port: 5432,
    });

    await client.connect();
    return client;
  }
}
