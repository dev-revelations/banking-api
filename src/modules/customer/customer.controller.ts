import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createAsync(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAllAsync();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOneAsync(id);
  }

}
