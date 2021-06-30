import { InMemoryDBService } from "@nestjs-addons/in-memory-db";
import { Injectable } from "@nestjs/common";
import { CustomerEntity } from "../entities/customer.entity";

@Injectable()
export default class CustomerRepository {
    constructor(private readonly customerDbService: InMemoryDBService<CustomerEntity>) { }

    async createAsync(customer: CustomerEntity): Promise<CustomerEntity> {
        return await this.customerDbService
            .createAsync(customer)
            .toPromise();
    }

    async findOneAsync(id: string): Promise<CustomerEntity> {
        return await this.customerDbService
            .getAsync(id)
            .toPromise();
    }

    async findAllAsync(): Promise<Array<CustomerEntity>> {
        return await this.customerDbService
            .getAllAsync()
            .toPromise();
    }
}