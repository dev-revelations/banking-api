import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import CustomerRepository from './repositories/customer.repository';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [
    InMemoryDBModule.forFeature('customer')
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository]
})
export class CustomerModule { }
