import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@Module({
  imports: [JwtModule.register({ secret: 'your_secret_key', signOptions: { expiresIn: '1h' } })],
  providers: [AuthService, AppService],
  controllers: [AuthController],
})
export class AuthModule {}
