import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class CrudController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() createUserDto: { name: string; age: number }) {
    return this.appService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: { name: string; age: number },
  ) {
    return this.appService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appService.remove(Number(id));
  }
}

