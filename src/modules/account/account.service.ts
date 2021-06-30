import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import AccountRepository from './repositories/account.repository';
import TransactionRepository from './repositories/transaction.repository';

@Injectable()
export class AccountService {

  constructor(private readonly accountRepo: AccountRepository, private readonly transactionRepo: TransactionRepository) { }

  async createAsync(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    try {
      const { name, customerId } = createAccountDto;
      const account: AccountEntity = {
        id: undefined,
        name,
        customerId
      };
      return await this.accountRepo.createAsync(account);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findCustomerAccountsAsync(customerId:string): Promise<Array<AccountEntity>> {
    try {
      const accounts = await this.accountRepo.findAllAsync(customerId);
      if (!accounts || accounts.length === 0) {
        throw new HttpException('There are no accounts', HttpStatus.NO_CONTENT);
      }
      return accounts;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneAsync(id: string) {
    try {
      const account = await this.accountRepo.findOneAsync(id);
      if (!account) {
        throw new NotFoundException(`Account not found`);
      }
      return account;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAsync(id: string, updateAccountDto: UpdateAccountDto) {
    try {
      const { name, customerId } = updateAccountDto;
      const account: AccountEntity = {
        id,
        name,
        customerId
      };
      await this.accountRepo.updateAsync(account);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async removeAsync(id: string) {
    try {
      await this.accountRepo.removeAsync(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
