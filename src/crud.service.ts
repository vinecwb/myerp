import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { DatabaseModule } from './database.module';

@Injectable()
export class CrudService {
  private client: Client;

  constructor() {
    this.client = DatabaseModule.connect();
  }

  // Criar um novo usuário
  async create(data: { name: string; age: number }) {
    const query = 'INSERT INTO users(name, age) VALUES($1, $2) RETURNING *';
    const values = [data.name, data.age];
    const res = await this.client.query(query, values);
    return res.rows[0];
  }

  // Buscar todos os usuários
  async findAll() {
    const query = 'SELECT * FROM users';
    const res = await this.client.query(query);
    return res.rows;
  }

  // Buscar um usuário por ID
  async findOne(id: number) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const res = await this.client.query(query, [id]);
    return res.rows[0];
  }

  // Atualizar um usuário
  async update(id: number, data: { name: string; age: number }) {
    const query =
      'UPDATE users SET name = $1, age = $2 WHERE id = $3 RETURNING *';
    const values = [data.name, data.age, id];
    const res = await this.client.query(query, values);
    return res.rows[0];
  }

  // Deletar um usuário
  async remove(id: number) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const res = await this.client.query(query, [id]);
    return res.rows[0];
  }
}
