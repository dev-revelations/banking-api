import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import CustomerRepository from './repositories/customer.repository';

@Injectable()
export class CustomerService {

  constructor(private readonly customerRepository: CustomerRepository) { }

  async createAsync(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    try {
      const customer: CustomerEntity = {
        id: undefined,
        name: createCustomerDto.name
      };
      return await this.customerRepository.createAsync(customer);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllAsync(): Promise<CustomerEntity[]> {
    try {
      const customers = await this.customerRepository.findAllAsync();
      if (!customers || customers.length === 0) {
        throw new HttpException('No Content', HttpStatus.NO_CONTENT);
      }
      return customers;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneAsync(id: string): Promise<CustomerEntity> {
    try {
      const customer = await this.customerRepository.findOneAsync(id);
      if (!customer) {
        throw new NotFoundException(`Customer #${id} not found`);
      }

      return customer;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
