import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ROUTES } from '../../core/constants/consts';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller(ROUTES.CUSTOMER_ROOT)
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

  @Get(ROUTES.CUSTOMER_GET_ONE)
  async findOne(@Param(ROUTES.PARAM_ID) id: string) {
    return await this.customerService.findOneAsync(id);
  }

}
