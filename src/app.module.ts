import { Module } from '@nestjs/common';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CrudController],
  providers: [CrudService],
})
export class AppModule {}
