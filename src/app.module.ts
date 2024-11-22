import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { CrudController } from './app.controller';
import { AppService } from './app.service';          


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [CrudController],  // Registre o controller aqui
  providers: [AppService],
})
export class AppModule {}

