import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class CrudController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() createUserDto: {
    name: string;
    surname: string;
    birthdate: string;
    email: string;
    phone: string;
    cpf: string;
    password: string;
    role: string;
  }) {
    return this.appService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appService.findOne(id); 
  }

  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: CreateUserDto, // Aqui você pode usar o mesmo DTO
  ) {
    return this.appService.update((id), updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appService.remove(id); 
  }
}

