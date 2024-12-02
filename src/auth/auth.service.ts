import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AppService } from 'src/app.service';
import { CreateUserDto } from 'src/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appService: AppService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.appService.findOneByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Senha incorreta');
    }

    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async register(createUserDto: CreateUserDto) {
    return this.appService.create(createUserDto);
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
