import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.createAsync(createCustomerDto);
  }

  @Get()
  async findAll() {
    return await this.customerService.findAllAsync();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.customerService.findOneAsync(id);
  }

}
