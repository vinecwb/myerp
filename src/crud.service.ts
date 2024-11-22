import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class CrudService {
  private client: Client;

  constructor(private configService: ConfigService) {
    this.client = new Client({
      user: this.configService.get<string>('DB_USER'),
      host: this.configService.get<string>('DB_HOST'),
      database: this.configService.get<string>('DB_NAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      port: this.configService.get<number>('DB_PORT'),
    });

    this.client.connect().catch((err) => {
      console.error('Erro ao conectar ao banco de dados:', err);
    });
  }

  async create(user: { name: string; age: number }) {
    const query = 'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *';
    const values = [user.name, user.age];
    const result = await this.client.query(query, values);
    return result.rows[0]; 
  }

  async findAll() {
    const result = await this.client.query('SELECT * FROM users');
    return result.rows;
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result = await this.client.query(query, values);
    return result.rows[0];
  }

  async update(id: number, user: { name: string; age: number }) {
    const query = `
      UPDATE users 
      SET name = $1, age = $2 
      WHERE id = $3 
      RETURNING *
    `;
    const values = [user.name, user.age, id];
    const result = await this.client.query(query, values);
    return result.rows[0];
  }

  async remove(id: number) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await this.client.query(query, values);
    return result.rows[0];
  }
}
