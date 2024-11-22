import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AppService {
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

  async create(user: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const query = `
   INSERT INTO users (name, surname, birthdate, email, phone, cpf, password, role, created_at) 
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP) 
   RETURNING id, name, surname, birthdate, email, phone, cpf, password, role, created_at;
`;
    const values = [
      user.name,
      user.surname,
      user.birthdate,
      user.email,
      user.phone,
      user.cpf,
      hashedPassword,
      user.role,
    ];
    const result = await this.client.query(query, values);
    return result.rows[0]; 
  }

  async findAll() {
    const result = await this.client.query('SELECT * FROM users');
    return result.rows;
  }

  async findOne(id: string) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result = await this.client.query(query, values);
    return result.rows[0];
  }

  async update(id: string, user: {
    name: string;
    surname: string;
    birthdate: string;
    email: string;
    phone: string;
    cpf: string;
  }) {
    const query = `
      UPDATE users 
      SET name = $1, surname = $2, birthdate = $3, email = $4, phone = $5, cpf = $6
      WHERE id = $7 
      RETURNING id, name, surname, birthdate, email, phone, cpf
    `;
    const values = [
      user.name,
      user.surname,
      user.birthdate,
      user.email,
      user.phone,
      user.cpf,
      id,
    ];
    const result = await this.client.query(query, values);
    return result.rows[0];
  }

  async remove(id: string) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await this.client.query(query, values);
    return result.rows[0];
  }
}
