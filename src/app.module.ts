import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { CrudController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';  // Importar o AuthModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,  // Registre o AuthModule aqui
  ],
  controllers: [CrudController],  // Você pode manter esse controlador ou atualizá-lo conforme sua necessidade
  providers: [AppService],
})
export class AppModule {}
