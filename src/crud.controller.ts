import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CrudService } from './crud.service';

@Controller('users')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Post()
  async create(@Body() createUserDto: { name: string; age: number }) {
    return this.crudService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.crudService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.crudService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: { name: string; age: number },
  ) {
    return this.crudService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.crudService.remove(Number(id));
  }
}
