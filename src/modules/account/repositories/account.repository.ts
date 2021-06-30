import { InMemoryDBService } from "@nestjs-addons/in-memory-db";
import { Injectable } from "@nestjs/common";
import { AccountEntity } from "../entities/account.entity";


@Injectable()
export default class AccountRepository {

    constructor(private readonly accountDbService: InMemoryDBService<AccountEntity>) { }

    async createAsync(account: AccountEntity): Promise<AccountEntity> {
        return await this.accountDbService
            .createAsync(account)
            .toPromise();
    }

    async findAllAsync(): Promise<Array<AccountEntity>> {
        return await this.accountDbService.getAllAsync().toPromise();
    }

    async findOneAsync(id: string): Promise<AccountEntity> {
        return await this.accountDbService.getAsync(id).toPromise();
    }

    async updateAsync(account: AccountEntity) {
        await this.accountDbService.updateAsync(account).toPromise();
    }

    async removeAsync(id: string) {
        // needs to delete related transactions too
        await this.accountDbService.deleteAsync(id).toPromise();
    }
}