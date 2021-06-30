import { InMemoryDBService } from "@nestjs-addons/in-memory-db";
import { Injectable } from "@nestjs/common";
import { TransactionEntity } from "../entities/transaction.entity";


@Injectable()
export default class TransactionRepository {
    constructor(private readonly transactionDbService: InMemoryDBService<TransactionEntity>) { }

    async createAsync(transaction: TransactionEntity): Promise<TransactionEntity> {
        return await this.transactionDbService
            .createAsync(transaction)
            .toPromise();
    }

    async findAllAsync(): Promise<Array<TransactionEntity>> {
        return await this.transactionDbService.getAllAsync().toPromise();
    }

    async findOneAsync(id: string): Promise<TransactionEntity> {
        return await this.transactionDbService.getAsync(id).toPromise();
    }

    async updateAsync(transaction: TransactionEntity) {
        await this.transactionDbService.updateAsync(transaction).toPromise();
    }

    async removeAsync(id: string) {
        await this.transactionDbService.deleteAsync(id).toPromise();
    }

    async removeManyAsync(ids: string[]) {
        await this.transactionDbService.deleteManyAsync(ids).toPromise();
    }
}